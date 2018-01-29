import IEntitySourceItems from "entity/IEntitySourceItems";
import IEntityProfileSourceModel from "./IEntityProfileSourceModel";

interface IEntitySourceProfileSourceGroupModel {
    source: IEntityProfileSourceModel;
    type: string;
    items: any[];
    open: boolean;
    comments: string;
    addItems(items: any[]) : void;
    removeItem(item : any) : void;
    remove() : void;
    setOpen(open : boolean) : void;
    setComments(comments : string) : void;
}

export { IEntitySourceProfileSourceGroupModel as default, IEntitySourceProfileSourceGroupModel }