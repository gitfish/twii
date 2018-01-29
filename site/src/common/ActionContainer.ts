import IAction from "./IAction";
import IActionContainer from "./IActionContainer";

class ActionContainer<T> implements IActionContainer<T> {
    private _actions : IAction<T>[];
    addAction(action : IAction<T>) {
        if(action && (!this._actions || this._actions.indexOf(action) < 0)) {
            if(!this._actions) {
                this._actions = [];
            }
            this._actions.push(action);
        }
    }
    removeAction(action : IAction<T>) {
        const idx = this._actions && action ? this._actions.indexOf(action) : -1;
        if(idx >= 0) {
            this._actions.splice(idx, 1);
            if(this._actions.length === 0) {
                delete this._actions;
            }
        }
    }
    execute(value : T) {
        if(this._actions) {
            this._actions.forEach(a => a(value));
        }
    }
}

export { ActionContainer as default, ActionContainer }