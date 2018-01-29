import IRequestHeader from "risk/traveller/common/IRequestHeader";
import { IBookingKey } from "../common/IBookingKey";


interface IGetProfileMatchesByPNRRequest {
    RequestHeader?: IRequestHeader;
    pnrBusinesBookingSystemCodesKey?: string;
    BookingCreationTimeStamp?: Date;
    RecordLocator?: string;
}

export { IGetProfileMatchesByPNRRequest as default, IGetProfileMatchesByPNRRequest }