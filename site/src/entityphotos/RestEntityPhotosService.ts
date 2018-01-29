import axios from "axios";
import IEntityPhotosService from "entityphotos/IEntityPhotosService";
import IGetLatestTravellerImagesByEntityIdRequest from "entityphotos/request/IGetLatestTravellerImagesByEntityIdRequest";
import IEntityPhoto from "entityphotos/IEntityPhoto";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 2000;

interface IGetLatestTravellerImagesByEntityIdRestResponse {
    errors?: any;
    getLatestTravellerImagesByEntityIdResponse?: IEntityPhoto[]; 
    total?: number;
}

class RestEntityPhotosService extends AbstractRestDataService implements IEntityPhotosService {
    
    getLatestTravellerImagesByEntityId(request : IGetLatestTravellerImagesByEntityIdRequest) : Promise<IEntityPhoto[]> {
        const internalRequest = Object.assign({}, request);
        if(isNaN(internalRequest.maxNumberOfRecords) || internalRequest.maxNumberOfRecords <= 0) {
            internalRequest.maxNumberOfRecords = DEFAULT_MAX_NO_RECORDS;
        }
        return axios.post(`${this.config.baseUrl}/entityPhotosService/resources/entityPhotos`, internalRequest).then((value) => {
            const response = value.data as IGetLatestTravellerImagesByEntityIdRestResponse;
            if(response.errors) {
                return this.handleError(response.errors);
            }
            return response.getLatestTravellerImagesByEntityIdResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export {RestEntityPhotosService as default, RestEntityPhotosService} ;