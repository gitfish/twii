import * as JSZipUtils from "jszip-utils";
import * as Docxtemplater from "docxtemplater";
import * as JSZip from "jszip";
import {movementToOutputText} from "iat/IATMovementHelper";
import {saveAs} from "file-saver/FileSaver";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IEntityProfileListModel from "./IEntityProfileListModel";
import IEntityProfileModel from "./IEntityProfileModel";
import IEntityProfileSourceGroupModel from "./IEntityProfileSourceGroupModel";
import IEntityProfileTemplateEntry from "./IEntityProfileTemplateEntry";
import RootAppHost from "app/RootAppHost";
import ElementBuilder from "xml/ElementBuilder";
import NodeSerializerContext from "xml/NodeSerializerContext";
import DocxBuilder from "ms/office/DocxBuilder";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import * as PathUtils from "util/Path";
import { toNISFormat } from "entity/EntityNameUtils";
import EntityProfileDocumentRouter from "./EntityProfileDocumentRouter";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { getRowText } from "common/component/ColumnTextHelper";
import GenderRefList from "common/ref/GenderRefList";

const getTemplateBinaryContent = (template : IEntityProfileTemplateEntry) : Promise<any> => {
    return new Promise((resolve, reject) => {
        const templatePath = PathUtils.join(RootAppHost.basePath, template.path);
        JSZipUtils.getBinaryContent(templatePath, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const getAllNames = (entity : IMasterEntityModel) : string => {
        return StringUtils.join(entity.names, nm => nm.standardFullName, " | ");
};

const getAllAddresses = (entity : IMasterEntityModel): string => {
    return StringUtils.join(entity.addresses, addr => addr.standardAddressValue, " | ");
};

const getAllPhones = (entity : IMasterEntityModel): string => {
    return StringUtils.join(entity.phones, ph => {
        var r = ph.countryCd ? "(" + ph.countryCd + ") " : "";
        r = ph.areaCd ? r + "- " + ph.areaCd + " " : "";
        r = ph.phoneNumber ? r + ph.phoneNumber : "";
        return r;
    }, " | ");
};

const getAllCredentials = (entity : IMasterEntityModel): string => {
    return StringUtils.join(entity.credentials, c => {
        var r = c.credentialValue ? c.credentialValue : "";
        r = c.credentialTypeCd ? r + "(" + c.credentialTypeCd + ")" : "";
        return r;
    }, " | ");
};

const getDateOfBirth = (entity : IMasterEntityModel) : string => {
    if(entity && entity.dateOfBirth) {
        return DateUtils.dateToOutputText(entity.dateOfBirth);
    }   
};

const getGender = (entity : IMasterEntityModel) : string => {
    if(entity && entity.gender) {
        const genderRefListItem = GenderRefList.getItemByKey(entity.gender);
        return genderRefListItem ? genderRefListItem.text : undefined;
    }
};

const buildBiographic = (profile : IEntityProfileModel, doc : DocxBuilder) => {
    const entity = profile.entity;
    const title = entity.isPerson ? toNISFormat(entity) : entity.name ? entity.name.organisationName : undefined;
    if(StringUtils.isNotBlank(title)) {
        doc.p().r({bold: true, size: "18"}).text(title).rEnd().pEnd();
    }
    const names = getAllNames(entity);
    const dob = getDateOfBirth(entity);
    const gender = getGender(entity);
    const addresses = getAllAddresses(entity);
    const phones = getAllPhones(entity);
    const credentials = getAllCredentials(entity);
    if(names) {
        doc.p().r({ bold: true, size: "14" }).text("Names: ").rEnd().r({ size: "14" }).text(names).rEnd().pEnd();
    }
    if(dob) {
        doc.p().r({ bold: true, size: "14" }).text("Date of Birth: ").rEnd().r({ size: "14" }).text(dob).rEnd().pEnd();
    }
    if(gender) {
        doc.p().r({ bold: true, size: "14" }).text("Gender: ").rEnd().r({ size: "14" }).text(gender).rEnd().pEnd();
    }
    if(addresses) {
        doc.p().r({ bold: true, size: "14" }).text("Addresses: ").rEnd().r({ size: "14" }).text(addresses).rEnd().pEnd();
    }
    if(phones) {
        doc.p().r({ bold: true, size: "14" }).text("Phones: ").rEnd().r({ size: "14" }).text(phones).rEnd().pEnd();
    }
    if(credentials) {
        doc.p().r({ bold: true, size: "14" }).text("Credentials: ").rEnd().r({ size: "14" }).text(credentials).rEnd().pEnd();
    }
};

const buildProfileSourceGroup = (group : IEntityProfileSourceGroupModel, doc : DocxBuilder) : Promise<any> => {
    const path = `/${group.source.entitySource.sourceSystemCode}/${group.type}`;
    return EntityProfileDocumentRouter.handleRequest({ path: path, params: { group: group, doc: doc } });
};

const buildComments = (comments : string, doc : DocxBuilder) => {
    if(StringUtils.isNotBlank(comments)) {
        doc.p({ justification: "start" }).r({ size: "14", color: "040405" }).text(comments).rEnd().pEnd();
    }
};

const buildProfile = (profile : IEntityProfileModel, doc : DocxBuilder) : Promise<any> => {
    // title
    doc.p({ justification: "start" }).r({ bold: true, size: "28", color: "005a9e" }).text("Entity Biographic Data").rEnd().pEnd();
    
    // biographic report
    buildBiographic(profile, doc);

    // primary comments
    buildComments(profile.comments, doc);

    // sources
    let sp : Promise<any>;
    profile.sources.forEach(source => {
        source.groups.forEach(g => {
            if(!sp) {
                sp = buildProfileSourceGroup(g, doc);
            } else {
                sp = sp.then(() => {
                    return buildProfileSourceGroup(g, doc);
                });
            }
        });
    });

    return sp || Promise.resolve();
};

const createProfileDocument = (profile : IEntityProfileModel, template : IEntityProfileTemplateEntry) : Promise<any> => {
    return getTemplateBinaryContent(template).then(data => {
        const zip = new JSZip(data);
        const r = new Docxtemplater();
        r.loadZip(zip);

        const doc = new DocxBuilder();
        doc.startDocument();

        return buildProfile(profile, doc).then(() => {
            doc.endDocument();

            const containerNode = doc.result;
            let resultString = "";
            const cl = containerNode.childNodes.length;
            for(var i = 0; i < cl; i ++) {
                resultString += NodeSerializerContext.value.serializeNode(containerNode.childNodes.item(i));
            }

            r.setData({ AnDeReport: resultString });
            r.render();

            return r.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });

        });
    });
};

const createProfileListDocument = (profileList : IEntityProfileListModel, template : IEntityProfileTemplateEntry) : Promise<any> => {
    return getTemplateBinaryContent(template).then(data => {
        const zip = new JSZip(data);
        const r = new Docxtemplater();
        r.loadZip(zip);

        const doc = new DocxBuilder();
        doc.startDocument();

        // NOTE: this has to be sequential
        let profilesPromise;
        profileList.profiles.forEach(profile => {
            if(!profilesPromise) {
                profilesPromise = buildProfile(profile, doc);
            } else {
                profilesPromise = profilesPromise.then(() => {
                    return buildProfile(profile, doc);
                });
            }
        });

        return profilesPromise.then(() => {
            doc.endDocument();

            const containerNode = doc.result;
            let resultString = "";
            const cl = containerNode.childNodes.length;
            for(var i = 0; i < cl; i ++) {
                resultString += NodeSerializerContext.value.serializeNode(containerNode.childNodes.item(i));
            }

            r.setData({ AnDeReport: resultString });
            r.render();

            return r.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });

        });
    });
};

