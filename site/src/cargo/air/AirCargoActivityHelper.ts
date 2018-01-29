import { action } from "mobx";
import IActivityFilterProps from "common/IActivityFilterProps";
import IAirCargoActivity from "./IAirCargoActivity";
import ISort from "common/ISortProps";
import IListResult from "common/IListResult";
import IListModel from "common/IListModel";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import AirCargoServiceContext from "./AirCargoServiceContext";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { AirCargoActivityColumns, SearchArrivalDate, GrossWeight } from "./component/AirCargoActivityColumns";
import * as StringUtils from "util/String";
import * as SearchUtils from "util/Search";
import * as moment from "moment";
import * as DateUtils from "util/Date";
import * as SortUtils from "util/Sort";
import * as CargoConstants from "../CargoConstants";
import IActivityListModel from "common/IActivityListModel";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";

const textFilterItemImpl = (item: IAirCargoActivity, text : string) => {
    return SearchUtils.containsText(ColumnTextHelper.getRowText(item, AirCargoActivityColumns), text);
}

const textFilterItem = (item: IAirCargoActivity, text : string) => {
    return StringUtils.isNotBlank(text) ? textFilterItemImpl(item, text) : true;
};

const textFilter = (items : IAirCargoActivity[], text : string) => {
    return items && StringUtils.isNotBlank(text) ? items.filter(item => textFilterItemImpl(item, text)) : items;
};

const fromFilterItem = (item: IAirCargoActivity, from : moment.Moment) => {
    return DateUtils.isMomentAfter(DateUtils.momentFromDataText(item.searchArrivalDate), from);
};

const toFilterItem = (item: IAirCargoActivity, to: moment.Moment) => {
    return DateUtils.isMomentBefore(DateUtils.momentFromDataText(item.searchArrivalDate), to);
};

const rangeFilterItem = (item: IAirCargoActivity, from: moment.Moment, to: moment.Moment) => {
    return fromFilterItem(item, from) && toFilterItem(item, to);
};

const rangeFilter = (items : IAirCargoActivity[], from: moment.Moment, to: moment.Moment) => {
    return items && (from || to) ? items.filter(item => rangeFilterItem(item, from, to)) : items; 
};

const filter = (items : IAirCargoActivity[], props : IActivityFilterProps) => {
    return props ? rangeFilter(textFilter(items, props.filterText), props.filterFromDate, props.filterToDate) : items;
};

const toSortValue = (item: IAirCargoActivity, field : string) => {
    if(item) {
        if(field === SearchArrivalDate.fieldName) {
            return DateUtils.dateFromDataText(item.searchArrivalDate);
        } else if(field === GrossWeight.fieldName) {
            const n = parseFloat(item.grossWeight);
            return !isNaN(n) ? n : item.grossWeight;
        }
        return item[field];
    }
};

const compare = (a : IAirCargoActivity, b : IAirCargoActivity, sort: ISort) => {
    let r = SortUtils.compare(toSortValue(a, sort.field), toSortValue(b, sort.field));
    if(sort.descending) {
        r = 0 - r;
    }
    return r;
};

const sort = (items: IAirCargoActivity[], sort: ISort) => {
    return items && sort && StringUtils.isNotBlank(sort.field) ? items.sort((a : IAirCargoActivity, b : IAirCargoActivity) => compare(a, b, sort)) : items;
};

const getSourceActivites = (source : IMasterEntitySource) : Promise<IListResult<IAirCargoActivity>> =>  {
    let allItems : IAirCargoActivity[] = [];
    return Promise.all(source.sourceEntities.map((entity) => {
        if(entity.ref && entity.ref.sourceRelatedKeyValue) {
            return AirCargoServiceContext.value.getAirCargoActivities({ parentId: entity.ref.sourceRelatedKeyValue }).then((items) => {
                allItems = allItems.concat(items);
            });
        }
        return Promise.resolve();
    })).then(() => {
        return Promise.resolve({ items: allItems });
    });
};

const getSourceActivityList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IAirCargoActivity> => {
    let activityList : MasterEntitySourceListModel<IAirCargoActivity> = source.state.airActivityList;
    if(!activityList) {
        activityList = new MasterEntitySourceListModel(source, getSourceActivites);
        activityList.setFilterHandler(filter);
        activityList.setSortHandler(sort);
        activityList.load();
        source.setState({ airActivityList: activityList });
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
    getSourceActivites,
    getSourceActivityList
};