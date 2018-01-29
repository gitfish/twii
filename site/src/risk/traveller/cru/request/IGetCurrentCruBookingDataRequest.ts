import IRequestHeader from "risk/traveller/common/IRequestHeader";
import ICRUDataSubjects from "risk/traveller/cru/common/ICRUDataSubjects";

interface IGetCurrentCruBookingDataRequest {
    RequestHeader?: IRequestHeader;
    BookingSystemCode?: string;
    BookingCreationTimeStamp?: Date;
    RecordLocator?: string;
    RequestedDataSubjects?: ICRUDataSubjects;
}

export { IGetCurrentCruBookingDataRequest as default, IGetCurrentCruBookingDataRequest }