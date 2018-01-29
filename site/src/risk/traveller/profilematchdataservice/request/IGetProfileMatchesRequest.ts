import IRequestHeader from "risk/traveller/common/IRequestHeader";
import { IBookingKey } from "../common/IBookingKey";


interface IGetProfileMatchesRequest {
    RequestHeader?: IRequestHeader;
    pnrBusinessKey?: IBookingKey;
    CruiseBusinessKey?: IBookingKey;
    IATTravellerId?: string;
}

export { IGetProfileMatchesRequest as default, IGetProfileMatchesRequest }