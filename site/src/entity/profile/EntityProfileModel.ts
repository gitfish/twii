import { observable, action, computed } from "mobx";
import IEntityProfileModel from "./IEntityProfileModel";
import IEntityProfileSourceModel from "./IEntityProfileSourceModel";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import EntityProfileSourceModel from "./EntityProfileSourceModel";
import IEntitySourceItems from "entity/IEntitySourceItems";

class EntityProfileModel implements IEntityProfileModel {
    @observable private _entity : IMasterEntityModel;
    @observable sources : IEntityProfileSourceModel[] = [];
    @observable comments : string;

    constructor(entity : IMasterEntityModel) {
        this._entity = entity;
    }

    @computed
    get entity() {
        return this._entity;
    }

    @action
    setComments(comments : string) {
        this.comments = comments;
    }
    
    @action
    addEntitySourceItems(e : IEntitySourceItems) : void {
        if(e && e.source && e.type && e.items) {
            const entitySource = e.source;
            let profileSource = this.sources.find(item => item.entitySource.sourceSystemCode === entitySource.sourceSystemCode);
            if(!profileSource) {
                profileSource = new EntityProfileSourceModel(this, entitySource);
                this.sources.push(profileSource);
            }
            profileSource.addItems(e.type, e.items);
        }
    }

    @action
    removeAll() {
        this.sources = [];
    }

    @action
    clear() {
        this.removeAll();
    }
}

export { EntityProfileModel as default, EntityProfileModel }