import axios from "axios";
import { IIATService, IIATMovementsGetRequest } from "./IIATService";
import IIATMovement from "./IIATMovement";
import IIATMovementDetail from "./IIATMovementDetail";
import IIATPassport from "./IIATPassport";
import IIATVisa from "./IIATVisa";
import IIATAlias from "./IIATAlias";
import IIATFlightListItem from "./IIATFlightListItem";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DateUtils from "util/Date";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

interface RestIATMovementsGetRequest {
    IATTravellerID: string;
    FromDate?: string;
    ToDate?: string;
    TravelDocID?: string;
    TravelDocCountryCode?: string;
    CheckInPortCode?: string;
    LocalPortCode?: string;
    DirectionCode?: string;
    maxNumberOfRecords?: number;
    proxyUser?: string; // Hmm - maybe we could just default this to "AnalystDesktop" so they at least know the application the call is coming from
}

interface GetMovementsRestResponse {
    errors?: any;
    getTravellerMovementSummaryResponse?: IIATMovement[];
}

interface GetMovementDetailRestResponse {
    errors?: any;
    getTravellerMovementInformationResponse?: IIATMovementDetail[];
}

interface GetPassportsRestResponse {
    errors?: any;
    getTravellerPassportInformationResponse?: IIATPassport[];
}

interface GetVisasRestResponse {
    errors?: any;
    getTravellerVisaInformationResponse?: IIATVisa[];
}

interface GetAliasesRestResponse {
    errors?: any;
    getTravellerPersonAliasInformationResponse?: IIATAlias[];
}

interface GetFlightListRestResponse {
    errors?: any;
    getTravellerMovementFlightListResponse?: IIATFlightListItem[];
}

class RestIATService extends AbstractRestDataService implements IIATService {
    getIATMovements(request : IIATMovementsGetRequest) : Promise<IIATMovement[]> {
        const req : RestIATMovementsGetRequest = {
            IATTravellerID: request.iatTravellerId,
            FromDate: request.fromDate ? DateUtils.dateToDataText(request.fromDate) : undefined,
            ToDate: request.toDate ? DateUtils.dateToDataText(request.toDate) : undefined,
            TravelDocID: request.travelDocumentId,
            TravelDocCountryCode: request.travelDocumentCountryCode,
            CheckInPortCode: request.checkInPortCode,
            LocalPortCode: request.localPortCode,
            DirectionCode: request.directionCode,
            maxNumberOfRecords: request.maxNumberOfRecords > 0 ? request.maxNumberOfRecords : DEFAULT_MAX_NO_RECORDS
        }
        return axios.post(`${this.config.baseUrl}/TravellerService/resources/TravellerSummary`, req).then((value) => {
            const response = value.data as GetMovementsRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getTravellerMovementSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getIATMovementDetails(iatTravellerId: string, routeId: string, localScheduledDate: string, directionCode: string) : Promise<IIATMovementDetail[]> {
        const req = {
            IATTravellerId: iatTravellerId,
            routeId: routeId,
            localScheduledDate: localScheduledDate,
            directionCd: directionCode
        }
        return axios.post(`${this.config.baseUrl}/TravellerService/resources/TravellerMovements`, req).then((value) : any =>  {
            const response = value.data as GetMovementDetailRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getTravellerMovementInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getPassports(travelDocumentId: string, travelDocCountryCode: string): Promise<IIATPassport[]> {
        const req = {
            travelDocID: travelDocumentId,
            travelDocDeptCountryCode: travelDocCountryCode
        }
        return axios.post(`${this.config.baseUrl}/TravellerService/resources/TravellerPassportDetails`, req).then((value): any => {
            const response = value.data as GetPassportsRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getTravellerPassportInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getVisas(visaIdentifyingNbr: string): Promise<IIATVisa[]> {
        return axios.get(`${this.config.baseUrl}/TravellerService/resources/TravellerVisa/${encodeURIComponent(visaIdentifyingNbr)}`).then((value): any => {
            const response = value.data as GetVisasRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getTravellerVisaInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getAliases(iatTravellerId: string): Promise<IIATAlias[]> {
        return axios.get(`${this.config.baseUrl}/TravellerService/resources/TravellerPersonAliasInformation/${encodeURIComponent(iatTravellerId)}`).then((value) : any => {
            const response = value.data as GetAliasesRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getTravellerPersonAliasInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getIATFlightList(routeId: string, localScheduledDate: string, directionCode: string) : Promise<IIATFlightListItem[]> {
        const req = {
            routeId: routeId,
            localScheduledDate: localScheduledDate,
            directionCd: directionCode
        };
        return axios.post(`${this.config.baseUrl}/TravellerService/resources/TravellerFlightList`, req).then((value) : any => {
            const response = value.data as GetFlightListRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getTravellerMovementFlightListResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestIATService as default, RestIATService };