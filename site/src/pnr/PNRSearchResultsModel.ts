import { observable, action, computed } from "mobx";
import IPNRSearchRequest from "./IPNRSearchRequest";
import IPNRSearchResultsModel from "./IPNRSearchResultsModel";
import IPNRSearchResult from "./IPNRSearchResult";
import IPNRServiceResponse from "./IPNRServiceResponse";
import SortModel from "common/SortModel";
import ActivityListModel from "common/ActivityListModel";
import PNRServiceContext from "./PNRServiceContext";
import { sortItems, filterItems } from "./PNRSearchResultHelper";

interface IPNRSearchHandler {
    (searchRequest : IPNRSearchRequest) : Promise<IPNRServiceResponse<IPNRSearchResult>>;
}

const DefaultPNRSearchHandler : IPNRSearchHandler = (searchRequest : IPNRSearchRequest) => {
    return PNRServiceContext.value.searchPNR(searchRequest);
};

class PNRSearchResultsModel extends ActivityListModel<IPNRSearchResult> implements IPNRSearchResultsModel {
    sortHandler = sortItems;
    filterHandler = filterItems;
    private _searchHandler : IPNRSearchHandler;
    @observable sort: SortModel = new SortModel();
    @observable request: IPNRSearchRequest;
    @observable hasMoreRows: boolean;
    @observable private _hasMoreRowsAlert : boolean;

    get searchHandler() : IPNRSearchHandler {
        return this._searchHandler || DefaultPNRSearchHandler;
    }
    set searchHandler(searchHandler : IPNRSearchHandler) {
        this._searchHandler = searchHandler;
    }

    @action
    private _refreshDone = (r : IPNRServiceResponse<IPNRSearchResult>) => {
        this.setItems(r && r.data ? r.data : []);
    }

    @action
    private _refreshError = (error : any) => {
        this.setItems([]);
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        if(this.request) {
            const syncId = String(new Date().getTime());
            this.sync.syncStart({ id: syncId });
            return this.searchHandler(this.request).then((r) => {
                if(this.sync.id === syncId) {
                    this._refreshDone(r);
                }
            }).catch((error) => {
                if(this.sync.id === syncId) {
                    this._refreshError(error);
                }
            });
        }
        return Promise.resolve();
    }

    @action
    search(request : IPNRSearchRequest) : Promise<any> {
        this.clear();
        this.request = request;
        return this.refresh();
    }

    @computed
    get hasMoreRowsAlert() {
        return this._hasMoreRowsAlert !== undefined ? this._hasMoreRowsAlert : this.hasMoreRows;
    }
    set hasMoreRowsAlert(value : boolean) {
        this.setHasMoreRowsAlert(value);
    }

    @action
    setHasMoreRowsAlert(hasMoreRowsAlert : boolean) {
        this._hasMoreRowsAlert = hasMoreRowsAlert;
    }
}

export { PNRSearchResultsModel as default, PNRSearchResultsModel }