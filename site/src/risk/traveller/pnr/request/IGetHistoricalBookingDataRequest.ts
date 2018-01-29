import IRequestHeader from "risk/traveller/common/IRequestHeader";
//import IPNRDataSubjects from "/common/IPNRDataSubjects";

interface IGetHistoricalBookingDataRequest {
    RequestHeader?: IRequestHeader;
    BookingSystemCode?: string;
    BookingCreationTimeStamp?: Date;
    RecordLocator?: string;
}

export { IGetHistoricalBookingDataRequest as default, IGetHistoricalBookingDataRequest }