import { observable, action } from "mobx";
import { IEntityProfileCreateDocumentModel, IEntityProfileCreateDocumentOptions } from "./IEntityProfileCreateDocumentModel";
import IEntityProfileListModel from "./IEntityProfileListModel";
import IEntityProfileTemplateEntry from "./IEntityProfileTemplateEntry";
import SyncModel from "common/SyncModel";
import { createDocument } from "./EntityProfileDocumentHelper";

class EntityProfileCreateDocumentModel implements IEntityProfileCreateDocumentModel {
    @observable profileList: IEntityProfileListModel;
    @observable active: boolean;
    @observable selectedTemplate : IEntityProfileTemplateEntry;
    @observable createDocumentSync = new SyncModel();

    @action
    init(opts : IEntityProfileCreateDocumentOptions) {
        this.profileList = opts.profileList;
        this.active = true;
    }

    @action
    setSelectedTemplate(selectedTemplate : IEntityProfileTemplateEntry) {
        this.selectedTemplate = selectedTemplate;
    }

    @action
    cancel() {
        this.profileList = undefined;
        this.active = false;
        this.selectedTemplate = undefined;
    }

    private _documentCreated = () => {
        this.createDocumentSync.syncEnd();
        this.profileList = undefined;
        this.active = false;
        this.selectedTemplate = undefined;
    }

    private _documentCreationError = (error) => {
        console.error(error);
        this.createDocumentSync.syncError(error);
    }

    @action
    createDocument() {
        this.createDocumentSync.syncStart();
        createDocument(this.profileList, this.selectedTemplate).then(this._documentCreated).catch(this._documentCreationError);
    }
}

export { EntityProfileCreateDocumentModel as default, EntityProfileCreateDocumentModel }