import IIATMovement from "./IIATMovement";
import IATMovementRelatedDataModel from "./IATMovementRelatedDataModel";
import IIATVisa from "./IIATVisa";
import IATServiceContext from "./IATServiceContext";

class IATMovementVisasModel extends IATMovementRelatedDataModel<IIATVisa> {

    protected _getItems() : Promise<IIATVisa[]> {
        if (this.movement.visaIdentifyingNbr) {
            return IATServiceContext.value.getVisas(this.movement.visaIdentifyingNbr);
        } else {
            return Promise.resolve([] as IIATVisa[]);
        }
    }

    protected _calcSyncId(movement : IIATMovement) : string {
        return movement.visaIdentifyingNbr;
    }
}

export { IATMovementVisasModel as default, IATMovementVisasModel }