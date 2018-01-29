import { observable, action } from "mobx";
import IEntityProfileListModel from "./IEntityProfileListModel";
import IEntityProfileModel from "./IEntityProfileModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import EntityProfileModel from "./EntityProfileModel";
import IEntitySourceItems from "entity/IEntitySourceItems";

class EntityProfileListModel implements IEntityProfileListModel {
    @observable profiles: IEntityProfileModel[] = [];

    @action
    addEntitySourceItems(e : IEntitySourceItems) : void {
        if(e && e.source && e.type && e.items) {
            const source : IMasterEntitySourceModel = e.source;
            let profile = this.profiles.find(item => item.entity.masterEntityId === source.masterEntity.masterEntityId);
            if(!profile) {
                profile = new EntityProfileModel(source.masterEntity);
                this.profiles.push(profile);
            }
            profile.addEntitySourceItems(e);
        }
    }

    @action
    clear() {
        this.profiles = [];
    }
}

export { EntityProfileListModel as default, EntityProfileListModel }