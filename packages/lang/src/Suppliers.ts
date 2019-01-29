import { ISupplierFunc } from "./ISupplierFunc";

const constant = <T = any>(value : T) : ISupplierFunc<T> => {
    return () => {
        return value;
    };
};

const alwaysTrue = constant(true);
const alwaysFalse = constant(false);
const alwaysNull = constant(null);

export { constant, alwaysTrue, alwaysFalse, alwaysNull }