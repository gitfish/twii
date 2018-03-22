import { ISupplierFunc } from "../ISupplierFunc";
import { IConsumerFunc } from "../IConsumerFunc";

interface IBoundProps<T = any, V = any> {
    bindTarget: T;
    bindKey?: string;
    bindGetter?: ISupplierFunc<V>;
    bindGetterName?: string;
    bindSetter?: IConsumerFunc<V>;
    bindSetterName?: string;
}

export { IBoundProps }