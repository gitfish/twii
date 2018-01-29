import IEntityPhoto from "entityphotos/IEntityPhoto";
import IListResult from "common/IListResult";

interface IGetLatestTravellerImagesByEntityIdRequest {
    mstEntyID?: string;
    maxNumberOfRecords?: number;
    fromDate?: Date;
    toDate?: Date;
}

export { IGetLatestTravellerImagesByEntityIdRequest as default, IGetLatestTravellerImagesByEntityIdRequest};