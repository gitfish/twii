import IDGMSActivity from "./IDGMSActivity";

interface IDGMSActivitiesGetRequest {
    parentId: string;
    maxNumberOfRecords?: number;
}

interface IDGMSService {
    getDGMSActivities(request : IDGMSActivitiesGetRequest) : Promise<IDGMSActivity[]>;
}

export { IDGMSService as default, IDGMSService, IDGMSActivitiesGetRequest };