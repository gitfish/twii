import ICruiseSummary from "./ICruiseSummary";
import IListOfContact from "./IListOfContact";
import IBookingSummary  from "./IBookingSummary";
import IListOfTravelAgent from "./IListOfTravelAgent";

interface ICruiseBooking {
    AirAmount?: number;
    ApoCategoryCode?: string;
    BookingCategoryCode?: string;
    BookingComment?: string;
    BookingDate?: Date;
    BookingPLAmount?: number;
    BookingStatus?: string;
    BrochureCode?: string;
    BrochureFareAmount?: number;
    CabinNumber?: string;
    CabinTypeDescription?: string;
    CancelFeesAmount?: number;
    CoachAmount?: number;
    CommissionAmount?: number;
    CurrencyCode?: string;
    DiscountAmount?: number;
    FareCode?: string;
    FeesAmount?: number;
    GrossAmount?: number;
    GroupName?: string;
    InsuranceAmount?: number;
    LandTourAmount?: number;
    MiscellaneousAmount?: number;
    NetAmount?: number;
    NumberPaxBooking?: number;
    NumberPaxCabin?: number;
    OnBoardCreditAmount?: number;
    OpenDateTime?: Date;
    OptionDateTime?: Date;
    BookedDateTime?: Date;
    OverrideCommissionAmount?: Date;
    PackageAmount?: number;
    PID?: string;
    PromoCode?: string;
    ReceivedAmount?: number;
    SpecialServiceAmount?: number;
    TicketedFareAmount?: number;
    TravelAgentFeesAmount?: number;
    TWID?: string;
    VATAmount?: number;
    CruiseSummaryInfo?: ICruiseSummary;
    ContactInfo?: IListOfContact;
    BookingSummaryInfo?: IBookingSummary;
    TravelAgentInfo?: IListOfTravelAgent;
}

export { ICruiseBooking as default, ICruiseBooking }