import { observable, computed, action } from "mobx";
import { IStateManager } from "../IStateManager";

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
    getState<T = any>(key : string, factory?: () => T) {
        let r = this._state[key];
        if(r === undefined && factory) {
            r = factory();
            this._state[key] = r;
        }
        return r;
    }
}

export { StateManager }