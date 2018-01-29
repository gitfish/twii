import axios from "axios";
import { IEXAMSService, IEXAMSActivityGetRequest } from "./IEXAMSService";
import IEXAMSActivity from "./IEXAMSActivity";
import IListResult from "common/IListResult";
import { AbstractRestDataService, NoResultErrorCode } from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

interface GetExamsRestResponse {
    errors?: any;
    getCargoExamsSummaryResponse?: IEXAMSActivity[];
    total?: number;
}

class RestEXAMSService extends AbstractRestDataService implements IEXAMSService {
    getEXAMSActivities(request : IEXAMSActivityGetRequest) : Promise<IListResult<IEXAMSActivity>> {
        const internalRequest = Object.assign({}, request);
        if(isNaN(internalRequest.maxNumberOfRecords) || internalRequest.maxNumberOfRecords <= 0) {
            internalRequest.maxNumberOfRecords = DEFAULT_MAX_NO_RECORDS;
        }
        return axios.post(`${this.config.baseUrl}/CargoExamsService/v1/resources/CargoExamsSummary`, internalRequest).then((value) => {
            const response = value.data as GetExamsRestResponse;
            if(response.errors) {
                if(response.errors.code !== NoResultErrorCode) {
                   throw response.errors;
                }
                return { items: [], total: 0 };
            }
            return { items: response.getCargoExamsSummaryResponse, total: response.total };
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestEXAMSService as default, RestEXAMSService }