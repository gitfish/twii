import axios from "axios";
import { IBAGSService, IBAGSActivitiesGetRequest } from "./IBAGSService";
import IBAGSActivity from "./IBAGSActivity";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

interface GetExamsRestResponse {
    errors?: any;
    getBagsExamSummaryResponse?: IBAGSActivity[];
}

class RestBAGSService extends AbstractRestDataService implements IBAGSService {
    getBAGSActivities(request : IBAGSActivitiesGetRequest) : Promise<IBAGSActivity[]> {
        const internalRequest = Object.assign({}, request);
        if(isNaN(internalRequest.maxNumberOfRecords) || internalRequest.maxNumberOfRecords <= 0) {
            internalRequest.maxNumberOfRecords = DEFAULT_MAX_NO_RECORDS;
        }
        return axios.post(`${this.config.baseUrl}/resources/bagsSummary`, internalRequest).then((value) => {
            const response = value.data as GetExamsRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getBagsExamSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestBAGSService as default, RestBAGSService };