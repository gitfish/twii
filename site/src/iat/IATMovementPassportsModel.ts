import IIATMovement from "./IIATMovement";
import IATMovementRelatedDataModel from "./IATMovementRelatedDataModel";
import IIATPassport from "./IIATPassport";
import IATServiceContext from "./IATServiceContext";

class IATMovementPassportsModel extends IATMovementRelatedDataModel<IIATPassport> {

    protected _getItems() : Promise<IIATPassport[]> {
        if (this.movement.travelDocumentId && this.movement.travelDocDeptCountryCode) {
            return IATServiceContext.value.getPassports(this.movement.travelDocumentId, this.movement.travelDocDeptCountryCode);
        } else {
            return Promise.resolve([] as IIATPassport[]);
        }
    }

    protected _calcSyncId(movement : IIATMovement) : string {
        return movement.travelDocDeptCountryCode + ":" + movement.travelDocumentId;
    }
}

export { IATMovementPassportsModel as default, IATMovementPassportsModel }