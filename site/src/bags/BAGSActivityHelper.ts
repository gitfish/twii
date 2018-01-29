import { action } from "mobx";
import IActivityFilterProps from "common/IActivityFilterProps";
import IBAGSActivity from "./IBAGSActivity";
import IListResult from "common/IListResult";
import IListModel from "common/IListModel";
import ISort from "common/ISortProps";
import * as StringUtils from "util/String";
import * as SearchUtils from "util/Search";
import * as SortUtils from "util/Sort";
import * as moment from "moment";
import * as DateUtils from "util/Date";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { BAGSActivityColumns, CraftMovementDate } from "./component/BAGSActivityColumns";
import BAGSServiceContext from "./BAGSServiceContext";
import { IBAGSActivitiesGetRequest } from "./IBAGSService";
import IMasterEntitySource from "entity/IMasterEntitySource";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import { Data as DateDataFormats } from "common/DateFormats";
import IActivityListModel from "common/IActivityListModel";
import MasterEntitySourceListModel from "entity/MasterEntitySourceListModel";
import * as BAGSConstants from "./BAGSConstants";

const textFilterItemImpl = (item: IBAGSActivity, text: string) => {
    return SearchUtils.containsText(ColumnTextHelper.getRowText(item, BAGSActivityColumns), text);
};

const textFilterItem = (item: IBAGSActivity, text: string) => {
    return StringUtils.isNotBlank(text) ? textFilterItemImpl(item, text) : true;
};

const textFilter = (items: IBAGSActivity[], text: string) => {
    return items && StringUtils.isNotBlank(text) ? items.filter(item => textFilterItemImpl(item, text)) : items;
};

const fromFilterItem = (item: IBAGSActivity, test : moment.Moment) => {
    return DateUtils.isMomentAfter(DateUtils.momentFromDataText(item.craftMovementDate), test);
};

const toFilterItem = (item: IBAGSActivity, test: moment.Moment) => {
    return DateUtils.isMomentBefore(DateUtils.momentFromDataText(item.craftMovementDate), test);
};

const rangeFilterItem = (item: IBAGSActivity, from: moment.Moment, to: moment.Moment) => {
    return fromFilterItem(item, from) && toFilterItem(item, to);
};

const rangeFilter = (items: IBAGSActivity[], from: moment.Moment, to: moment.Moment) => {
    return items && (from || to) ? items.filter(item => rangeFilterItem(item, from, to)) : items;
};

const filter = (items : IBAGSActivity[], activityFilter : IActivityFilterProps) => {
    return activityFilter ? rangeFilter(textFilter(items, activityFilter.filterText), activityFilter.filterFromDate, activityFilter.filterToDate) : items;
};

const toSortValue = (item : IBAGSActivity, field: string) => {
    if(item) {
        if(field === CraftMovementDate.fieldName) {
            return DateUtils.dateFromDataText(item.craftMovementDate);
        }
        return item[field];
    }
};

const compare = (a : IBAGSActivity, b : IBAGSActivity, sort : ISort) => {
    let r = SortUtils.compare(toSortValue(a, sort.field), toSortValue(b, sort.field));
    if(sort.descending) {
        r = 0 - r;
    }
    return r;
};

const sort = (items: IBAGSActivity[], sort: ISort) => {
    return items && sort && StringUtils.isNotBlank(sort.field) ? items.sort((a, b) => compare(a, b, sort)) : items;
};

const getByCompositeId = (compositeId : string) : Promise<IBAGSActivity[]> => {
    const compositeIdComponents = compositeId.split('|');
    // super poo
    const req : IBAGSActivitiesGetRequest = {
        travelDocNbr: compositeIdComponents[0],
        travelDocCntryCode: compositeIdComponents[1],
        birthDate: moment(compositeIdComponents[2], DateDataFormats.key, true).format(DateDataFormats.default),
        sexCode: compositeIdComponents[3]
    };
    return BAGSServiceContext.value.getBAGSActivities(req);
}

const getSourceActivities = (source : IMasterEntitySource) : Promise<IListResult<IBAGSActivity>> =>  {
    let allItems : IBAGSActivity[] = [];
    return Promise.all(source.sourceEntities.map((entity) => {
        if(entity.ref && entity.ref.sourceRelatedKeyValue) {
            return getByCompositeId(entity.ref.sourceRelatedKeyValue).then((items) => {
                allItems = allItems.concat(items);
            });
        }
        return Promise.resolve();
    })).then(() => {
        return Promise.resolve({ items: allItems });
    });
};


const getSourceActivityList = action((source : IMasterEntitySourceModel) : MasterEntitySourceListModel<IBAGSActivity> => {
    let activityList : MasterEntitySourceListModel<IBAGSActivity> = source.state.activityList;
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
    getByCompositeId,
    getSourceActivities,
    getSourceActivityList
};