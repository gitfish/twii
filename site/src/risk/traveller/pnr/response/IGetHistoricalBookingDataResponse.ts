import IListOfHistoricalPNRRecord from "./IListOfHistoricalPNRRecord";
import IListOfMatchedIATTraveller from "./IListOfMatchedIATTraveller";

interface IGetHistoricalBookingDataResponse {
    ListOfHistoricalPNRRecord?: IListOfHistoricalPNRRecord;
    ListOfMatchedIATTraveller?: IListOfMatchedIATTraveller;
}

export { IGetHistoricalBookingDataResponse as default, IGetHistoricalBookingDataResponse }