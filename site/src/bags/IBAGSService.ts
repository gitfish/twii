import IBAGSActivity from "./IBAGSActivity";

interface IBAGSActivitiesGetOptions {
    maxNumberOfRecords?: number;
}

interface IBAGSActivitiesGetRequest extends IBAGSActivitiesGetOptions {
    travelDocNbr: string,
    travelDocCntryCode: string,
    birthDate: string,
    sexCode: string
}

interface IBAGSService {
    getBAGSActivities(request : IBAGSActivitiesGetRequest) : Promise<IBAGSActivity[]>;
}

export { IBAGSService as default, IBAGSService, IBAGSActivitiesGetRequest };