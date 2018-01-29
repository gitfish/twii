import IPNRService from "./IPNRService";
import IPNRKey from "./IPNRKey";
import IPNRSearchRequest from "./IPNRSearchRequest";
import IPNRServiceResponse from "./IPNRServiceResponse";
import IPNRSearchResult from "./IPNRSearchResult";
import IUrlConfig from "config/IUrlConfig";
import RestPNRServiceConfig from "config/RestPNRServiceConfig";
import axios from "axios";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";
import IPNRTicketPayment from "./IPNRTicketPayment";
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

//Requests
interface IDSPNRKeyRequest {
    p_bookingSystemCode: string;
	p_recordLocator: string;
	p_pnrCreationTimestamp: string;
}

interface IDSPNRSearchRequest {
    p_RecLocator?: string;
    p_BookingSysCode?: string;
    p_FamilyName?: string;
    p_GivenName?: string;
    p_DateOfBirth?: string;
    p_AgeFrom?: string;
    p_AgeTo?: string;
    p_PnrCreationTSFrom?: string;
    p_PnrCreationTSTo?: string;
    p_TravelDocID?: string;
    p_TravelDocCountryCode?: string;
    p_ArrivalDateFrom?: string;
    p_ArrivalDateTo?: string;
    p_DepartureDateFrom?: string;
    p_DepartureDateTo?: string;
    p_OriginCityPort?: string;
    p_OriginRouteID?: string;
    p_DestinationPort?: string;
    p_DesitinationRouteID?: string; // NOTE: deliberate typo matching ds schema - will probably be fixed
    p_ArrivalCarrier?: string;
    p_DepartureCarrier?: string;
}


//Mapping of requests
const mapSearchRequest = (request : IPNRSearchRequest) : IDSPNRSearchRequest => {
    if(request) {
        const r : IDSPNRSearchRequest = {};
        r.p_AgeFrom = !isNaN(request.ageFrom) ? String(request.ageFrom) : undefined;
        r.p_AgeTo = !isNaN(request.ageTo) ? String(request.ageTo) : undefined;
        r.p_ArrivalCarrier = request.arrivalCarrier;
        r.p_ArrivalDateFrom = request.arrivalDateFrom;
        r.p_ArrivalDateTo = request.arrivalDateTo;
        r.p_DateOfBirth = request.dateOfBirth;
        r.p_DepartureCarrier = request.departureCarrier;
        r.p_DepartureDateFrom = request.departureDateFrom;
        r.p_DepartureDateTo = request.departureDateTo;
        r.p_DesitinationRouteID = request.destinationRouteId;
        r.p_DestinationPort = request.destinationPort;
        r.p_FamilyName = request.familyName;
        r.p_GivenName = request.givenName;
        r.p_OriginCityPort = request.originCityPort;
        r.p_OriginRouteID = request.originRouteId;
        r.p_BookingSysCode = request.bookingSystemCode;
        r.p_PnrCreationTSFrom = request.pnrCreationTimestampFrom;
        r.p_PnrCreationTSTo = request.pnrCreationTimestampTo;
        r.p_RecLocator = request.recordLocator;
        r.p_TravelDocCountryCode = request.travelDocCountryCode;
        r.p_TravelDocID = request.travelDocId;
        return r;
    }
};

const mapKeyRequest = (key : IPNRKey) : IDSPNRKeyRequest => {
    return {
        p_bookingSystemCode: key.bookingSystemCode,
        p_recordLocator: key.recordLocator,
        p_pnrCreationTimestamp: key.pnrCreationTimestamp
    };
};

//Search result
interface IDSPNRSearchResult {
    dateOfBirth?: string;
    firstOLocalScheduledDate?: string;
    firstIRouteId?: string;
    countryOfIssue?: string;
    documentFamilyName?: string;
    passengerTattoo?: string;
    familyName?: string;
    firstORouteId?: string;
    givenName?: string;
    intentToTravelDate?: string;
    intentToEndTravelDate?: string;
    documentFreeText?: string;
    firstILocalPortCode?: string;
    recordLocator?: string;
    firstIForeignPortCode?: string;
    givenNames?: string;
    gender?: string;
    firstOForeignPortCode?: string;
    bookingSystemCode?: string;
    pnrCreationTimestamp?: string;
    travelDocumentNbr?: string;
    firstOLocalPortCode?: string;
    firstILocalScheduledDate?: string;
}

