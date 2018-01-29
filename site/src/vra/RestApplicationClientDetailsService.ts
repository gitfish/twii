import axios from "axios";
import IApplicationClientDetailsService from "./IApplicationClientDetailsService";
import IApplicationClient from "./IApplicationClient";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetApplicationClientDetailsRestResponse {
    errors?: any;
    getApplicationClientRiskSummaryResponse?: IApplicationClient[];
}

class RestApplicationClientDetailsService extends AbstractRestDataService implements IApplicationClientDetailsService {
    getApplicationClientDetails(permissionRequestId : string) : Promise<IApplicationClient[]> {
        return axios.get(`${this.config.baseUrl}/VRAService/v1/resources/ApplicationClientRiskSummary/${encodeURIComponent(permissionRequestId)}`).then((value) => {
            const response = this.assertObject(value.data) as GetApplicationClientDetailsRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getApplicationClientRiskSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestApplicationClientDetailsService as default, RestApplicationClientDetailsService };