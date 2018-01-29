import { action } from "mobx";
import IActivityFilterProps from "common/IActivityFilterProps";
import IEXAMSActivity from "./IEXAMSActivity";
import IListModel from "common/IListModel";
import IListResult from "common/IListResult";
import ISort from "common/ISortProps";
import * as StringUtils from "util/String";
import * as SearchUtils from "util/Search";
import * as SortUtils from "util/Sort";
import * as moment from "moment";
import * as DateUtils from "util/Date";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { EXAMSActivityColumns, CurrentDate } from "./component/EXAMSActivityColumns";
import EXAMSServiceContext from "./EXAMSServiceContext";
import * as  EXAMSConstants from "./EXAMSConstants";
import { IEXAMSActivityGetRequest } from "./IEXAMSService";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import { Data as DateDataFormats } from "common/DateFormats";
import IActivityListModel from "common/IActivityListModel";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";

const textFilterItemImpl = (item: IEXAMSActivity, text: string) => {
    return SearchUtils.containsText(ColumnTextHelper.getRowText(item, EXAMSActivityColumns), text);
};

const textFilterItem = (item: IEXAMSActivity, text: string) => {
    return StringUtils.isNotBlank(text) ? textFilterItemImpl(item, text) : true;
};

const textFilter = (items: IEXAMSActivity[], text: string) => {
    return items && StringUtils.isNotBlank(text) ?
        items.filter(item => textFilterItemImpl(item, text)) : items;
};

const fromFilterItem = (item: IEXAMSActivity, from : moment.Moment) => {
    return DateUtils.isMomentAfter(DateUtils.momentFromDataText(item.currentDate), from);
};

const toFilterItem = (item: IEXAMSActivity, to: moment.Moment) => {
    return DateUtils.isMomentBefore(DateUtils.momentFromDataText(item.currentDate), to);
};

const rangeFilterItem = (item: IEXAMSActivity, from: moment.Moment, to: moment.Moment) => {
    return fromFilterItem(item, from) && toFilterItem(item, to);
};

const rangeFilter = (items: IEXAMSActivity[], from: moment.Moment, to: moment.Moment) => {
    return items ? items.filter(item => rangeFilterItem(item, from, to)) : items;
};

const filter = (items : IEXAMSActivity[], props : IActivityFilterProps) => {
    return props ? rangeFilter(textFilter(items, props.filterText), props.filterFromDate, props.filterToDate) : items;
};

const toSortValue = (item : IEXAMSActivity, field: string) => {
    if(item) {
        if(field === CurrentDate.fieldName) {
            return DateUtils.dateFromDataText(item.currentDate);
        }
        return item[field];
    }
};

const compare = (a : IEXAMSActivity, b : IEXAMSActivity, sort : ISort) => {
    let r = SortUtils.compare(toSortValue(a, sort.field), toSortValue(b, sort.field));
    if(sort.descending) {
        r = 0 - r;
    }
    return r;
};

const sort = (items: IEXAMSActivity[], sort: ISort) => {
    return items && sort && StringUtils.isNotBlank(sort.field) ? items.sort((a, b) => compare(a, b, sort)) : items;
};

const getSourceActivities = (source : IMasterEntitySourceModel) : Promise<IListResult<IEXAMSActivity>> => {
    return EXAMSServiceContext.value.getEXAMSActivities({ masterEntityID: source.masterEntity.masterEntityId })
};

const getSourceActivityList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IEXAMSActivity> => {
    let activityList : MasterEntitySourceListModel<IEXAMSActivity> = source.state.activityList;
    if(!activityList) {
        activityList = new MasterEntitySourceListModel(source, getSourceActivities);
        activityList.setFilterHandler(filter);
        activityList.setSortHandler(sort);
        activityList.load();
        source.setState({ activityList: activityList });
    }
    return activityList;
});

export {
    textFilterItem,
    textFilter,
    fromFilterItem,
    toFilterItem,
    rangeFilterItem,
    rangeFilter,
    filter,
    compare,
    toSortValue,
    sort,
    getSourceActivities,
    getSourceActivityList
};