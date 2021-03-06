import * as StringUtils from "./String";
import ISortProps from "../ISortProps";
import { IKeyMapFunc } from "../IKeyMapFunc";
import { defaultKeyMap } from "../KeyMapFuncs";
import { isNumber, isString, isBoolean, isObject, isArray } from "@twii/lang";

const toSortNumber = (o : any) : number => {
    if(isNumber(o)) {
        return o;
    }
    if(isString(o)) {
        return parseInt(o);
    }
    if(isBoolean(o)) {
        return o ? 1 : 0;
    }
    if(o instanceof Date) {
        return o.getTime();
    }
    
    return 0;
};

const toSortString = (o : any) : string => {
    let s;
    if(isString(o)) {
        s = o;
    } else if(isObject(o)) {
        s = String(o);
        if(s === String({})) {
            s = JSON.stringify(o);
        }
    } else {
        s = String(o);
    }
    return s;
};

const toSortArray = (o : any) : any[] => {
    if(isArray(o)) {
        return o;
    }
    return [o];
};

const compareArrays = (l : any, r : any, sort?: ISortProps) : number => {
    const ls = ([].concat(l)).sort((la, lb) => {
        return compare(la, lb, sort);
    });
    const rs = ([].concat(r)).sort((ra, rb) => {
        return compare(ra, rb, sort);
    });
    return compare(ls.length > 0 ? ls[0] : undefined, rs.length > 0 ? rs[0] : undefined);
};

const compare = (l : any, r : any, sort?: ISortProps) : number => {
    let result;
    
    if(isNumber(l)) {
        result = r !== undefined && r !== null ? l - toSortNumber(r) : 1;
    } else if(l instanceof Date) {
        result = r ? (l as Date).getTime() - toSortNumber(r) : 1;
    } else if(isString(l)) {
        result = r !== undefined && r !== null ? (l as string).localeCompare(toSortString(r)) : 1;
    } else if(isBoolean(l)) {
        result = r !== undefined && r !== null ? (l ? 1 : 0) - toSortNumber(r) : 1;
    } else if(isArray(l)) {
        result = compareArrays(l, toSortArray(r), sort);
    } else if(isObject(l)) {
        result = r !== undefined && r !== null ? toSortString(l).localeCompare(toSortString(r)) : 1;
    } else {
        result = r ? -1 : 0;
    }

    if(sort && sort.descending) {
        result = 0 - result;
    }

    return result;
};

const sort = <T = any>(items : T[], sort : ISortProps, keyMap : IKeyMapFunc = defaultKeyMap) : T[] => {
    return items && sort && StringUtils.isNotBlank(sort.field) ?
        items.sort((a, b) => compare(keyMap(a, sort.field), keyMap(b, sort.field), sort)) : items;
};

export {
    compare,
    toSortString,
    toSortNumber,
    sort
};