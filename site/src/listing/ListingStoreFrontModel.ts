import { action, observable } from "mobx";
import { IListing } from "./IListing";
import { IListingStoreFrontModel } from "./IListingStoreFrontModel";
import { IListingStoreFront } from "./IListingStoreFront";
import SyncHandleModel from "common/SyncHandleModel";
import SyncModel from "common/SyncModel";
import { toPromise } from "common/SyncUtils";
import ListingServiceContext from "./ListingServiceContext";
import { isNotBlank } from "util/String";

class ListingStoreFrontModel extends SyncHandleModel<IListingStoreFront> implements IListingStoreFrontModel {
    @observable searchSync = new SyncModel();
    @observable searchText : string;
    @observable searchResults : IListing[] = [];
    private _searchDelay : number = 500;
    private _searchTimeout : any;
    
    @action
    private _onSearchDone = (results : IListing[]) => {
        delete this._searchTimeout;
        this.searchResults = [];
        if(results) {
            results.forEach(r => {
                this.searchResults.push(r);
            });
        }
        this.searchSync.syncEnd();
    }

    @action
    private _onSearchError = (error : any) => {
        this.searchResults = [];
        this.searchSync.syncError(error);
    }

    private _searchImpl = () : Promise<any> => {
        const search = this.searchText;
        if(isNotBlank(search)) {
            return ListingServiceContext.value.searchListings({
                search: search
            }).then(results => {
                if(search === this.searchText) {
                    this._onSearchDone(results);
                }
            }).catch(error => {
                if(search === this.searchText) {
                    this._onSearchError(error);
                }
            });
        }
        this.searchSync.syncEnd();
        return Promise.resolve();
    }

    @action
    setSearchText(searchText : string) {
        if(searchText !== this.searchText) {
            this.searchText = searchText;
            if(this._searchTimeout) {
                clearTimeout(this._searchTimeout);
            }
            
            if(isNotBlank(searchText)) {
                this.searchSync.syncStart();
                this._searchTimeout = setTimeout(this._searchImpl, this._searchDelay);
            } else {
                this.searchSync.syncEnd();
            }
        }
    }

    @action
    private _refreshDone = (data : IListingStoreFront) => {
        this.setValue(data);
        this.sync.syncEnd();
    }

    @action
    private _refreshError = (error : any) => {
        this.clearValue();
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        let ps = [];
        this.sync.syncStart();
        ps.push(ListingServiceContext.value.getStoreFront().then(this._refreshDone).catch(this._refreshError));
        if(isNotBlank(this.searchText)) {
            this.searchSync.syncStart();
            ps.push(this._searchImpl());
        }
        return Promise.all(ps);
    }

    @action
    load() : Promise<any> {
        if(!this.sync.syncing && (!this.sync.hasSynced || this.sync.error)) {
            return this.refresh();
        }
        return Promise.resolve();
    }
}

export { ListingStoreFrontModel }