import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";

interface IBinding<T = any, V = any> {
    target: T;
    key?: string;
    getter?: string | ISupplierFunc<V>;
    setter?: string | IConsumerFunc<V>;
}

export { IBinding }