//Results
interface IDSPNRSearchResults {
    data?: IPNRSearchResult[];
}

interface IDSPNRTicketPaymentResults {
    data?: IPNRTicketPayment[];
}

interface IDSPNRTicketResults {
    data?: IPNRTicket[];
}

interface IDSPNRCheckinBagsInfoResults {
    data?: IPNRCheckinBagsInfo[];
}

interface IDSPersonHistoricalPNRResults {
    data?: IPersonHistoricalPNR[];
}

interface IDSPNRAirlineArrangementResults {
    data?: IPNRAirlineArrangement[];
}

interface IDSIATTravellerHistoricalPNRResults {
    data?: IIATTravellerHistoricalPNR[];
}

interface IDSPNRActiveItineraryResults {
    data?: IPNRActiveItinerary[];
}

interface IDSPNRCheckInAndBoardingResults {
    data?: IPNRCheckInAndBoarding[];
}

interface IDSPNRPushHistoryResults {
    data?: IPNRPushHistory[];
}

interface IDSPNRTravelSummaryResults {
    data?: IPNRTravelSummary[];
}

interface IDSPNRTravelStayResults {
    data?: IPNRTravelStay[];
}

interface IDSPNRRemarkFreeTextResults {
    data?: IPNRRemarkFreeText[];
}

interface IDSPNROtherServiceInfoResults {
    data?: IPNROtherServiceInfo[];
}

interface IDSPNRProfileDetailsAssociatedWithPnrResults {
    data?: IProfileDetailsAssociatedWithPnr[];
}

interface IDSPNRSpecialServiceRequestResults {
    data?: IPNRSpecialServiceRequest[];
}

interface IDSPNRTravelAgentResults {
    data?: IPNRTravelAgent[];
}

interface IDSLinkedOrSplitPnrResults {
    data?: ILinkedOrSplitPnr[];
}

interface IDSPNRContactDetailsResults {
    data?: IPNRContactDetails[];
}

interface IDSPNRHistoryResults {
    data?: IPNRHistory[];
}

//Responses
interface IDSPNRSearchResponse {
    getPnrMasterSearch?: IDSPNRSearchResults;
}

interface IDSPNRTicketPaymentResponse {
    getPnrTicketPaymentDetails?: IDSPNRTicketPaymentResults;
}

interface IDSPNRTicketResponse {
    getPnrTicketingDetails?: IDSPNRTicketResults;
}

interface IDSPNRCheckinBagsInfoResponse {
    getPNRCheckinBagsInfo?: IDSPNRCheckinBagsInfoResults;
}

interface IDSPersonHistoricalPNRResponse {
    getPersonHistoricalPNR?: IDSPersonHistoricalPNRResults;
}

interface IDSPNRAirlineArrangementResponse {
    getPNRAirlineArrangement?: IDSPNRAirlineArrangementResults;
}

interface IDSIATTravellerHistoricalPNRResponse {
    getIATTravellerHistoricalPNR?: IDSIATTravellerHistoricalPNRResults;
}

interface IDSPNRActiveItineraryResponse {
    getPnrActiveItenaryDetails?: IDSPNRActiveItineraryResults;
}

interface IDSPNRCheckInAndBoardingResponse {
    getPnrCheckInAndBoardingDetails?: IDSPNRCheckInAndBoardingResults;
}

interface IDSPNRPushHistoryResponse {
    getPNRPushHistory?: IDSPNRPushHistoryResults;
}

interface IDSPNRTravelSummaryResponse {
    getPnrTravelSummaryDetails?: IDSPNRTravelSummaryResults;
}

interface IDSPNRTravelStayResponse {
    getPnrTravelStayDetails?: IDSPNRTravelStayResults;
}

interface IDSPNRRemarkFreeTextResponse {
    getPNRRemarksFreeText?: IDSPNRRemarkFreeTextResults;
}

interface IDSPNROtherServiceInfoResponse {
    getPNROtherServiceInformation?: IDSPNROtherServiceInfoResults;
}

interface IDSPNRProfileDetailsAssociatedWithPnrResponse {
    getProfileDetailsAssociatedWithPnr?: IDSPNRProfileDetailsAssociatedWithPnrResults;
}

