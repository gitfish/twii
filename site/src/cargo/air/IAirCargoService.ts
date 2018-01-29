import IAirCargoActivity from "./IAirCargoActivity";
import IAirCargoActivityDetail from "./IAirCargoActivityDetail";

interface IAirCargoActivitiesGetRequest {
    parentId: string;
    maxNumberOfRecords?: number;
}

interface IAirCargoService {
    getAirCargoActivities(request : IAirCargoActivitiesGetRequest) : Promise<IAirCargoActivity[]>;
    getAirCargoActivityDetails(masterBillNbr : string) : Promise<IAirCargoActivityDetail[]>;
}

export { 
    IAirCargoService as default,
    IAirCargoService,
    IAirCargoActivitiesGetRequest
};