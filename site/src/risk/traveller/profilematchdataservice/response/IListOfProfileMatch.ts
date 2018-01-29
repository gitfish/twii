import IProfileMatchList from "./IProfileMatchList";

/* Todo: in xsd, a choice of PassengerTattoo, PassengerNumber, or IATTravellerId  
    for now, temporarily use PassengerTattoo 
*/

interface IListOfProfileMatch {
    PassengerTattoo?: number;
    PassengerNumber?: number;
    IATTravellerId?: string;
    ProfileMatches?: IProfileMatchList;
}

export { IListOfProfileMatch as default, IListOfProfileMatch }