import { observable, action, computed } from "mobx";
import { IListModel } from "./IListModel";
import { Sync } from "./Sync";

class ListModel<T> implements IListModel<T> {
    @observable sync = new Sync();
    @observable private _total : number;
    @observable items: T[] = [];

    constructor(items?: T[]) {
        if(items) {
            this.setItems(items);
        }
    }

    @computed
    get total() : number {
        return this._total !== undefined ? this._total : this.items ? this.items.length : 0;
    }
    set total(value) {
        this.setTotal(value);
    }
    @action
    setTotal(total : number) {
        this._total = total;
    }

    protected _setItemsInternal(items : T[]) : void {
        this.items = [];
        if(items) {
            items.forEach(item => this.items.push(item));
        }
    }

    @action
    setItems(items: T[], total?: number) : void {
        this.setTotal(total);
        this._setItemsInternal(items);
        // ensure sync end is called when items are set
        this.sync.syncEnd();
    }

    @action
    clearItems() : void {
        this.setItems([], undefined);
    }

    @action
    protected _addItemInternal(item : T, atIndex?: number) {
        if(atIndex !== undefined && (atIndex >= 0 || atIndex < this.items.length - 1)) {
            this.items.splice(atIndex, 0, item);
        } else {
            this.items.push(item);
        }
    }

    @action
    addItem(item : T, atIndex?: number) : void {
        if(atIndex >= 0 || atIndex < this.items.length - 1) {
            this.items.splice(atIndex, 0, item);
        } else {
            this.items.push(item);
        }
    }

    @action
    addItems(items : T[], atIndex?: number) : void {
        if(items) {
            items.forEach((item, idx) => {
                this.addItem(item, atIndex >= 0 ? atIndex + idx : undefined);
            });
        }
    }

    @computed
    get itemsView() {
        return this.items.slice(0);
    }

    @action
    clear() {
        this.setItems([]);
        this.sync.clear();
    }
}

export { ListModel as default, ListModel };
