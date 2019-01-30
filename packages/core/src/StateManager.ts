import { observable, computed, action } from "mobx";
import { IStateManager } from "./IStateManager";
import { IPredicateFunc } from "./IPredicateFunc";
import { ISupplierFunc } from "./ISupplierFunc";

class StateManager implements IStateManager {
    @observable protected _state = {};

    @computed
    get state() {
        return this._state;
    }
    set state(value : any) {
        this.setState(value);
    }

    @action
    setState(state : any) {
        this._state = Object.assign({}, this._state, state);
    }

    @action
    getState<T = any>(key : string, factory?: ISupplierFunc<T>, shouldUpdate?: IPredicateFunc<T>) {
        let r = this._state[key];
        if((r === undefined || r === null || (shouldUpdate && shouldUpdate(r))) && factory) {
            r = factory();
            this._state[key] = r;
        }
        return r;
    }
}

export { StateManager }