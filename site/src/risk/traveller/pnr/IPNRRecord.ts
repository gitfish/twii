import IBookingRecordInfo from "./IBookingRecordInfo";
import IBookingSummary from "./IBookingSummary";
import IListOfPNRRecordKey from "./IListOfPNRRecordKey";
import IListOfTravellerSummary from "./IListOfTravellerSummary";
import IListOfItinerary from "./IListOfItinerary";
import IListOfPNRPushHistory from "./IListOfPNRPushHistory";
import IListOfTravelAgent from "./IListOfTravelAgent";
import IListOfPayment from "./IListOfPayment";
import IListOfContact from "./IListOfContact";
import IListOfSpecialServiceRequest from "./IListOfSpecialServiceRequest";
import IListOfOtherService from "./IListOfOtherService";
import IListOfSKOtherComment from "./IListOfSKOtherComment";
import IListOfPNRHistory from "./IListOfPNRHistory";

interface IPNRRecord {
    BookingRecordInfo?: IBookingRecordInfo;
    BookingSummaryInfo?: IBookingSummary;
    LinkedPNRInfo?: IListOfPNRRecordKey;
    SplitPNRInfo?: IListOfPNRRecordKey;
    TravellerInfo?: IListOfTravellerSummary;
    ItineraryInfo?: IListOfItinerary;
    PNRPushHistoryInfo?: IListOfPNRPushHistory;
    TravelAgentInfo?: IListOfTravelAgent;
    PaymentInfo?: IListOfPayment;
    ContactInfo?: IListOfContact;
    SpecialServiceRequestInfo?: IListOfSpecialServiceRequest;
    OtherServiceInfo?: IListOfOtherService;
    PNRSKOtherCommentInfo?: IListOfSKOtherComment;
    PNRHistoryInfo?: IListOfPNRHistory;
}

export { IPNRRecord as default, IPNRRecord }