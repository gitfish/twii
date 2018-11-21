import { observable, action, computed } from "mobx";
import IActivityFilterModel from "./IActivityFilterModel";
import { isNotBlank } from "../StringUtils";
import * as moment from "moment";

class ActivityFilterModel implements IActivityFilterModel {
    @observable filterText: string;
    @observable filterFromDate: moment.Moment;
    @observable filterToDate: moment.Moment;

    @computed
    get specified() {
        return isNotBlank(this.filterText) || (this.filterFromDate && this.filterFromDate.isValid()) || (this.filterToDate && this.filterToDate.isValid());
    }

    @action
    setFilterText(filterText: string) : void {
        this.filterText = filterText;
    }

    @action
    setFilterFromDate(filterFromDate: moment.Moment) : void {
        this.filterFromDate = filterFromDate;
    }

    @action
    setFilterToDate(filterToDate: moment.Moment) : void {
        this.filterToDate = filterToDate;
    }

    @action
    clear() : void {
        this.filterText = undefined;
        this.filterFromDate = undefined;
        this.filterToDate = undefined;
    }
}

export { ActivityFilterModel as default, ActivityFilterModel }