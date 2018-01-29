import IPNRSearchResult from "./IPNRSearchResult";
import IPNRSearchRequest from "./IPNRSearchRequest";
import IActivityListModel from "common/IActivityListModel";

interface IPNRSearchResultsModel extends IActivityListModel<IPNRSearchResult> {
    request: IPNRSearchRequest;
    search(request : IPNRSearchRequest) : Promise<any>;
    refresh() : Promise<any>;
    hasMoreRows: boolean;
    hasMoreRowsAlert: boolean;
    setHasMoreRowsAlert(hasMoreRowsAlert : boolean) : void;
}

export { IPNRSearchResultsModel as default, IPNRSearchResultsModel }