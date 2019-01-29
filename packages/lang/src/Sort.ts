import * as StringUtils from "./String";
import * as TypeUtils from "./Type";
import { ISortProps } from "./ISortProps";
import { IKeyMapFunc } from "./IKeyMapFunc";
import { defaultKeyMap } from "./KeyMapFuncs";

const toSortNumber = (o : any) : number => {
    if(TypeUtils.isNumber(o)) {
        return o;
    }
    if(TypeUtils.isDate(o)) {
        return o.getTime();
    }
    if(TypeUtils.isString(o)) {
        return parseInt(o);
    }
    if(TypeUtils.isBoolean(o)) {
        return o ? 1 : 0;
    }
    return 0;
};

const toSortString = (o : any) : string => {
    let s;
    if(TypeUtils.isString(o)) {
        s = o;
    } else if(TypeUtils.isObject(o)) {
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
    if(TypeUtils.isArray(o)) {
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
}

const compare = (l : any, r : any, sort?: ISortProps) : number => {
    let result;
    
    if(TypeUtils.isNumber(l)) {
        result = r !== undefined && r !== null ? l - toSortNumber(r) : 1;
    } else if(TypeUtils.isDate(l)) {
        result = r ? (l as Date).getTime() - toSortNumber(r) : 1;
    } else if(TypeUtils.isString(l)) {
        result = r !== undefined && r !== null ? (l as string).localeCompare(toSortString(r)) : 1;
    } else if(TypeUtils.isBoolean(l)) {
        result = r !== undefined && r !== null ? (l ? 1 : 0) - toSortNumber(r) : 1;
    } else if(TypeUtils.isArray(l)) {
        result = compareArrays(l, toSortArray(r), sort);
    } else if(TypeUtils.isObject(l)) {
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