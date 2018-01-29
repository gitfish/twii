import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";
import { ISmartGateSearchResult } from "./ISmartGateSearchResult";
import { ISmartGateSearchResultListModel } from "./ISmartGateSearchResultListModel";
import { ActivityListModel } from "common/ActivityListModel";
import { observable, action } from "mobx";
import { SmartGateServiceContext } from "./SmartGateServiceContext";
import { ISmartGateService } from "./ISmartGateService";

class SmartGateSearchResultListModel extends ActivityListModel<ISmartGateSearchResult> implements ISmartGateSearchResultListModel {
    private _service : ISmartGateService;
    @observable request : ISmartGateSearchRequest;

    get service() : ISmartGateService {
        return this._service || SmartGateServiceContext.value;
    }
    set service(value) {
        this._service = value;
    }

    @action
    private _refreshDone = (r : ISmartGateSearchResult[]) => {
        this.setItems(r || []);
        this.sync.syncEnd();
    }

    @action
    private _refreshError = (error) => {
        this.setItems([]);
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        if(this.request) {
            const syncId = String(new Date().getTime());
            this.sync.syncStart({ id: syncId });
            return this.service.search(this.request).then((r) => {
                if(this.sync.id === syncId) {
                    this._refreshDone(r);
                }
            }).catch((error) => {
                if(this.sync.id === syncId) {
                    this._refreshError(error);
                }
            });
        }
        return Promise.resolve();
    }

    @action
    search(request : ISmartGateSearchRequest) : Promise<any> {
        this.clear();
        this.request = request;
        return this.refresh();
    }
}

export { SmartGateSearchResultListModel }