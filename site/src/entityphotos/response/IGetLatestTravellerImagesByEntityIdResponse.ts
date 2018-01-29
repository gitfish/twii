import IEntityPhoto from "entityphotos/IEntityPhoto";


interface IGetLatestTravellerImagesByEntityIdResponse {
    errors?: any;
    getLatestTravellerImagesByEntityIdResponse?: IEntityPhoto[];
    total?: number;
}

export { IGetLatestTravellerImagesByEntityIdResponse as default, IGetLatestTravellerImagesByEntityIdResponse }