const createDocument = (profileList : IEntityProfileListModel, template : IEntityProfileTemplateEntry) : Promise<any> => {
    if(profileList.profiles.length > 0) {
        return createProfileListDocument(profileList, template).then(r => {
            saveAs(r, "results.docx");
        });
    }
    return Promise.reject({ message: "No Entity Profiles available" });
};

const buildSectionHeader = (title : string, doc : DocxBuilder) => {
    doc.p({ justification: "start" }).r({ bold: true, size: "20", color: "212121" }).text(title).rEnd().pEnd();
};

const buildSectionSubHeader = (title : string, doc : DocxBuilder) => {
    doc.p({ justification: "start" }).r({ bold: true, size: "14", color: "212121" }).text(title).rEnd().pEnd();
};

const cellShading = {
    val: "clear",
    color: "005a9e",
    fill: "005a9e"
};

const tableBorder = {
    val: "single",
    space: "0",
    size: "6",
    color: "black"
};

const buildTable = (items: any[], columns: IColumn[], doc : DocxBuilder) => {
    doc.tbl({
        borders: {
            top: tableBorder,
            start: tableBorder,
            bottom: tableBorder,
            end: tableBorder,
            insideH: tableBorder,
            insideV: tableBorder
        },
        style: "TableGrid",
        layout: "autofit",
        preferredWidth: { type: "auto" }
    }).tr();
    columns.forEach(c => {
        doc.tc({
            shading: cellShading
        }).p({ justification: "center" }).r({ bold: true, size: "12", color: "FFFFFF" }).text(c.name).rEnd().pEnd().tcEnd();
    });
    doc.trEnd();
    items.forEach(item => {
        doc.tr();
        const rt = getRowText(item, columns);
        rt.forEach(t => {
            doc.tc().p({ justification: "left" }).r({ size: "12" }).text(t || "").rEnd().pEnd().tcEnd();
        });
        doc.trEnd();
    });
    doc.tblEnd();
};

export {
    createDocument,
    buildSectionHeader,
    buildSectionSubHeader,
    buildTable,
    buildComments
}