import { IActivityListModel } from "common/IActivityListModel";
import { ISmartGateSearchResult } from "./ISmartGateSearchResult";
import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";

interface ISmartGateSearchResultListModel extends IActivityListModel<ISmartGateSearchResult> {
    request : ISmartGateSearchRequest;
    search(request : ISmartGateSearchRequest) : Promise<any>;
    refresh() : Promise<any>;
}

export { ISmartGateSearchResultListModel }