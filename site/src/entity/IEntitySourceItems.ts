import IMasterEntitySourceModel from "./IMasterEntitySourceModel";

interface IEntitySourceItems {
    source : IMasterEntitySourceModel;
    type: string;
    items: any[];
    [key : string]: any;
}

export { IEntitySourceItems as default, IEntitySourceItems }