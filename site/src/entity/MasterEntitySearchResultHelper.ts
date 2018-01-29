import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import ISortProps from "common/ISortProps";
import * as DateUtils from "util/Date";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import { entries } from "./MasterEntitySourceConfig";
import MasterEntitySearchResultItemColumns from "./component/MasterEntitySearchResultItemColumns";
import IActivityFilterProps from "common/IActivityFilterProps";
import * as StringUtils from "util/String";
import * as SortUtils from "util/Sort";
import * as FilterUtils from "util/Filter";

const getSourceSystemsText = (item : IMasterEntitySearchResultItem) : string => {
    let r = "";
    if(item) {
        entries.forEach(e => {
            const count = item[e.key];
            if(!isNaN(count) && count > 0) {
                if(r.length > 0) {
                    r += " ";
                }
                r += e.key + ":" + count;
            }
        });
    }
    return r;
};

const getSourceSystemCount = (item : IMasterEntitySearchResultItem) : number => {
    let count = 0;
    if(item) {
        entries.forEach(e => {
            const sourceCount = item[e.key];
            if(!isNaN(sourceCount) && sourceCount > 0) {
                count ++;
            }
        });
    }
    return count;
};

const getSourceCount = (item : IMasterEntitySearchResultItem) : number => {
    let count = 0;
    if(item) {
        entries.forEach(e => {
            const sourceCount = item[e.key];
            if(!isNaN(sourceCount) && sourceCount > 0) {
                count += parseInt(sourceCount);
            }
        });
    }
    return count;
};

const getCredentialText = (item : IMasterEntitySearchResultItem) : string => {
    if(item && item.crdntlVlu) {
        return item.crdntlVlu + (item.crdntlTypCd ? " (" + item.crdntlTypCd + ")" : "");
    }
    return "";
};

const getClientDealingsText = (item : IMasterEntitySearchResultItem) : string => {
    if(item && item.CLNT_DEALINGS_TOP_ROLE) {
        return item.CLNT_DEALINGS_TOP_ROLE;
    }
    return "";
};

const toFilterText = (item : IMasterEntitySearchResultItem) => {
    return ColumnTextHelper.getRowText(item, MasterEntitySearchResultItemColumns);
};

const filterItems = (items : IMasterEntitySearchResultItem[], props : IActivityFilterProps) => {
    return FilterUtils.filter(items, props, toFilterText);
};

const itemSortValue = (item : IMasterEntitySearchResultItem, field: string) : any => {
    if(item) {
        if(field === "dtOfBrth") {
            const m = DateUtils.momentFromDataText(item.dtOfBrth);
            return m ? m.toDate() : undefined;
        }
        if(field === "sources") {
            return getSourceSystemCount(item);
        }
        if(field === "crdntlVlu") {
            return getCredentialText(item);
        }
        if(field === "mstrEntyId") {
            const n = parseInt(item.mstrEntyId);
            return !isNaN(n) ? n : item.mstrEntyId;
        }
        if(field === "sourceCount") {
            return getSourceCount(item);
        }
        if (field === "clientDealings") {
            const n = parseInt(item.defaultSort);
            return !isNaN(n) ? n : item.defaultSort;
        }
        return item[field];
    }
};

const sortItems = (items: IMasterEntitySearchResultItem[], sort : ISortProps) : IMasterEntitySearchResultItem[] => {
    return SortUtils.sort(items, sort, itemSortValue);
};

export {
    getSourceSystemsText,
    getSourceSystemCount,
    getSourceCount,
    getCredentialText,
    getClientDealingsText,
    itemSortValue,
    filterItems,
    sortItems
};