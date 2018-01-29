import { ISyncModel, ISyncStartOptions } from "./ISyncModel";
import { observable, action, computed } from "mobx";

class SyncModel implements ISyncModel {
    @observable id: string;
    @observable type: string;
    @observable startDate: Date;
    @observable endDate: Date;
    @observable error: any;
    @observable syncing: boolean;
    @observable hasSynced: boolean = false;

    @action
    syncStart(opts?: ISyncStartOptions) : void {
        this.id = opts ? opts.id : undefined;
        this.type = opts ? opts.type : undefined;
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
        this.id = undefined;
        this.type = undefined;
        this.startDate = undefined;
        this.endDate = undefined;
        this.error = undefined;
        this.syncing = false;
        this.hasSynced = false;
    }
}

export { SyncModel as default, SyncModel };