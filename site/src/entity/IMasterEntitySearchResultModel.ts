import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IActivityListModel from "common/IActivityListModel";
import ISortModel from "common/ISortModel";
import ViewType from "common/ViewType";

interface IMasterEntitySearchResultModel extends IActivityListModel<IMasterEntitySearchResultItem> {
    request: IMasterEntitySearchRequest;
    search(request : IMasterEntitySearchRequest);
    hasMoreRows: boolean;
    hasMoreRowsAlert: boolean;
    refresh() : Promise<any>;
    setHasMoreRowsAlert(hasMoreRowsAlert : boolean) : void;
}

export { IMasterEntitySearchResultModel as default, IMasterEntitySearchResultModel };