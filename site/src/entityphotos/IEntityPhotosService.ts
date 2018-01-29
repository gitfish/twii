import IEntityPhoto from "entityphotos/IEntityPhoto";
import IListResult from "common/IListResult";
import IGetLatestTravellerImagesByEntityIdRequest from "entityphotos/request/IGetLatestTravellerImagesByEntityIdRequest";
import IGetLatestTravellerImagesByEntityIdResponse from "entityphotos/response/IGetLatestTravellerImagesByEntityIdResponse";

interface IEntityPhotosService {
    getLatestTravellerImagesByEntityId(request: IGetLatestTravellerImagesByEntityIdRequest) : Promise<IEntityPhoto[]>;
}

export { IEntityPhotosService as default, IEntityPhotosService};