interface IDSPNRSpecialServiceRequestResponse {
    getPNRSpecialServiceRequest?: IDSPNRSpecialServiceRequestResults;
}

interface IDSPNRTravelAgentResponse {
    getPnrTravelAgentDetails?: IDSPNRTravelAgentResults;
}

interface IDSLinkedOrSplitPnrResponse {
    getLinkedOrSplitPnrDetails?: IDSLinkedOrSplitPnrResults;
}

interface IDSPNRContactDetailsResponse {
    getPnrContactsDetails?: IDSPNRContactDetailsResults;
}

interface IDSPNRHistoryResponse {
    getPNRHistory?: IDSPNRHistoryResults;
}

//Mapping of responses
const mapSearchResponse = (response : IDSPNRSearchResponse) : IPNRServiceResponse<IPNRSearchResult> => {
    if(response && response.getPnrMasterSearch) {
        const r : IPNRServiceResponse<IPNRSearchResult> = { data: [] };
        const data = response.getPnrMasterSearch.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            });
        }
        return r;
    }
};

const mapTicketPaymentResponse = (response : IDSPNRTicketPaymentResponse) : IPNRServiceResponse<IPNRTicketPayment> => {
    if(response && response.getPnrTicketPaymentDetails) {
        const r : IPNRServiceResponse<IPNRTicketPayment> = { data : [] };
        const data = response.getPnrTicketPaymentDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapTicketResponse = (response : IDSPNRTicketResponse) : IPNRServiceResponse<IPNRTicket> => {
    if(response && response.getPnrTicketingDetails) {
        const r : IPNRServiceResponse<IPNRTicket> = { data : [] };
        const data = response.getPnrTicketingDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapCheckinBagsInfoResponse = (response : IDSPNRCheckinBagsInfoResponse) : IPNRServiceResponse<IPNRCheckinBagsInfo> => {
    if(response && response.getPNRCheckinBagsInfo) {
        const r : IPNRServiceResponse<IPNRCheckinBagsInfo> = { data : [] };
        const data = response.getPNRCheckinBagsInfo.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapPersonHistoricalPNRResponse = (response : IDSPersonHistoricalPNRResponse) : IPNRServiceResponse<IPersonHistoricalPNR> => {
    if(response && response.getPersonHistoricalPNR) {
        const r : IPNRServiceResponse<IPersonHistoricalPNR> = { data : [] };
        const data = response.getPersonHistoricalPNR.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapAirlineArrangementResponse = (response : IDSPNRAirlineArrangementResponse) : IPNRServiceResponse<IPNRAirlineArrangement> => {
    if(response && response.getPNRAirlineArrangement) {
        const r : IPNRServiceResponse<IPNRAirlineArrangement> = { data : [] };
        const data = response.getPNRAirlineArrangement.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapIATTravellerHistoricalPNRResponse = (response : IDSIATTravellerHistoricalPNRResponse) : IPNRServiceResponse<IIATTravellerHistoricalPNR> => {
    if(response && response.getIATTravellerHistoricalPNR) {
        const r : IPNRServiceResponse<IIATTravellerHistoricalPNR> = { data : [] };
        const data = response.getIATTravellerHistoricalPNR.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapActiveItineraryResponse = (response : IDSPNRActiveItineraryResponse) : IPNRServiceResponse<IPNRActiveItinerary> => {
    if(response && response.getPnrActiveItenaryDetails) {
        const r : IPNRServiceResponse<IPNRActiveItinerary> = { data : [] };
        const data = response.getPnrActiveItenaryDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapCheckInAndBoardingResponse = (response : IDSPNRCheckInAndBoardingResponse) : IPNRServiceResponse<IPNRCheckInAndBoarding> => {
    if(response && response.getPnrCheckInAndBoardingDetails) {
        const r : IPNRServiceResponse<IPNRCheckInAndBoarding> = { data : [] };
        const data = response.getPnrCheckInAndBoardingDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapPushHistoryResponse = (response : IDSPNRPushHistoryResponse) : IPNRServiceResponse<IPNRPushHistory> => {
    if(response && response.getPNRPushHistory) {
        const r : IPNRServiceResponse<IPNRPushHistory> = { data : [] };
        const data = response.getPNRPushHistory.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapTravelSummaryResponse = (response : IDSPNRTravelSummaryResponse) : IPNRServiceResponse<IPNRTravelSummary> => {
    if(response && response.getPnrTravelSummaryDetails) {
        const r : IPNRServiceResponse<IPNRTravelSummary> = { data : [] };
        const data = response.getPnrTravelSummaryDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapTravelStayResponse = (response : IDSPNRTravelStayResponse) : IPNRServiceResponse<IPNRTravelStay> => {
    if(response && response.getPnrTravelStayDetails) {
        const r : IPNRServiceResponse<IPNRTravelStay> = { data : [] };
        const data = response.getPnrTravelStayDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapRemarkFreeTextResponse = (response : IDSPNRRemarkFreeTextResponse) : IPNRServiceResponse<IPNRRemarkFreeText> => {
    if(response && response.getPNRRemarksFreeText) {
        const r : IPNRServiceResponse<IPNRRemarkFreeText> = { data : [] };
        const data = response.getPNRRemarksFreeText.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapOtherServiceInfoResponse = (response : IDSPNROtherServiceInfoResponse) : IPNRServiceResponse<IPNROtherServiceInfo> => {
    if(response && response.getPNROtherServiceInformation) {
        const r : IPNRServiceResponse<IPNROtherServiceInfo> = { data : [] };
        const data = response.getPNROtherServiceInformation.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapProfileDetailsAssociatedWithPnrResponse = (response : IDSPNRProfileDetailsAssociatedWithPnrResponse) 
    : IPNRServiceResponse<IProfileDetailsAssociatedWithPnr> => {
    if(response && response.getProfileDetailsAssociatedWithPnr) {
        const r : IPNRServiceResponse<IProfileDetailsAssociatedWithPnr> = { data : [] };
        const data = response.getProfileDetailsAssociatedWithPnr.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapSpecialServiceRequestResponse = (response : IDSPNRSpecialServiceRequestResponse) : IPNRServiceResponse<IPNRSpecialServiceRequest> => {
    if(response && response.getPNRSpecialServiceRequest) {
        const r : IPNRServiceResponse<IPNRSpecialServiceRequest> = { data : [] };
        const data = response.getPNRSpecialServiceRequest.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapTravelAgentResponse = (response : IDSPNRTravelAgentResponse) : IPNRServiceResponse<IPNRTravelAgent> => {
    if(response && response.getPnrTravelAgentDetails) {
        const r : IPNRServiceResponse<IPNRTravelAgent> = { data : [] };
        const data = response.getPnrTravelAgentDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapLinkedOrSplitPnrResponse = (response : IDSLinkedOrSplitPnrResponse) : IPNRServiceResponse<ILinkedOrSplitPnr> => {
    if(response && response.getLinkedOrSplitPnrDetails) {
        const r : IPNRServiceResponse<ILinkedOrSplitPnr> = { data : [] };
        const data = response.getLinkedOrSplitPnrDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapContactDetailsResponse = (response : IDSPNRContactDetailsResponse) : IPNRServiceResponse<IPNRContactDetails> => {
    if(response && response.getPnrContactsDetails) {
        const r : IPNRServiceResponse<IPNRContactDetails> = { data : [] };
        const data = response.getPnrContactsDetails.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

const mapHistoryResponse = (response : IDSPNRHistoryResponse) : IPNRServiceResponse<IPNRHistory> => {
    if(response && response.getPNRHistory) {
        const r : IPNRServiceResponse<IPNRHistory> = { data : [] };
        const data = response.getPNRHistory.data;
        if(data && data.length > 0) {
            data.forEach(item => {
                if(item) {
                    r.data.push(item);
                }
            })
        }
        return r;
    }
};

//Rest service impl
class RestPNRService implements IPNRService {
    private _config : IUrlConfig;

    get config() : IUrlConfig {
        return this._config || RestPNRServiceConfig;
    }

    set config(value) {
        this._config = value;
    }

    searchPNR(request : IPNRSearchRequest) : Promise<IPNRServiceResponse<IPNRSearchResult>> {
        const restRequest = mapSearchRequest(request);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRMasterSearch`, restRequest).then((value) => {
            const response =  value.data as IDSPNRSearchResponse;
            return mapSearchResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRTicketPaymentDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicketPayment>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrTicketPaymentDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRTicketPaymentResponse;
            return mapTicketPaymentResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRTicketingDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicket>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrTicketingDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRTicketResponse;
            return mapTicketResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRCheckinBagsInfo(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRCheckinBagsInfo>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRCheckinBagsInfo`, restRequest).then((value) => {
            const response = value.data as IDSPNRCheckinBagsInfoResponse;
            return mapCheckinBagsInfoResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPersonHistoricalPNR(key : IPNRKey) : Promise<IPNRServiceResponse<IPersonHistoricalPNR>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPersonHistoricalPNR`, restRequest).then((value) => {
            const response = value.data as IDSPersonHistoricalPNRResponse;
            return mapPersonHistoricalPNRResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRAirlineArrangement(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRAirlineArrangement>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRAirlineArrangement`, restRequest).then((value) => {
            const response = value.data as IDSPNRAirlineArrangementResponse;
            return mapAirlineArrangementResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    
    getIATTravellerHistoricalPNR(key : IPNRKey) : Promise<IPNRServiceResponse<IIATTravellerHistoricalPNR>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getIATTravellerHistoricalPNR`, restRequest).then((value) => {
            const response = value.data as IDSIATTravellerHistoricalPNRResponse;
            return mapIATTravellerHistoricalPNRResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRActiveItenaryDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRActiveItinerary>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrActiveItenaryDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRActiveItineraryResponse;
            return mapActiveItineraryResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRCheckInAndBoardingDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRCheckInAndBoarding>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrCheckInAndBoardingDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRCheckInAndBoardingResponse;
            return mapCheckInAndBoardingResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRPushHistory(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRPushHistory>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRPushHistory`, restRequest).then((value) => {
            const response = value.data as IDSPNRPushHistoryResponse;
            return mapPushHistoryResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRTravelSummaryDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelSummary>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrTravelSummaryDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRTravelSummaryResponse;
            return mapTravelSummaryResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRTravelStayDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelStay>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrTravelStayDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRTravelStayResponse;
            return mapTravelStayResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRRemarksFreeText(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRRemarkFreeText>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRRemarksFreeText`, restRequest).then((value) => {
            const response = value.data as IDSPNRRemarkFreeTextResponse;
            return mapRemarkFreeTextResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNROtherServiceInformation(key : IPNRKey) : Promise<IPNRServiceResponse<IPNROtherServiceInfo>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNROtherServiceInformation`, restRequest).then((value) => {
            const response = value.data as IDSPNROtherServiceInfoResponse;
            return mapOtherServiceInfoResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getProfileDetailsAssociatedWithPnr(key : IPNRKey) : Promise<IPNRServiceResponse<IProfileDetailsAssociatedWithPnr>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getProfileDetailsAssociatedWithPnr`, restRequest).then((value) => {
            const response = value.data as IDSPNRProfileDetailsAssociatedWithPnrResponse;
            return mapProfileDetailsAssociatedWithPnrResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRSpecialServiceRequest(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRSpecialServiceRequest>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRSpecialServiceRequest`, restRequest).then((value) => {
            const response = value.data as IDSPNRSpecialServiceRequestResponse;
            return mapSpecialServiceRequestResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPnrTravelAgentDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelAgent>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrTravelAgentDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRTravelAgentResponse;
            return mapTravelAgentResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getLinkedOrSplitPnrDetails(key : IPNRKey) : Promise<IPNRServiceResponse<ILinkedOrSplitPnr>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getLinkedOrSplitPnrDetails`, restRequest).then((value) => {
            const response = value.data as IDSLinkedOrSplitPnrResponse;
            return mapLinkedOrSplitPnrResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPnrContactsDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRContactDetails>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPnrContactsDetails`, restRequest).then((value) => {
            const response = value.data as IDSPNRContactDetailsResponse;
            return mapContactDetailsResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

    getPNRHistory(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRHistory>> {
        const restRequest = mapKeyRequest(key);
        return axios.post(`${this.config.baseUrl}/PNRSearch/resources/v1/getPNRHistory`, restRequest).then((value) => {
            const response = value.data as IDSPNRHistoryResponse;
            return mapHistoryResponse(response);
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }

}

export { RestPNRService as default, RestPNRService }
