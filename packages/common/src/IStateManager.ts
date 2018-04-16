import { IPredicateFunc } from "./IPredicateFunc";
import { ISupplierFunc } from "./ISupplierFunc";

interface IStateManager {
    state : any;
    setState(state : any) : void;
    getState<T = any>(key : string, factory?: ISupplierFunc<T>, shouldUpdate?: IPredicateFunc<T>) : T;
}

export { IStateManager }