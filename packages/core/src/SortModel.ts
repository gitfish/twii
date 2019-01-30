import { observable, action, computed } from "mobx";
import { ISortModel } from "./ISortModel";

class SortModel implements ISortModel {
    @observable protected _field : string;
    @observable protected _descending : boolean = false;

    @computed
    get field() {
        return this._field;
    }
    set field(value) {
        this.setField(value);
    }
    @action
    setField(field: string) : void {
        this._field = field;
    }

    @computed
    get descending() {
        return this._descending;
    }
    set descending(value) {
        this.setDescending(value);
    }
    @action
    setDescending(descending: boolean) : void {
        this._descending = descending;
    }

    @action
    setSort(field: string, descending?: boolean) : void {
        this.field = field;
        this.descending = descending ? true : false;
    }

    @action
    toggleSort(field: string) : void {
        if(this.field && this.field === field) {
            this.descending = !this.descending;
        } else {
            this.field = field;
            this.descending = false;
        }
    }

    @action
    clear() {
        this.field = undefined;
        this.descending = false;
    }
}

export { SortModel as default, SortModel };