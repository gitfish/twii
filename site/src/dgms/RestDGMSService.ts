import axios from "axios";
import { IDGMSService, IDGMSActivitiesGetRequest } from "./IDGMSService";
import IDGMSActivity from "./IDGMSActivity";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

class GetActivitiesRestResponse {
    errors?: any;
    getDgmsSummaryResponse?: IDGMSActivity[];
}

class RestDGMSService extends AbstractRestDataService implements IDGMSService {
    getDGMSActivities(request : IDGMSActivitiesGetRequest) : Promise<IDGMSActivity[]> {
        return axios.get(`${this.config.baseUrl}/resources/dgmsSummary/${encodeURIComponent(request.parentId)}`, {
            params: { maxNoOfRecords: request.maxNumberOfRecords > 0 ? request.maxNumberOfRecords : DEFAULT_MAX_NO_RECORDS }
        }).then((value) => {
            const response = value.data as GetActivitiesRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getDgmsSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestDGMSService as default, RestDGMSService };