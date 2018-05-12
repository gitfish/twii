import { observable, action } from "mobx";
import { Supplier } from "./Supplier";
import { ISyncSupplier } from "../ISyncSupplier";
import { Sync } from "./Sync";
import { toPromise } from "../SyncUtils";

class SyncSupplier<T = any> extends Supplier<T> implements ISyncSupplier<T> {
    @observable sync = new Sync();
    loader : () => Promise<T>;

    protected _loadImpl() : Promise<T> {
        if(this.loader) {
            return this.loader();
        }
        return Promise.reject({ code: "NOT_IMPLEMENTED", message: "_loadImpl() not implemented" });
    }

    @action
    private _onLoad = (value : T) => {
        this.setValue(value);
        this.sync.syncEnd();
    }

    @action
    private _onError = (error : any) => {
        this.clearValue();
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<void> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart({ type: "load" });
        return this._loadImpl().then(this._onLoad).catch(this._onError);
    }

    @action
    load() : Promise<void> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        if(!this.sync.hasSynced || this.sync.error) {
            return this.refresh();
        }
        return Promise.resolve();
    }
}

export { SyncSupplier }