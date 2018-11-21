import IListModel from "./IListModel";
import SyncModel from "./SyncModel";
import { observable, action, computed } from "mobx";

class ListModel<T> implements IListModel<T> {
    @observable sync = new SyncModel();
    @observable visible = true;
    @observable localTotal : number;
    @observable items: T[] = [];

    constructor(items?: T[]) {
        if(items) {
            this.setItems(items);
        }
    }

    @computed
    get total() : number {
        return this.localTotal !== undefined ? this.localTotal : this.items ? this.items.length : 0;
    }

    protected _setItemsInternal(items : T[]) : void {
        this.items = items || [];
    }

    @action
    setItems(items: T[], total?: number) : void {
        this.localTotal = total;
        this._setItemsInternal(items);
        // ensure sync end is called when items are set
        this.sync.syncEnd();
    }

    @action
    clearItems() : void {
        this.setItems([], 0);
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
    setVisible(visible : boolean) {
        this.visible = visible;
    }

    @action
    clear() {
        this.setItems([]);
    }
}

export { ListModel as default, ListModel };
