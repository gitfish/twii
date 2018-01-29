import axios from "axios";
import IMasterEntityPotentialMatchesService from "./IMasterEntityPotentialMatchesService";
import IMasterEntityPotentialMatch from "./IMasterEntityPotentialMatch";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

interface GetMasterEntityPotentialMatchesRestResponse {
    errors?: any;
    getMasterEntityPotentialMatchesResponse?: IMasterEntityPotentialMatch[];
}

class RestMasterEntityPotentialMatchesService extends AbstractRestDataService implements IMasterEntityPotentialMatchesService {
    getMasterEntityPotentialMatches(masterEntityId : string) : Promise<IMasterEntityPotentialMatch[]> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntity/${encodeURIComponent(masterEntityId)}/potentialMatches`).then((value) => {
            const response = this.assertObject(value.data) as GetMasterEntityPotentialMatchesRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getMasterEntityPotentialMatchesResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestMasterEntityPotentialMatchesService as default, RestMasterEntityPotentialMatchesService };