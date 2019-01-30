import { IAppIcon } from "./IAppIcon";
import { observable, computed, action } from "mobx";

class AppIcon implements IAppIcon {
    @observable private _url : string;
    @observable private _text : string;
    @observable private _name : string;
    @observable.ref private _component : any;

    @computed
    get url() {
        return this._url;
    }
    set url(value) {
        this.setUrl(value);
    }
    @action
    setUrl(url : string) {
        this._url = url;
    }

    @computed
    get text() {
        return this._text;
    }
    set text(value) {
        this.setText(value);
    }
    @action
    setText(text : string) {
        this._text = text;
    }

    @computed
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    @action
    setName(name : string) {
        this._name = name;
    }

    @computed
    get component() {
        return this._component;
    }
    set component(value) {
        this.setComponent(value);
    }
    @action
    setComponent(component : any) {
        this._component = component;
    }
}

export { AppIcon }