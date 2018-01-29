import IMasterEntityModel from "entity/IMasterEntityModel";
import IEntityProfileSourceModel from "./IEntityProfileSourceModel";
import IEntitySourceItems from "entity/IEntitySourceItems";

interface IEntityProfile {
    entity: IMasterEntityModel;
    sources: IEntityProfileSourceModel[];
    comments: string;
    addEntitySourceItems(value : IEntitySourceItems) : void;
    setComments(comments : string) : void;
    removeAll();
    clear();
}

export { IEntityProfile as default, IEntityProfile }