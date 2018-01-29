import axios from "axios";
import IApplicationRiskSummaryService from "./IApplicationRiskSummaryService";
import IApplicationRiskSummaryItem from "./IApplicationRiskSummaryItem";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetApplicationRiskSummaryRestResponse {
    errors?: any;
    getApplicationRiskSummaryResponse?: IApplicationRiskSummaryItem[];
}

class RestApplicationRiskSummaryService extends AbstractRestDataService implements IApplicationRiskSummaryService {
    getApplicationRiskSummary(permissionRequestId : string) : Promise<IApplicationRiskSummaryItem[]> {
        return axios.get(`${this.config.baseUrl}/VRAService/v1/resources/ApplicationRiskSummary/${encodeURIComponent(permissionRequestId)}`).then((value) => {
            const response = this.assertObject(value.data) as GetApplicationRiskSummaryRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getApplicationRiskSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestApplicationRiskSummaryService as default, RestApplicationRiskSummaryService };