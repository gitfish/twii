import IPNRTicket from "./IPNRTicket";
import PNRTicketingColumns from "./component/PNRTicketingColumns";
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

const toSortValue = createMappedFieldTransformer<IPNRTicket>({
    pnrCreationTimestamp: dateDataTimestampTextFieldTransformer,
});

const sortItems = (items : IPNRTicket[], sort : ISortProps) : IPNRTicket[] => {
    return SortUtils.sort(items, sort, toSortValue);
};

const toFilterText = (item : IPNRTicket) => {
    return ColumnTextHelper.getRowText(item, PNRTicketingColumns);
};

const filterItems = (items : IPNRTicket[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, toFilterText);
};

export { sortItems, filterItems }