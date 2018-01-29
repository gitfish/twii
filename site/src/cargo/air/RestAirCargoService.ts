import axios from "axios";
import { IAirCargoService, IAirCargoActivitiesGetRequest } from "./IAirCargoService";
import IAirCargoActivity from "./IAirCargoActivity";
import IAirCargoActivityDetail from "./IAirCargoActivityDetail";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

class GetActivitiesRestResponse {
    errors?: any;
    getAirCargoSummaryResponse?: IAirCargoActivity[];
    totalrecords: number;
}

class GetActivityDetailsRestResponse {
    errors?: any;
    getAirCargoDetailInformationResponse?: IAirCargoActivityDetail[];
    totalrecords: number;
}

class RestAirCargoService extends AbstractRestDataService implements IAirCargoService {
    getAirCargoActivities(request : IAirCargoActivitiesGetRequest) : Promise<IAirCargoActivity[]> {
        return axios.get(`${this.config.baseUrl}/resources/airCargo/${encodeURIComponent(request.parentId)}`, {
            params: { maxNoOfRecords: request.maxNumberOfRecords > 0 ? request.maxNumberOfRecords : DEFAULT_MAX_NO_RECORDS }
        }).then((value) => {
            const response = value.data as GetActivitiesRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getAirCargoSummaryResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getAirCargoActivityDetails(masterBillNbr : string) : Promise<IAirCargoActivityDetail[]> {
        return axios.get(`${this.config.baseUrl}/CargoService/resources/airCargoDetails/${encodeURIComponent(masterBillNbr)}`)
            .then((value) => {
                const response = value.data as GetActivityDetailsRestResponse;
                if(response.errors) {
                    return this.handleError(response.errors);
                }
                return response.getAirCargoDetailInformationResponse;
            }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestAirCargoService as default, RestAirCargoService };