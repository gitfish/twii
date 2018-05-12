import { IError } from "./IError";
import { join } from "./StringUtils";

const getPropErrors = (prop : string, errors : IError[]) : IError[] => {
    return errors ? errors.filter(e => e.prop === prop) : [];
};

const getPropErrorMessage = (prop : string, errors : IError[]) : string => {
    const es = getPropErrors(prop, errors);
    return es.length > 0 ? join(es, e => e.message) : "";
};

export { getPropErrors, getPropErrorMessage }