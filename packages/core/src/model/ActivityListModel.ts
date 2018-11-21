import { observable, action, computed } from "mobx";
import { IActivityListModel } from "./IActivityListModel";
import { IActivityFilterHandler } from "../IActivityFilterHandler";
import { ActivityFilterModel } from "./ActivityFilterModel";
import { ListModel } from "./ListModel";
import { ISortHandler } from "../ISortHandler";
import { SortModel } from "./SortModel";
import { SelectionModel } from "./SelectionModel";

const Defaults = {
    selectionEquality: (l, r) => l === r
};

class ActivityListModel<T = any> extends ListModel<T> implements IActivityListModel<T> {
    @observable.ref filterHandler : IActivityFilterHandler<T>;
    @observable.ref sortHandler : ISortHandler<T>;
    @observable sort = new SortModel();
    @observable filter = new ActivityFilterModel();
    @observable selection = new SelectionModel<T>();
    @observable.ref selectionEquality : (l : T, r : T) => boolean = Defaults.selectionEquality;

    @computed
    get filterSpecified() {
        return this.filter.specified;
    }

    @action
    clear() {
        super.clear();
        this.sort.clear();
        this.filter.clear();
        this.selection.clearSelection();
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
            r = this.sortHandler(r.slice(0), this.sort);
        }
        return r;
    }

    @computed
    get selectedIndexes() {
        const r = [];
        const eq = this.selectionEquality || Defaults.selectionEquality;
        this.selection.selectedItems.forEach(item => {
            const idx = this.itemsView.findIndex(v => {
                return eq(item, v);
            });
            if(idx >= 0) {
                r.push(idx);
            } 
        });
        return r;
    }
}

export { ActivityListModel as default, ActivityListModel, Defaults }