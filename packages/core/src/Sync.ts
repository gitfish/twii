import { observable, action, computed } from "mobx";
import { IMutableSync, ISyncOptions } from "./IMutableSync";
import { isString } from "@twii/lang";

class Sync<I = any> implements IMutableSync<I> {
    @observable id: I;
    @observable type: any;
    @observable startDate: Date;
    @observable endDate: Date;
    @observable.ref error: any;
    @observable syncing: boolean;
    @observable hasSynced: boolean = false;

    @action
    syncStart(opts?: ISyncOptions) : void {
        this.type = opts ? opts.type : undefined;
        this.id = opts ? opts.id : undefined;
        this.startDate = new Date();
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = true;
    }
    @action
    syncEnd() : void {
        this.hasSynced = true;
        this.endDate = new Date();
        if(!this.startDate) {
            this.startDate = this.endDate;
        }
        this.syncing = false;
    }
    @action
    syncError(error : any) : void {
        this.hasSynced = true;
        this.error = error;
        this.syncEnd();
    }
    @action
    clear() {
        this.type = undefined;
        this.id = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = false;
        this.hasSynced = false;
    }
}

class CompositeSync<I = any> implements IMutableSync<I> {
    private _syncs : IMutableSync<I>[] = [];
    constructor(...syncs : IMutableSync<I>[]) {
       syncs.forEach(sync => {
           this.addSync(sync);
       });
    }
    @computed
    get syncing() {
        return this._syncs.some(s => s.syncing);
    }
    @computed
    get hasSynced() {
        return this._syncs.every(s => s.hasSynced);
    }
    @computed
    get id() {
        return this._syncs.length > 0 ? this._syncs[0].id : undefined;
    }
    @computed
    get type() {
        return this._syncs.length > 0 ? this._syncs[0].type : undefined;
    }
    @computed
    get startDate() {
        return this._syncs.length > 0 ? this._syncs[0].startDate : undefined;
    }
    @computed
    get endDate() {
        return this._syncs.length > 0 ? this._syncs[0].startDate : undefined;
    }
    @computed
    get error() {
        const errors = [];
        this._syncs.forEach(s => {
            if(s.error) {
                errors.push(s.error);
            }
        });
        if(errors.length > 0) {
            return {
                message: errors.map(e => isString(e) ? e : e.message),
                errors: errors
            };
        }
    }
    @action
    addSync(sync : IMutableSync) {
        if(sync) {
            this._syncs.push(sync);
        }
    }
    @action
    syncStart(opts?: ISyncOptions) {
        this._syncs.forEach(s => s.syncStart(opts));
    }
    @action
    syncEnd() {
        this._syncs.forEach(s => s.syncEnd());
    }
    @action
    syncError(error : any) : void {
        this._syncs.forEach(s => s.syncError(error));
    }
    @action
    clear() {
        this._syncs.forEach(s => s.clear());
    }
}

export { Sync, CompositeSync }