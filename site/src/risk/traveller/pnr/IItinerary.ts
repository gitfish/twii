import IListOfCheckinBoarding from "./IListOfCheckinBoarding";
import IListOfTicketing from "./IListOfTicketing";
import IListOfContact from "./IListOfContact";

interface IItinerary {
    SegmentTattoo?: number;
    CancellationInd?: string;
    TransportType?: string;
    CraftId?: string;
    CodeShare?: string;
    CabinClass?: string;
    FareClass?: string;
    Route?: string;
    DepartureDate?: Date;
    DepartureTime?: Date;
    ArrivalDate?: Date;
    ArrivalTime?: Date;
    DepatureDay?: string; // NOTE: typo - this is defined in the schema
    Status?: string;
    DaysAtArrivalPort?: number;
    HotelName?: string;
    HotelAddress?: string;
    CheckinBoardingInfo?: IListOfCheckinBoarding;
    TicketingInfo?: IListOfTicketing;
    ContactInfo?: IListOfContact;
}

export { IItinerary as default, IItinerary }