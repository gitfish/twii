import { action } from "mobx";
import IRiskResumeSearchHistoryModel from "./IRiskResumeSearchHistoryModel";
import IRiskResumeSearchHistoryEntry from "./IRiskResumeSearchHistoryEntry";
import IRiskResumeSearchRequest from "./IRiskResumeSearchRequest";
import StorageServiceContext from "common/StorageServiceContext";
import ListModel from "common/ListModel";

const StorageKey = "analystdesktop-riskResumeSearchHistory";

class RiskResumeSearchHistoryModel extends ListModel<IRiskResumeSearchHistoryEntry> implements IRiskResumeSearchHistoryModel {
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
    addRequest(request : IRiskResumeSearchRequest) : Promise<any> {
        // ensure items loaded
        return this.load().then(() => {
            this.items.unshift({ request: request, timestamp: new Date() });
            if(this.items.length > this.limit) {
                this.items.splice(this.items.length - 1);
            }
            return this._save();
        });
    }

    @action
    private _save() : Promise<any> {
        // ensure any history has been loaded
        return StorageServiceContext.value.setItem(StorageKey, this.items).catch((error) => {
            console.log("Error Saving Risk Resume Search History");
            console.error(error);
        });
    }

    @action
    load() : Promise<any> {
        if(!this.sync.syncing && !this.sync.hasSynced) {
            this.sync.syncStart();
            return StorageServiceContext.value.getItem(StorageKey).then((items) => {
                this.setItems(items);
            }).catch((error) => {
                this.setItems([]);
                this.sync.syncError(error);
            });
        }
        return Promise.resolve();
    }
}

export { RiskResumeSearchHistoryModel as default, RiskResumeSearchHistoryModel };