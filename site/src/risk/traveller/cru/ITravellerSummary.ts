import IListOfConnection from "./IListOfConnection";
import ICruiseTraveller from "./ICruiseTraveller";
import IIATTraveller from "risk/traveller/cru/common/IIATTraveller";
import IBookingVisa from "./IBookingVisa";

interface ITravellerSummary {
    StaffInd?: string;
    PassengerNumber?: number;
    LoyaltyId?: string;
    LoyaltyLevel?: string;
    NoOfCruises?: number;
    BerthCode?: string;
    MedicalCode?: string;
    DietCode?: string;
    ConcessionCode?: string;
    InsuranceInd?: string;
    CurrentCruiseFlag?: string;
    PassengerStatus?: string;
    CompleteCruiseItinerary?: string;
    Connections?: IListOfConnection;
    CruiseTraveller?: ICruiseTraveller;
    IATTraveller?: IIATTraveller;
    BookingVisaInfo?: IBookingVisa;
}

export { ITravellerSummary as default, ITravellerSummary }