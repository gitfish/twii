import ISeaCargoActivity from "./ISeaCargoActivity";
import ISeaCargoActivityDetail from "./ISeaCargoActivityDetail";

interface ISeaCargoActivitiesGetRequest {
    parentId: string;
    maxNumberOfRecords?: number;
}

interface ISeaCargoService {
    getSeaCargoActivities(request : ISeaCargoActivitiesGetRequest) : Promise<ISeaCargoActivity[]>;
    getSeaCargoActivityDetails(oceanBillNbr : string) : Promise<ISeaCargoActivityDetail[]>;
}

export { ISeaCargoService as default, ISeaCargoService, ISeaCargoActivitiesGetRequest };