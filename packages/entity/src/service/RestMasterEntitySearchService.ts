import axios from "axios";
import { IMasterEntitySearchRequest } from "../IMasterEntitySearchRequest";
import { IMasterEntitySearchResult } from "../IMasterEntitySearchResult";
import {
    IMasterEntitySearchResponse,
    IMasterEntitySearchService
} from "./IMasterEntitySearchService";
//import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const Defaults = {
    baseUrl: "/DataServices",
    maxNumberOfRecords: 2000
};

interface IRestMasterEntitySearchResponse {
    errors?: any;
    getMasterEntitySearchResponse: IMasterEntitySearchResult[];
    hasMoreRows?: boolean;
}

class RestMasterEntitySearchService implements IMasterEntitySearchService {
    private _baseUrl : string;
    private _maxNumberOfRecords : number;
    get baseUrl() {
        return this._baseUrl || Defaults.baseUrl;
    }
    set baseUrl(value : string) {
        this._baseUrl = value;
    }
    get maxNumberOfRecords() {
        return this._maxNumberOfRecords && this._maxNumberOfRecords > 0 ? this._maxNumberOfRecords : Defaults.maxNumberOfRecords;
    }
    set maxNumberOfRecords(value) {
        this._maxNumberOfRecords = value;
    }
    search(request : IMasterEntitySearchRequest) : Promise<IMasterEntitySearchResponse> {
        const reqInternal = Object.assign({}, request);
        if(isNaN(reqInternal.maxNumberOfRecords) || reqInternal.maxNumberOfRecords <= 0) {
            reqInternal.maxNumberOfRecords = this.maxNumberOfRecords;
        }
        return axios.post(`${this.baseUrl}/resources/entitysearch`, reqInternal).then((value) => {
            const response =  value.data as IRestMasterEntitySearchResponse;
            if(response.errors) {
                throw response.errors;
            }
            return {
                results: response.getMasterEntitySearchResponse,
                hasMoreRows: response.hasMoreRows === true
            };
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
}

export { RestMasterEntitySearchService, Defaults };