import IRequestHeader from "risk/traveller/common/IRequestHeader";

interface IGetHistoricalCruBookingDataRequest {
    RequestHeader?: IRequestHeader;
    BookingSystemCode?: string;
    BookingCreationTimeStamp?: Date;
    RecordLocator?: string;
}

export { IGetHistoricalCruBookingDataRequest as default, IGetHistoricalCruBookingDataRequest }