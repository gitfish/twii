import ISyncModel from "common/ISyncModel";
import IIATAlias from "./IIATAlias";
import IMasterEntitySourceModel from "../entity/IMasterEntitySourceModel";

interface IIATMovementAliasesModel {
    visible: boolean;
    sync: ISyncModel;
    total : number;
    items: IIATAlias[];
    masterEntitySource: IMasterEntitySourceModel;
    loadForEntity(masterEntitySource: IMasterEntitySourceModel) : Promise<any>;
    setVisible(visible : boolean) : void;
}

export { IIATMovementAliasesModel as default, IIATMovementAliasesModel };