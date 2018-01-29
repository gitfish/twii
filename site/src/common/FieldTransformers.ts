import IFieldTransformer from "./IFieldTransformer";
import * as DateUtils from "util/Date";
import * as moment from "moment";

interface IFieldTransformerMap<T = any> {
    [key : string] : IFieldTransformer<T>;
}

const defaultFieldTransformer : IFieldTransformer = <T = any>(item : T, field : string) => {
    return item ? item[field] : undefined;
};

const createDateTextFieldTransformer = <T = any>(formats : string[]) => {
    return (item : T, field : string) => {
        const fieldValue = defaultFieldTransformer(item, field);
        if(fieldValue !== undefined) {
            const m = moment(fieldValue, formats as moment.MomentFormatSpecification, true);
            return DateUtils.isValidMoment(m) ? m.toDate() : undefined;
        }
    };
};

const dateDataTextFieldTransformer : IFieldTransformer = <T = any>(item : T, field : string) : Date => {
    return DateUtils.dateFromDataText(defaultFieldTransformer(item, field));
};

const dateDataTimestampTextFieldTransformer : IFieldTransformer = <T = any>(item : T, field : string) : Date => {
    return DateUtils.dateFromTimestampDataText(defaultFieldTransformer(item, field));
};

const createMappedFieldTransformer = <T = any>(transformerMap : IFieldTransformerMap) : IFieldTransformer<T> => {
    return (item : T, field : string) => {
        let fieldTransformer = transformerMap[field];
        if(!fieldTransformer) {
            fieldTransformer = defaultFieldTransformer;
        }
        return fieldTransformer(item, field);
    };
};

export {
    defaultFieldTransformer,
    dateDataTextFieldTransformer,
    dateDataTimestampTextFieldTransformer,
    createDateTextFieldTransformer,
    createMappedFieldTransformer
}