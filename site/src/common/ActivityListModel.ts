import { observable, action, computed } from "mobx";
import IActivityListModel from "./IActivityListModel";
import IActivityFilterHandler from "./IActivityFilterHandler";
import ActivityFilterModel from "./ActivityFilterModel";
import ListModel from "./ListModel";
import ISortHandler from "./ISortHandler";
import IListResult from "./IListResult";
import SortModel from "./SortModel";
import SelectionModel from "./SelectionModel";
import * as moment from "moment";

const ErrorLoader = () => {
    return Promise.reject({ code: "ILLEGAL_STATE", message: "Loader not configued" });
};

class ActivityListModel<T> extends ListModel<T> implements IActivityListModel<T> {
    @observable.ref private _loader : () => Promise<IListResult<T>>;
    @observable.ref filterHandler : IActivityFilterHandler<T>;
    @observable.ref sortHandler : ISortHandler<T>;
    @observable sort = new SortModel();
    @observable filter = new ActivityFilterModel();
    @observable selection = new SelectionModel<T>();

    @computed
    get filterSpecified() {
        return this.filter.specified;
    }

    @action
    clear() {
        super.clear();
        this.sort.clear();
        this.filter.clear();
    }

    @action
    setFilterHandler(filterHandler : IActivityFilterHandler<T>) {
        this.filterHandler = filterHandler;
    }

    @action
    setSortHandler(sortHandler : ISortHandler<T>) {
        this.sortHandler = sortHandler;
    }

    @computed
    get loader() {
        return this._loader || ErrorLoader;
    }
    set loader(value) {
        this.setLoader(value);
    }

    @action
    setLoader(loader : () => Promise<IListResult<T>>) {
        this._loader = loader;
    }

    @computed
    get filterView() {
        let r = this.items.slice(0);
        if(this.filterHandler) {
            r = this.filterHandler(r, this.filter);
        }
        return r;
    }

    @computed
    get itemsView() {
        let r = this.filterView;
        if(this.sortHandler) {
            r = this.sortHandler(r, this.sort);
        }
        return r;
    }

    @action
    protected _loadDone = (r : IListResult<T>) => {
        this.setItems(r && r.items ? r.items : [], r && !isNaN(r.total) ? r.total : undefined);
    }

    @action
    protected _loadError = (error : any) => {
        this.clearItems();
        this.sync.syncEnd();
    }

    @computed
    get selectedIndexes() {
        const r = [];
        this.selection.selectedItems.forEach(item => {
            r.push(this.itemsView.indexOf(item)); 
        });
        return r;
    }

    @action
    refresh() {
        this.sync.syncStart();
        this.loader().then(this._loadDone).catch(this._loadError);
    }

    @action
    load() {
        if(!this.sync.syncing && !this.sync.hasSynced) {
            this.refresh();
        }
    }
}

export { ActivityListModel as default, ActivityListModel }