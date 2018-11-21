import { IActivityListModel } from "../../model/IActivityListModel";
import { ISearchResponseHighlighting, ISearchResponseFacetCounts } from "../ISearchResponse";
import { ISearchRequest } from "../ISearchRequest";
import { IPageableModel } from "./IPageableModel";

interface ISearchListModel<T = any> extends IActivityListModel<T>, IPageableModel {
    duration: number;
    sortBy: string;
    isSortDescending: boolean;
    highlighting: ISearchResponseHighlighting;
    facetCounts: ISearchResponseFacetCounts;
    request: ISearchRequest;
    searchId : string;
    submit(request: ISearchRequest) : Promise<any>;
    setSortBy(sortBy : string) : Promise<any>;
    setSortDescending(sortDescending : boolean) : Promise<any>;
    clearAndRefresh() : Promise<any>;
}

export { ISearchListModel }