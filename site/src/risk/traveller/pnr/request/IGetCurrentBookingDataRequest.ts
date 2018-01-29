import IRequestHeader from "risk/traveller/common/IRequestHeader";
import IPNRDataSubjects from "../common/IPNRDataSubjects";

interface IGetCurrentBookingDataRequest {
    RequestHeader?: IRequestHeader;
    BookingSystemCode?: string;
    BookingCreationTimeStamp?: Date;
    RecordLocator?: string;
    RequestedDataSubjects?: IPNRDataSubjects;
}

export { IGetCurrentBookingDataRequest as default, IGetCurrentBookingDataRequest }