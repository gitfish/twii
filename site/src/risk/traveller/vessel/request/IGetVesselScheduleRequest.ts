import IRequestHeader from "risk/traveller/common/IRequestHeader";
import { IVesselMovementInfo } from "../common/IVesselMovementInfo";

interface IGetVesselScheduleRequest {
    RequestHeader? : IRequestHeader;
    MovementInfo? : IVesselMovementInfo;
}

export { IGetVesselScheduleRequest as default, IGetVesselScheduleRequest }