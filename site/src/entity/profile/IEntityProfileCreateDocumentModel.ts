import IEntityProfileListModel from "./IEntityProfileListModel";
import IEntityProfileTemplateEntry from "./IEntityProfileTemplateEntry";
import ISync from "common/ISync";

interface IEntityProfileCreateDocumentOptions {
    profileList: IEntityProfileListModel;
}

interface IEntityProfileCreateDocumentModel {
    active: boolean;
    profileList: IEntityProfileListModel;
    selectedTemplate: IEntityProfileTemplateEntry;
    createDocumentSync: ISync;
    init(opts : IEntityProfileCreateDocumentOptions) : void;
    setSelectedTemplate(selectedTemplate : IEntityProfileTemplateEntry) : void;
    cancel();
    createDocument();
}

export { IEntityProfileCreateDocumentModel as default, IEntityProfileCreateDocumentModel, IEntityProfileCreateDocumentOptions }