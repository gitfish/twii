import IPNRSearchResult from "./IPNRSearchResult";
import PNRSearchResultColumns from "./component/PNRSearchResultColumns";
import ISortProps from "common/ISortProps";
import IActivityFilterProps from "common/IActivityFilterProps";
import * as SortUtils from "util/Sort";
import * as DateUtils from "util/Date";
import * as StringUtils from "util/String";
import * as FilterUtils from "util/Filter";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import {
    createMappedFieldTransformer,
    dateDataTextFieldTransformer,
    dateDataTimestampTextFieldTransformer
} from "common/FieldTransformers";

const toSortValue = createMappedFieldTransformer<IPNRSearchResult>({
    pnrCreationTimestamp: dateDataTimestampTextFieldTransformer,
    firstILocalScheduleDate: dateDataTextFieldTransformer,
    firstOLocalScheduleDate: dateDataTextFieldTransformer,
    intentToTravelDate: dateDataTextFieldTransformer,
    intentToTravelEndDate: dateDataTextFieldTransformer
});

const sortItems = (items : IPNRSearchResult[], sort : ISortProps) : IPNRSearchResult[] => {
    return SortUtils.sort(items, sort, toSortValue);
};

const toFilterText = (item : IPNRSearchResult) => {
    return ColumnTextHelper.getRowText(item, PNRSearchResultColumns);
};

const filterItems = (items : IPNRSearchResult[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, toFilterText);
};

export { sortItems, filterItems }