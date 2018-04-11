import { ISupplierFunc } from "@pu/common/lib/ISupplierFunc";
import { IConsumerFunc } from "@pu/common/lib/IConsumerFunc";

interface IBinding<T = any, V = any> {
    target: T;
    key?: string;
    getter?: string | ISupplierFunc<V>;
    setter?: string | IConsumerFunc<V>;
}

export { IBinding }