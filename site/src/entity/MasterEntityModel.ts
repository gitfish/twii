import { observable, action, computed } from "mobx";
import IMasterEntity from "./IMasterEntity";
import IMasterEntitySourceModel from "./IMasterEntitySourceModel";
import MasterEntitySourceModel from "./MasterEntitySourceModel";
import IMasterEntitySourceEntity from "./IMasterEntitySourceEntity";
import IMasterEntityModel from "./IMasterEntityModel";
import MasterEntityServiceContext from "./MasterEntityServiceContext";
import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
import { Data as DateDataFormats } from "common/DateFormats";
import * as moment from "moment";
import * as StringUtils from "util/String";
import * as EntityNameUtils from "./EntityNameUtils";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IEntityAttributeActions from "./IEntityAttributeActions";
import ActivityFilterModel from "common/ActivityFilterModel";

class MasterEntityModel implements IMasterEntityModel {
    @observable masterEntityId: string;
    @observable sync : ISyncModel = new SyncModel();
    @observable sources : IMasterEntitySourceModel[] = [];
    @observable activityFilter = new ActivityFilterModel();

    @observable.ref attributeActions : IEntityAttributeActions;

    constructor(data?: IMasterEntity) {
        this.setData(data);
    }

    @computed
    get data() {
        return {
            masterEntityId: this.masterEntityId,
            sources: this.sources.map(s => s.data)
        };
    }

    @action
    setData(data : IMasterEntity) {
        if(data) {
            this.masterEntityId = data.masterEntityId;
            this.sources = data.sources ? data.sources.map((s) => {
                return new MasterEntitySourceModel(this, s);
            }) : [];
        } else {
            this.masterEntityId = undefined;
            this.sources = [];
        }
    }

    @computed
    get sourceCodes() : string[] {
        return this.sources.map((s) => {
            return s.sourceSystemCode
        });
    }

    @computed
    get sourceMap() {
        const r : { [key : string] : IMasterEntitySourceModel } = {};
        this.sources.forEach((s) => {
            r[s.sourceSystemCode] = s;
        });
        return r;
    }

    @computed
    get names() : IMasterEntitySourceEntityName[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityName[] = [];
        this.sources.forEach((source) => {
            source.names.forEach((name) => {
                if(!dup[name.standardFullName]) {
                    dup[name.standardFullName] = name;
                    r.push(name);
                }
            })
        });
        return r;
    }

    @computed
    get name() : IMasterEntitySourceEntityName {
        let r : IMasterEntitySourceEntityName;
        let score = 0;
        this.sources.forEach((source) => {
            return source.names.forEach((name) => {
                const nameScore = EntityNameUtils.getNameScore(name);
                if(nameScore > score) {
                    score = nameScore;
                    r = name;
                } else if(nameScore === score && EntityNameUtils.isMainName(name)) {
                    r = name;
                }
            });
        });
        
        if(!r) {
            const mainName = this.names.find(EntityNameUtils.isMainName);
            if(mainName) {
                r = mainName;
            }
        }

        if(!r && this.names.length > 0) {
            r = this.names[0];
        }
        return r;
    }

    @computed
    get addresses() : IMasterEntitySourceEntityAddress[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityAddress[] = [];
        this.sources.forEach((source) => {
            source.addresses.forEach((address) => {
                if(!dup[address.standardAddressValue]) {
                    dup[address.standardAddressValue] = address;
                    r.push(address);
                }
            })
        });
        return r;
    }

    @computed
    get phones() : IMasterEntitySourceEntityPhone[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityPhone[] = [];
        this.sources.forEach((source) => {
            source.phones.forEach((phone) => {
                if(!dup[phone.phoneNumber]) {
                    dup[phone.phoneNumber] = phone;
                    r.push(phone);
                }
            })
        });
        return r;
    }

    @computed
    get credentials() : IMasterEntitySourceEntityCredential[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityCredential[] = [];
        this.sources.forEach((source) => {
            source.credentials.forEach((cred) => {
                if(!dup[cred.credentialTypeCd + cred.credentialValue]) {
                    dup[cred.credentialTypeCd + cred.credentialValue] = cred;
                    r.push(cred);
                }
            })
        });
        return r;
    }

    @computed
    get personalMetas() : IMasterEntitySourceEntityMeta[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityCredential[] = [];
        this.sources.forEach((source) => {
            source.personalMetas.forEach((personal) => {
                if(!dup[personal.birthDt + personal.birthCountryCd + personal.sex]) {
                    dup[personal.birthDt + personal.birthCountryCd + personal.sex] = personal;
                    r.push(personal);
                }
            })
        });
        return r;
    }

    @computed
    get dateOfBirth() : Date {
        const s = this.sources.find((source) => {
            return source.dateOfBirth ? true : false;
        });
        return s ? s.dateOfBirth : undefined;
    }

    @computed
    get gender() : string {
        const s = this.sources.find((source) => {
            return source.gender ? true : false;
        });
        return s ? s.gender : undefined;
    }

    @computed
    get isPerson() : boolean {
        return this.sources.some((source) => {
            return source.isPerson;
        });
    }

    @computed
    get isOrganisation() : boolean {
        return this.sources.some((source) => {
            return source.isOrganisation;
        })
    }

    toJSON() {
        return this.data;
    }
}

export { MasterEntityModel as default, MasterEntityModel };