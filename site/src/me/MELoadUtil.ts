import { IGetVesselScheduleRequest } from "risk/traveller/vessel/request/IGetVesselScheduleRequest";
import { IVesselMovementInfo } from "risk/traveller/vessel/common/IVesselMovementInfo";
import * as DateUtils from "util/Date";
import IGetHistoricalBookingDataRequest from "risk/traveller/pnr/request/IGetHistoricalBookingDataRequest";
import IMECase from "me/IMECase";

const getRequestForHistPNR = (meAirCase: IMECase): IGetHistoricalBookingDataRequest => {
    let historicalBookingSummaryRequest : IGetHistoricalBookingDataRequest = {
        BookingSystemCode : meAirCase.BookingSystemCode,
        BookingCreationTimeStamp : DateUtils.dateFromMatchEvaluationDataText(meAirCase.CreationTs),
        RecordLocator : meAirCase.RecordLocator
    };
    return historicalBookingSummaryRequest;
};

const getRequestForVesselSchedule = (meAirCase: IMECase): IGetVesselScheduleRequest => {

    let movementInfo : IVesselMovementInfo =  {
        LocalPortCode: meAirCase.LocalPortCode,
        DirectionCode: meAirCase.DirectionCode,
        LocalScheduledDate: DateUtils.dateFromDataText(meAirCase.LocalScheduleDate),
        RouteId: meAirCase.RouteId
    };

    let vesselScheduleRequest: IGetVesselScheduleRequest = {
        MovementInfo: movementInfo
    };
    return vesselScheduleRequest;
};

export { getRequestForHistPNR, getRequestForVesselSchedule }
