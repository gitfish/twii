import { IError } from "./IError";
import { join } from "./StringUtils";

const getKeyErrors = (key : string, errors : IError[]) : IError[] => {
    return errors ? errors.filter(e => e.key === key || e.prop === key) : [];
};

const getKeyErrorMessage = (key : string, errors : IError[]) : string => {
    const es = getKeyErrors(key, errors);
    return es.length > 0 ? join(es, e => e.message) : "";
};

export { getKeyErrors, getKeyErrorMessage }