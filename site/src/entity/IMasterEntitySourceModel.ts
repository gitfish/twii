import IMasterEntityModel from "./IMasterEntityModel";
import IMasterEntitySource from "./IMasterEntitySource";
import IEntityModel from "./IEntityModel";
import IMasterEntitySourceRef from "./IMasterEntitySourceRef";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";

interface IMasterEntitySourceModel extends IEntityModel, IMasterEntitySource {
    masterEntity: IMasterEntityModel;
    masterEntityId: string;
    data: IMasterEntitySource;
    state : any;
    setState(rel : any) : void;
}

export { IMasterEntitySourceModel as default, IMasterEntitySourceModel };