import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";
import { ISmartGateSearchResult } from "./ISmartGateSearchResult";

interface ISmartGateService {
    search(request : ISmartGateSearchRequest) : Promise<ISmartGateSearchResult[]>;
}

export { ISmartGateService }