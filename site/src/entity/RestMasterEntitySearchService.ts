import axios from "axios";
import IMasterEntitySearchService from "./IMasterEntitySearchService";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IMasterEntitySearchResult from "./IMasterEntitySearchResult";
import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_RECORDS = 2000;

interface IRestSearchResponse {
    errors?: any;
    getMasterEntitySearchResponse: IMasterEntitySearchResultItem[];
    hasMoreRows?: boolean;
}

class RestMasterEntitySearchDataService extends AbstractRestDataService implements IMasterEntitySearchService {
    search(request : IMasterEntitySearchRequest) : Promise<IMasterEntitySearchResult> {
        const reqInternal = Object.assign({}, request);
        if(isNaN(reqInternal.maxNumberOfRecords) || reqInternal.maxNumberOfRecords <= 0) {
            reqInternal.maxNumberOfRecords = DEFAULT_MAX_RECORDS;
        }
        return axios.post(`${this.config.baseUrl}/resources/entitysearch`, reqInternal).then((value) => {
            const response =  value.data as IRestSearchResponse;
            if(response.errors) {
                throw response.errors;
            }
            return {
                items: response.getMasterEntitySearchResponse,
                hasMoreRows: response.hasMoreRows === true
            };
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestMasterEntitySearchDataService as default, RestMasterEntitySearchDataService };