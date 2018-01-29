import { observable, computed, action } from "mobx";
import IEntityProfileModel from "./IEntityProfileModel";
import IEntityProfileSourceModel from "./IEntityProfileSourceModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import IEntityProfileSourceGroupModel from "./IEntityProfileSourceGroupModel";
import EntityProfileSourceGroupModel from "./EntityProfileSourceGroupModel";

class EntityProfileSourceModel implements IEntityProfileSourceModel {
    @observable private _profile : IEntityProfileModel;
    @observable private _entitySource : IMasterEntitySourceModel;
    @observable groups : IEntityProfileSourceGroupModel[] = [];
    constructor(profile : IEntityProfileModel, entitySource : IMasterEntitySourceModel) {
        this._profile = profile;
        this._entitySource = entitySource;
    }

    @computed
    get profile() {
        return this._profile;
    }

    @computed
    get entitySource() {
        return this._entitySource;
    }
    
    @action
    addItems(type: string, items : any[]) : void {
        if(type && items) {
            let group = this.groups.find(group => group.type === type);
            if(!group) {
                group = new EntityProfileSourceGroupModel(this, type);
                this.groups.push(group);
            }
            group.addItems(items);
        }
    }

    @action
    removeGroup(item : IEntityProfileSourceGroupModel) {
        const idx = this.groups.indexOf(item);
        if(idx >= 0) {
            this.groups.splice(idx, 1);
        }
    }
}

export { EntityProfileSourceModel as default, EntityProfileSourceModel }