import axios from "axios";
import IApplicationClientRiskSummaryService from "./IApplicationClientRiskSummaryService";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";
import IClientRiskCheckKey from "./IClientRiskCheckKey";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetApplicationClientRiskSummaryRestResponse {
    errors?: any;
    getClientRiskSummaryResponse?: IApplicationClientRiskSummaryItem[];
}

class RestApplicationClientRiskSummaryService extends AbstractRestDataService implements IApplicationClientRiskSummaryService {
    getApplicationClientRiskSummary(clientRiskCheckKey: IClientRiskCheckKey) : Promise<IApplicationClientRiskSummaryItem[]> {
        const req = clientRiskCheckKey.asRequest();
        return axios.post(`${this.config.baseUrl}/VRAService/v1/resources/ClientRiskSummary`, req).then((value) => {
            const response = this.assertObject(value.data) as GetApplicationClientRiskSummaryRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getClientRiskSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestApplicationClientRiskSummaryService as default, RestApplicationClientRiskSummaryService };