const stringType = typeof("");
const objectType = typeof({});
const numberType = typeof(1);
const booleanType = typeof(true);
const functionType = typeof(function() {});

const isString = (o : any) : boolean => {
    return typeof(o) === stringType;
};
const isObject = (o : any) : boolean => {
    return typeof(o) === objectType;
};
const isNumber = (o : any) : boolean => {
    return typeof(o) === numberType;
};
const isBoolean = (o : any) : boolean => {
    return typeof(o) === booleanType;
};
const isDate = (o : any) : boolean => {
    return o instanceof Date;
};
const isArray = (o : any) : boolean => {
    return Array.isArray(o);
};
const isFunction = (o : any) : boolean => {
    return typeof(o) === functionType;
};
const isNullOrUndefined = (o : any) : boolean => {
    return o === null || o === undefined;
};

export {
    isString,
    isObject,
    isNumber,
    isBoolean,
    isDate,
    isArray,
    isFunction,
    isNullOrUndefined
};