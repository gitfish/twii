import { IMasterEntitySearchRequest } from "../IMasterEntitySearchRequest";
import { IMasterEntitySearchResult } from "../IMasterEntitySearchResult";

interface IMasterEntitySearchResponse {
    results: IMasterEntitySearchResult[];
    hasMoreRows: boolean;
}

interface IMasterEntitySearchService {
    search(request : IMasterEntitySearchRequest) : Promise<IMasterEntitySearchResponse>;
}

export {
    IMasterEntitySearchResponse,
    IMasterEntitySearchService
};