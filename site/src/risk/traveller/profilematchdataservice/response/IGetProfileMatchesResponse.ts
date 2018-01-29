import IListsOfProfileMatch from "./IListsOfProfileMatch";
import IProfileMatchList from "./IProfileMatchList";
import IBookingKey from "../common/IBookingKey";
import IProfileMatch from "./IProfileMatch";

interface IGetProfileMatchesResponse {
    pnrBusinessKey?: IBookingKey;
    CruiseBusinessKey?: IBookingKey;
    IATTravellerId?: string;
    ListsOfProfileMatch?: IListsOfProfileMatch;
    //ProfileMatches: IProfileMatch[];
}

export { IGetProfileMatchesResponse as default, IGetProfileMatchesResponse }