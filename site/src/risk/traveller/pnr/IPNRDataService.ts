import IGetCurrentBookingDataRequest from "./request/IGetCurrentBookingDataRequest";
import IGetHistoricalBookingDataRequest from "./request/IGetHistoricalBookingDataRequest";
import IGetCurrentBookingDataResponse from "./response/IGetCurrentBookingDataResponse";
import IGetHistoricalBookingDataResponse from "./response/IGetHistoricalBookingDataResponse";

interface IPNRDataService {
    GetCurrentBookingData(request : IGetCurrentBookingDataRequest) : Promise<IGetCurrentBookingDataResponse>;
    GetHistoricalBookingData(request : IGetHistoricalBookingDataRequest) : Promise<IGetHistoricalBookingDataResponse>;
}

export { IPNRDataService as default, IPNRDataService }