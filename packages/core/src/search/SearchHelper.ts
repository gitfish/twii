import { ISearchSchema, ISearchSchemaField, SearchSchemaFieldType } from "./ISearchSchema";
import { equalsIgnoreCase } from "../StringUtils";
import { isString } from "../util/Lang";

const getSchemaField = (schema : ISearchSchema, key : string) : ISearchSchemaField => {
    return key && schema && schema.fields ? schema.fields.find(f => {
        if(f.type === SearchSchemaFieldType.divider) {
            return false;
        }
        return equalsIgnoreCase(f.key, key) ||
                (f.aliases && f.aliases.some(a => equalsIgnoreCase(a, key))) ||
                (f.fields && f.fields.some(s => equalsIgnoreCase(s, key)));
    }) : undefined;
};

const getValueCount = (result : any, fields : string[]) => {
    let r = 0;
    fields.forEach(field => {
        const v = result[field];
        if(v) {
            if(isString(v)) {
                r ++;
            } else if(v.length !== undefined) {
                r += v.length;
            } else {
                r ++;
            }
        }
    });
    return r;
};

export {
    getSchemaField,
    getValueCount
}