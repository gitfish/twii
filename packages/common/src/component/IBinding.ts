import { ISupplierFunc } from "../ISupplierFunc";
import { IConsumerFunc } from "../IConsumerFunc";

interface IBinding<T = any, V = any> {
    target: T;
    key?: string;
    getter?: ISupplierFunc<V>;
    getterName?: string;
    setter?: IConsumerFunc<V>;
    setterName?: string;
}

export { IBinding }