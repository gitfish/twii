import axios from "axios";
import IMasterEntityHistoryService from "./IMasterEntityHistoryService";
import IMasterEntityHistoryItem from "./IMasterEntityHistoryItem";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetMasterEntityHistoryRestResponse {
    errors?: any;
    getMasterEntityHistoryResponse?: IMasterEntityHistoryItem[];
}

class RestMasterEntityHistoryService extends AbstractRestDataService implements IMasterEntityHistoryService {
    getMasterEntityHistory(masterEntityId : string) : Promise<IMasterEntityHistoryItem[]> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntity/${encodeURIComponent(masterEntityId)}/History`).then((value) => {
            const response = this.assertObject(value.data) as GetMasterEntityHistoryRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getMasterEntityHistoryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestMasterEntityHistoryService as default, RestMasterEntityHistoryService };