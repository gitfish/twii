import { observable, action, computed } from "mobx";
import ActivityListModel from "common/ActivityListModel";
import SortModel from "common/SortModel";
import IMasterEntitySearchResultModel from "./IMasterEntitySearchResultModel";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import IMasterEntitySearchService from "./IMasterEntitySearchService";
import IMasterEntitySearchResult from "./IMasterEntitySearchResult";
import MasterEntitySearchServiceContext from "./MasterEntitySearchServiceContext";
import { filterItems, sortItems } from "./MasterEntitySearchResultHelper";

class MasterEntitySearchResultModel extends ActivityListModel<IMasterEntitySearchResultItem> implements IMasterEntitySearchResultModel {
    sortHandler = sortItems;
    filterHandler = filterItems;
    private _searchService : IMasterEntitySearchService;
    @observable sort = new SortModel();
    @observable request : IMasterEntitySearchRequest;
    @observable items: IMasterEntitySearchResultItem[] = [];
    @observable textFilter : string;
    @observable hasMoreRows: boolean;
    @observable private _hasMoreRowsAlert : boolean;

    get searchService() : IMasterEntitySearchService {
        return this._searchService || MasterEntitySearchServiceContext.value;
    }
    set searchService(value : IMasterEntitySearchService) {
        this._searchService = value;
    }

    @action
    private _refreshDone = (r : IMasterEntitySearchResult) => {
        if(!this.sort.field) {
            this.sort.setSort("clientDealings");
        }
        this.setItems(r && r.items ? r.items : []);
        this.hasMoreRows = r.hasMoreRows;
        this._hasMoreRowsAlert = undefined;
        this.sync.syncEnd();
    }

    @action
    private _refreshError = (error) => {
        this.setItems([]);
        this.hasMoreRows = false;
        this._hasMoreRowsAlert = undefined;
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        if(this.request) {
            const syncId = String(new Date().getTime());
            this.sync.syncStart({ id: syncId });
            return this.searchService.search(this.request).then((r) => {
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
    search(request : IMasterEntitySearchRequest) : Promise<any> {
        this.clear();
        this.request = request;
        return this.refresh();
    }

    @action
    setTextFilter(textFilter : string) : void {
        this.textFilter = textFilter;
    }

    @action
    clear() {
        super.clear();
        this.textFilter = undefined;
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

export { MasterEntitySearchResultModel as default, MasterEntitySearchResultModel };