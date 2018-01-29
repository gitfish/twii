import IPNRSearchRequest from "./IPNRSearchRequest";
import IPNRServiceResponse from "./IPNRServiceResponse";
import IPNRSearchResult from "./IPNRSearchResult";
import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRKey from "./IPNRKey";
import IPNRTicket from "./IPNRTicket";
import IPNRCheckinBagsInfo from "./IPNRCheckinBagsInfo";
import IPersonHistoricalPNR from "./IPersonHistoricalPNR";
import IPNRAirlineArrangement from "./IPNRAirlineArrangement";
import IIATTravellerHistoricalPNR from "./IIATTravellerHistoricalPNR";
import IPNRActiveItinerary from "./IPNRActiveItinerary";
import IPNRCheckInAndBoarding from "./IPNRCheckInAndBoarding";
import IPNRPushHistory from "./IPNRPushHistory";
import IPNRTravelSummary from "./IPNRTravelSummary";
import IPNRTravelStay from "./IPNRTravelStay";
import IPNRRemarkFreeText from "./IPNRRemarkFreeText";
import IPNROtherServiceInfo from "./IPNROtherServiceInfo";
import IProfileDetailsAssociatedWithPnr from "./IProfileDetailsAssociatedWithPnr";
import IPNRSpecialServiceRequest from "./IPNRSpecialServiceRequest";
import IPNRTravelAgent from "./IPNRTravelAgent";
import ILinkedOrSplitPnr from "./ILinkedOrSplitPnr";
import IPNRContactDetails from "./IPNRContactDetails";
import IPNRHistory from "./IPNRHistory";


interface IPNRService {
    searchPNR(request : IPNRSearchRequest) : Promise<IPNRServiceResponse<IPNRSearchResult>>;
    getPNRTicketPaymentDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicketPayment>>;
    getPNRTicketingDetails(key: IPNRKey) : Promise<IPNRServiceResponse<IPNRTicket>>;
    getPNRCheckinBagsInfo(key: IPNRKey) : Promise<IPNRServiceResponse<IPNRCheckinBagsInfo>>;
    getPersonHistoricalPNR(key : IPNRKey) : Promise<IPNRServiceResponse<IPersonHistoricalPNR>>;
    getPNRAirlineArrangement(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRAirlineArrangement>>;
    getIATTravellerHistoricalPNR(key : IPNRKey) : Promise<IPNRServiceResponse<IIATTravellerHistoricalPNR>>;
    getPNRActiveItenaryDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRActiveItinerary>>;
    getPNRCheckInAndBoardingDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRCheckInAndBoarding>>;
    getPNRPushHistory(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRPushHistory>>;
    getPNRTravelSummaryDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelSummary>>;
    getPNRTravelStayDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelStay>>;
    getPNRRemarksFreeText(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRRemarkFreeText>>;
    getPNROtherServiceInformation(key : IPNRKey) : Promise<IPNRServiceResponse<IPNROtherServiceInfo>>;
    getProfileDetailsAssociatedWithPnr(key : IPNRKey) : Promise<IPNRServiceResponse<IProfileDetailsAssociatedWithPnr>>;
    getPNRSpecialServiceRequest(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRSpecialServiceRequest>>;
    getPnrTravelAgentDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelAgent>>;
    getLinkedOrSplitPnrDetails(key : IPNRKey) : Promise<IPNRServiceResponse<ILinkedOrSplitPnr>>;
    getPnrContactsDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRContactDetails>>;
    getPNRHistory(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRHistory>>;
    
}

export { IPNRService as default, IPNRService }