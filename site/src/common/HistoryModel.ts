import { observable, action, computed } from "mobx";
import IHistoryModel from "./IHistoryModel";
import IHistoryEntry from "./IHistoryEntry";
import StorageServiceContext from "./StorageServiceContext";
import ListModel from "./ListModel";
import ActionContainer from "./ActionContainer";
import { toPromise } from "./SyncUtils";
import { currentTimestampDataText } from "util/Date";

class HistoryModel<T> extends ListModel<IHistoryEntry<T>> implements IHistoryModel<T> {
    legacyValueProp: string;
    storageKey : string;
    private _limit : number = 100;

    public get limit() {
        return this._limit;
    }
    public set limit(limit : number) {
        if(limit > 0) {
            this._limit = limit;
        }
    }

    @action
    addEntry(value : T) : Promise<any> {
        // ensure items loaded
        return this.load().then(() => {
            this.items.unshift({ value : value, timestamp: currentTimestampDataText() });
            if(this.items.length > this.limit) {
                this.items.splice(this.items.length - 1);
            }
            return this._save();
        });
    }

    @action
    private _save() : Promise<any> {
        // ensure any history has been loaded
        return StorageServiceContext.value.setItem(this.storageKey, this.items).catch((error) => {
            console.log("Error Saving History Entry");
            console.error(error);
        });
    }

    @action
    private _loadError = (error : any) => {
        this.setItems([]);
        this.sync.syncError(error);
    }

    @action
    private _loadDone = (items : IHistoryEntry<T>[]) => {
        if(items) {
            const mappedItems : IHistoryEntry<T>[] = this.legacyValueProp ? items.map(item => {
                return { timestamp: item.timestamp, value: item[this.legacyValueProp] || item.value };
            }) : items;
            this.setItems(mappedItems);
        } else {
            this.setItems(items);
        }
    }

    @action
    load() : Promise<any> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        if(!this.sync.hasSynced) {
            this.sync.syncStart();
            return StorageServiceContext.value.getItem(this.storageKey).then(this._loadDone).catch(this._loadError);
        }
        return Promise.resolve();
    }
}

export { HistoryModel as default, HistoryModel };