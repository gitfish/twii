import axios from "axios";
import { IINTCPService } from "./IINTCPService";
import IINTCPMovement from "./IINTCPMovement";
import IINTCPOrgSummaryItem from "./IINTCPOrgSummaryItem";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetMovementsRestResponse {
    errors?: any;
    getIndividualInterceptSummaryInformationResponse?: IINTCPMovement[];
}

interface GetOrganisationSummaryRestResponse {
    errors?: any;
    getOrganisationInterceptSummaryInformationResponse?: IINTCPOrgSummaryItem[];
}

class RestINTCPService extends AbstractRestDataService implements IINTCPService {
    getINTCPMovements(subjectId: string) : Promise<IINTCPMovement[]> {
        return axios.get(`${this.config.baseUrl}/InterceptService/resources/IndividualInterceptSummary/${encodeURIComponent(subjectId)}`).then((value) => {
            const response = value.data as GetMovementsRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getIndividualInterceptSummaryInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getOrganisationINTCPSummary(subjectId: string) : Promise<IINTCPOrgSummaryItem[]> {
        return axios.get(`${this.config.baseUrl}/InterceptService/resources/OrganisationInterceptSummary/${encodeURIComponent(subjectId)}`).then((value) => {
            const response = value.data as GetOrganisationSummaryRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getOrganisationInterceptSummaryInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestINTCPService as default, RestINTCPService };