import ISyncModel from "common/ISyncModel";
import IIATMovement from "./IIATMovement";

interface IIATMovementRelatedDataModel<T> {
    visible: boolean;
    sync: ISyncModel;
    total : number;
    items: T[];
    movement: IIATMovement;
    loadForMovement(movement : IIATMovement) :  Promise<any>;
    setVisible(visible: boolean) : void;
}

export { IIATMovementRelatedDataModel as default, IIATMovementRelatedDataModel };