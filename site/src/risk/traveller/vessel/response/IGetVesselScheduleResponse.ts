import { IVesselMovementInfo } from "../common/IVesselMovementInfo";
import { IListOfItinerary } from "./IListOfItinerary";

interface IGetVesselScheduleResponse {
    VesselMovementInfo? : IVesselMovementInfo;
    ListOfVesselItinerary? : IListOfItinerary;

}

export { IGetVesselScheduleResponse as default, IGetVesselScheduleResponse }