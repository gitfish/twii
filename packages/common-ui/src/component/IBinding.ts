import { ISupplierFunc } from "@twii/common/lib/ISupplierFunc";
import { IConsumerFunc } from "@twii/common/lib/IConsumerFunc";

interface IBinding<T = any, V = any> {
    target: T;
    key?: string;
    getter?: string | ISupplierFunc<V>;
    setter?: string | IConsumerFunc<V>;
}

export { IBinding }