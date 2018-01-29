import IGetCurrentCruBookingDataRequest from "./request/IGetCurrentCruBookingDataRequest";
import IGetCurrentCruBookingDataResponse from "./response/IGetCurrentCruBookingDataResponse";
import IGetHistoricalCruBookingDataRequest from "./request/IGetHistoricalCruBookingDataRequest";
import IGetHistoricalCruBookingDataResponse from "./response/IGetHistoricalCruBookingDataResponse";

interface ICRUDataService {
    GetCurrentCruBookingData(request : IGetCurrentCruBookingDataRequest) : Promise<IGetCurrentCruBookingDataResponse>;
    GetHistoricalCruBookingData(request : IGetHistoricalCruBookingDataRequest) : Promise<IGetHistoricalCruBookingDataResponse>;
}

export { ICRUDataService as default, ICRUDataService }