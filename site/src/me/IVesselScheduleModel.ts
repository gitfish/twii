import ISyncModel from "common/ISyncModel";
import IVesselItinerary from "risk/traveller/vessel/response/IVesselItinerary";
import IMECase from "me/IMECase";

interface IVesselScheduleModel {
    sync: ISyncModel;
    vesselSchedule: IVesselItinerary[];
    loadByCaseId(meCase: IMECase): Promise<any>;
}

export { IVesselScheduleModel as default, IVesselScheduleModel };
