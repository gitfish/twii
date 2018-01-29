import axios from "axios";
import IClientRiskCheckService from "./IClientRiskCheckService";
import IClientRiskCheck from "./IClientRiskCheck";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetClientRiskChecksRestResponse {
    errors?: any;
    getClientRiskOverviewResponse?: IClientRiskCheck[];
}

class RestClientRiskCheckService extends AbstractRestDataService implements IClientRiskCheckService {
    getClientRiskChecks(clientId : string) : Promise<IClientRiskCheck[]> {
        return axios.get(`${this.config.baseUrl}/VRAService/v1/resources/ClientRiskOverview/${encodeURIComponent(clientId)}`).then((value) => {
            const response = this.assertObject(value.data) as GetClientRiskChecksRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getClientRiskOverviewResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestClientRiskCheckService as default, RestClientRiskCheckService };