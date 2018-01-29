import axios from "axios";
import { ISeaCargoService, ISeaCargoActivitiesGetRequest } from "./ISeaCargoService";
import ISeaCargoActivity from "./ISeaCargoActivity";
import ISeaCargoActivityDetail from "./ISeaCargoActivityDetail";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

class GetActivitiesRestResponse {
    errors?: any;
    getSeaCargoSummaryResponse?: ISeaCargoActivity[];
}

class GetActivityDetailsRestResponse {
    errors?: any;
    getSeaCargoDetailInformationResponse?: ISeaCargoActivityDetail[];
}

class RestSeaCargoService extends AbstractRestDataService implements ISeaCargoService {
    getSeaCargoActivities(request : ISeaCargoActivitiesGetRequest) : Promise<ISeaCargoActivity[]> {
        return axios.get(`${this.config.baseUrl}/resources/seaCargo/${encodeURIComponent(request.parentId)}`, {
            params: { maxNoOfRecords: request.maxNumberOfRecords > 0 ? request.maxNumberOfRecords : DEFAULT_MAX_NO_RECORDS }
        }).then((value) => {
            const response = value.data as GetActivitiesRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getSeaCargoSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getSeaCargoActivityDetails(oceanBillNbr : string) : Promise<ISeaCargoActivityDetail[]> {
        return axios.get(`${this.config.baseUrl}/CargoService/resources/seaCargoDetails/${encodeURIComponent(oceanBillNbr)}`).then((value) => {
            const response = value.data as GetActivityDetailsRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getSeaCargoDetailInformationResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestSeaCargoService as default, RestSeaCargoService };