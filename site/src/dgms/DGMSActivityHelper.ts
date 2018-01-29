import { action } from "mobx";
import IActivityFilterProps from "common/IActivityFilterProps";
import IDGMSActivity from "./IDGMSActivity";
import ISort from "common/ISortProps";
import IListResult from "common/IListResult";
import IListModel from "common/IListModel";
import * as StringUtils from "util/String";
import * as SearchUtils from "util/Search";
import * as DateUtils from "util/Date";
import * as SortUtils from "util/Sort";
import * as moment from "moment";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { DGMSActivityColumns, DateDetected } from "./component/DGMSActivityColumns";
import DGMSServiceContext from "./DGMSServiceContext";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as DGMSConstants from "./DGMSConstants";
import IActivityListModel from "common/IActivityListModel";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";

const textFilterItemImpl = (item: IDGMSActivity, text : string) => {
    return SearchUtils.containsText(ColumnTextHelper.getRowText(item, DGMSActivityColumns).join(""), text);
};

const textFilterItem = (item: IDGMSActivity, text : string) => {
    return StringUtils.isNotBlank(text) ? textFilterItemImpl(item, text) : true;
};

const textFilter = (items : IDGMSActivity[], text : string) => {
    return items && StringUtils.isNotBlank(text) ? items.filter(item => textFilterItemImpl(item, text)) : items;
};

const fromFilterItem = (item: IDGMSActivity, from: moment.Moment) => {
    return DateUtils.isMomentAfter(DateUtils.momentFromDataText(item.dateDetected), from);
};

const toFilterItem = (item: IDGMSActivity, to: moment.Moment) => {
    return DateUtils.isMomentBefore(DateUtils.momentFromDataText(item.dateDetected), to);
};

const rangeFilterItem = (item: IDGMSActivity, from: moment.Moment, to: moment.Moment) => {
    return fromFilterItem(item, from) && toFilterItem(item, to);
};

const rangeFilter = (items : IDGMSActivity[], from: moment.Moment, to: moment.Moment) => {
    return items && (from || to) ? items.filter(item => rangeFilterItem(item, from, to)) : items;
};

const filter = (items : IDGMSActivity[], props : IActivityFilterProps) => {
    return props ? rangeFilter(textFilter(items, props.filterText), props.filterFromDate, props.filterToDate) : items;
};

const toSortValue = (item: IDGMSActivity, field: string) => {
    if(item) {
        if(field === DateDetected.fieldName) {
            return DateUtils.dateFromDataText(item.dateDetected);
        }
        return item[field];
    }
};

const compare = (a : IDGMSActivity, b : IDGMSActivity, sort : ISort) => {
    let r = SortUtils.compare(toSortValue(a, sort.field), toSortValue(b, sort.field));
    if(sort.descending) {
        r = 0 - r;
    }
    return r;
};

const sort = (items: IDGMSActivity[], sort: ISort) => {
    return items && sort && StringUtils.isNotBlank(sort.field) ? items.sort((a, b) => compare(a, b, sort)) : items;
};

const getSourceActivities = (source : IMasterEntitySource) : Promise<IListResult<IDGMSActivity>> =>  {
    let allItems : IDGMSActivity[] = [];
    return Promise.all(source.sourceEntities.map((entity) => {
        if(entity.ref && entity.ref.sourceRelatedKeyValue) {
            return DGMSServiceContext.value.getDGMSActivities({ parentId: entity.ref.sourceRelatedKeyValue }).then((items) => {
                allItems = allItems.concat(items);
            });
        }
        return Promise.resolve();
    })).then(() => {
        return Promise.resolve({ items: allItems });
    });
};

const getSourceActivityList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IDGMSActivity> => {
    let activityList : MasterEntitySourceListModel<IDGMSActivity> = source.state.activityList;
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
    toSortValue,
    compare,
    sort,
    getSourceActivities,
    getSourceActivityList
};