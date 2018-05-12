import { ISupplierFunc } from "./ISupplierFunc";

const constant = <T = any>(value : T) : ISupplierFunc<T> => {
    return () => {
        return value;
    };
};

const alwaysTrue = constant(true);
const alwaysFalse = constant(false);

export { constant, alwaysTrue, alwaysFalse }