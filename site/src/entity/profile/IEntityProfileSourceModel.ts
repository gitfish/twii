import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import IEntityProfileModel from "./IEntityProfileModel";
import IEntityProfileSourceGroupModel from "./IEntityProfileSourceGroupModel";
import IEntitySourceItems from "entity/IEntitySourceItems";

interface IEntityProfileSourceModel {
    profile: IEntityProfileModel;
    entitySource: IMasterEntitySourceModel;
    groups: IEntityProfileSourceGroupModel[];
    addItems(type : string, items: any[]) : void;
    removeGroup(items : IEntityProfileSourceGroupModel) : void;
}

export { IEntityProfileSourceModel as default, IEntityProfileSourceModel };