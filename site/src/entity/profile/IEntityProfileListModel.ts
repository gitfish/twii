import IEntityProfileModel from "./IEntityProfileModel";
import IHandleModel from "common/IHandleModel";

interface IEntityProfileListModel {
    profiles: IEntityProfileModel[];
    addEntitySourceItems(value : any) : void;
    clear() : void;
}

export { IEntityProfileListModel as default, IEntityProfileListModel }