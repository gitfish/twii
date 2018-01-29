import PNRSource from "./PNRSource";

interface IBookingRecordInfo {
    BookingSystemCode?: string;
    RecordLocator?: string;
    PNRCreationTimeStamp?: Date;
    PNRSource?: PNRSource;
}

export { IBookingRecordInfo as default, IBookingRecordInfo }