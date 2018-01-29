import { action } from "mobx";
import IActivityFilterProps from "common/IActivityFilterProps";
import ISeaCargoActivity from "./ISeaCargoActivity";
import ISort from "common/ISortProps";
import IListResult from "common/IListResult";
import IListModel from "common/IListModel";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import SeaCargoServiceContext from "./SeaCargoServiceContext";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { SeaCargoActivityColumns, SearchArrivalDate, GrossWeight } from "./component/SeaCargoActivityColumns";
import * as StringUtils from "util/String";
import * as SearchUtils from "util/Search";
import * as moment from "moment";
import * as DateUtils from "util/Date";
import * as SortUtils from "util/Sort";
import * as CargoConstants from "../CargoConstants";
import IActivityListModel from "common/IActivityListModel";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";

const textFilterItemImpl = (item: ISeaCargoActivity, text : string) => {
    return SearchUtils.containsText(ColumnTextHelper.getRowText(item, SeaCargoActivityColumns), text);
}

const textFilterItem = (item: ISeaCargoActivity, text : string) => {
    return StringUtils.isNotBlank(text) ? textFilterItemImpl(item, text) : true;
};

const textFilter = (items : ISeaCargoActivity[], text : string) => {
    return items && StringUtils.isNotBlank(text) ? items.filter(item => textFilterItemImpl(item, text)) : items;
};

const fromFilterItem = (item: ISeaCargoActivity, from: moment.Moment) => {
    return DateUtils.isMomentAfter(DateUtils.momentFromDataText(item.searchArrivalDate), from);
};

const toFilterItem = (item: ISeaCargoActivity, to: moment.Moment) => {
    return DateUtils.isMomentBefore(DateUtils.momentFromDataText(item.searchArrivalDate), to);
};

const rangeFilterItem = (item: ISeaCargoActivity, from: moment.Moment, to: moment.Moment) => {
    return fromFilterItem(item, from) && toFilterItem(item, to);
};

const rangeFilter = (items : ISeaCargoActivity[], from: moment.Moment, to: moment.Moment) => {
    return items && (from || to) ? items.filter(item => rangeFilterItem(item, from, to)) : items;
};

const filter = (items : ISeaCargoActivity[], props : IActivityFilterProps) => {
    return props ? rangeFilter(textFilter(items, props.filterText), props.filterFromDate, props.filterToDate) : items;
};

const toSortValue = (item: ISeaCargoActivity, field : string) => {
    if(item) {
        if(field === SearchArrivalDate.fieldName) {
            const m = DateUtils.momentFromDataText(item.searchArrivalDate);
            return m ? m.toDate() : undefined;
        } else if(field === GrossWeight.fieldName) {
            const n = parseFloat(item.grossWeight);
            return !isNaN(n) ? n : item.grossWeight;
        }
        return item[field];
    }
};

const compare = (a : ISeaCargoActivity, b : ISeaCargoActivity, sort : ISort) => {
    let r = SortUtils.compare(toSortValue(a, sort.field), toSortValue(b, sort.field));
    if(sort.descending) {
        r = 0 - r;
    }
    return r;
};

const sort = (items: ISeaCargoActivity[], sort: ISort) => {
    return items && sort && StringUtils.isNotBlank(sort.field) ? items.sort((a, b) => compare(a, b, sort)) : items;
};

const getSourceActivities = (source : IMasterEntitySource) : Promise<IListResult<ISeaCargoActivity>> =>  {
    let allItems : ISeaCargoActivity[] = [];
    return Promise.all(source.sourceEntities.map((entity) => {
        if(entity.ref && entity.ref.sourceRelatedKeyValue) {
            return SeaCargoServiceContext.value.getSeaCargoActivities({ parentId: entity.ref.sourceRelatedKeyValue }).then((items) => {
                allItems = allItems.concat(items);
            });
        }
        return Promise.resolve();
    })).then(() => {
        return Promise.resolve({ items: allItems });
    });
};

const getSourceActivityList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<ISeaCargoActivity> => {
    let activityList : MasterEntitySourceListModel<ISeaCargoActivity> = source.state.seaActivityList;
    if(!activityList) {
        activityList = new MasterEntitySourceListModel(source, getSourceActivities);
        activityList.setFilterHandler(filter);
        activityList.setSortHandler(sort);
        activityList.load();
        source.setState({ seaActivityList: activityList });
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