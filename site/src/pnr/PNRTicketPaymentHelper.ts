import IPNRTicketPayment from "./IPNRTicketPayment";
import PNRTicketPaymentColumns from "./component/PNRTicketPaymentColumns";
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

const toSortValue = createMappedFieldTransformer<IPNRTicketPayment>({
    pnrCreationTimestamp: dateDataTimestampTextFieldTransformer,
});

const sortItems = (items : IPNRTicketPayment[], sort : ISortProps) : IPNRTicketPayment[] => {
    return SortUtils.sort(items, sort, toSortValue);
};

const toFilterText = (item : IPNRTicketPayment) => {
    return ColumnTextHelper.getRowText(item, PNRTicketPaymentColumns);
};

const filterItems = (items : IPNRTicketPayment[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, toFilterText);
};

export { sortItems, filterItems }