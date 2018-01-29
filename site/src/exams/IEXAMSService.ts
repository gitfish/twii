import IEXAMSActivity from "./IEXAMSActivity";
import IListResult from "common/IListResult";

interface IEXAMSActivityGetRequest {
    masterEntityID?: string;
    fromDate?: string;
    toDate?: string;
    examPort?: string;
    examResultType?: string;
    proxyUser?: string;
    maxNumberOfRecords?: number;
}

interface IEXAMSService {
    getEXAMSActivities(request : IEXAMSActivityGetRequest) : Promise<IListResult<IEXAMSActivity>>;
}

export {
    IEXAMSService as default,
    IEXAMSService,
    IEXAMSActivityGetRequest,
 };