import IIATMovement from "./IIATMovement";
import IATMovementRelatedDataModel from "./IATMovementRelatedDataModel";
import IIATMovementDetail from "./IIATMovementDetail";
import IATServiceContext from "./IATServiceContext";

class IATMovementDetailModel extends IATMovementRelatedDataModel<IIATMovementDetail> {

    protected _getItems() : Promise<IIATMovementDetail[]> {
        if (this.movement.IATTravellerId && this.movement.routeId
            && this.movement.localScheduledDate && this.movement.directionCode) {
            return IATServiceContext.value.getIATMovementDetails(this.movement.IATTravellerId,
                this.movement.routeId, this.movement.localScheduledDate, this.movement.directionCode);
        } else {
            return Promise.resolve([] as IIATMovementDetail[]);
        }
    }

    protected _calcSyncId(movement : IIATMovement) : string {
        return movement.IATTravellerId + ":" + movement.routeId + ":"
            + movement.localScheduledDate + ":" + movement.directionCode;
    }
}

export { IATMovementDetailModel as default, IATMovementDetailModel }