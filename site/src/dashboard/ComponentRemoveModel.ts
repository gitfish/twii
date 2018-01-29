import { observable, action, computed } from "mobx";
import IDashboardList from "./IDashboardList";
import IDashboard from "./IDashboard";
import Dashboard from "./Dashboard";
import IComponent from "./IComponent";
import { isNotBlank } from "util/String";
import { IComponentRemoveModel, IComponentRemoveOptions } from "./IComponentRemoveModel";

class ComponentRemoveModel implements IComponentRemoveModel {
    private _saveHandler : (component : IComponent) => void;
    @observable active : boolean = false;
    @observable component : IComponent;
    
    @action
    init(opts : IComponentRemoveOptions) {
        this.component = opts.component;
        this._saveHandler = opts.saveHandler;
        this.active = true;
    }

    @action
    private _close() {
        //this.component = undefined;
        this.active = false;
    }

    @action
    save() {
        if(this._saveHandler) {
            this._saveHandler(this.component);
        } else {
            this.component.removeFromParent();
        }
        this._close();
    }

    @action
    cancel() {
        this._close();
    }
}

export { ComponentRemoveModel as default, ComponentRemoveModel }