import { observable, action, computed } from "mobx";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import IListResult from "common/IListResult";
import ActivityListModel from "common/ActivityListModel";
import IMasterEntitySourceListModel from "./IMasterEntitySourceListModel";

interface IMasterEntitySourceListLoader<T> {
    (source : IMasterEntitySourceModel) : Promise<IListResult<T>>;
}

class MasterEntitySourceListModel<T> extends ActivityListModel<T> implements IMasterEntitySourceListModel<T> {
    @observable private _source: IMasterEntitySourceModel;

    constructor(source : IMasterEntitySourceModel, loader?: IMasterEntitySourceListLoader<T>) {
        super();
        this._source = source;
        this.setLoader(loader ? () => {
            return loader(source);
        } : undefined);
    }

    @computed
    get filterSpecified() {
        return this.source.masterEntity.activityFilter.specified || this.filter.specified;
    }

    @computed
    get source() {
        return this._source;
    }

    @computed
    get filterView() {
        let r = this.items;
        if(r && r.length > 0 && this.filterHandler) {
            if(this.source && this.source.masterEntity && this.source.masterEntity.activityFilter) {
                r = this.filterHandler(r, this.source.masterEntity.activityFilter);
            }
            r = this.filterHandler(r, this.filter);
        }
        return r;
    }  
}

export { MasterEntitySourceListModel as default, MasterEntitySourceListModel, IMasterEntitySourceListLoader }