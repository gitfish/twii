import IMECase from "me/IMECase";
import IMESummaryModel from "me/summary/IMESummaryModel";
import IProfileMatchModel from "me/profilematch/IProfileMatchModel";
import IVesselScheduleModel from "./IVesselScheduleModel";
import IMETSPNRModel from "me/travellersummary/IMETSPNRModel";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";

interface IMEAirModel {
    meCase: IMECase;
    summaryModel: IMESummaryModel;
    profileMatchModel: IProfileMatchModel;
    vesselScheduleModel: IVesselScheduleModel;
    historicalPNRnIATModel: IMETSPNRModel;
    travellerHistoryModel: ITravellerHistoryModel;
    load(meCase: IMECase): Promise<any>;
    refresh() : Promise<any>;
}

export { IMEAirModel as default, IMEAirModel }
