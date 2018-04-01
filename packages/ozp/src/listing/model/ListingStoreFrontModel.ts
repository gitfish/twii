import { action, observable } from "mobx";
import { IListing } from "../IListing";
import { IListingStoreFrontModel } from "../model/IListingStoreFrontModel";
import { IListingStoreFront } from "../IListingStoreFront";
import { ListingServiceContext } from "../service/ListingServiceContext";
import { isNotBlank } from "@twii/common/lib/StringUtils";
import { SyncSupplier } from "@twii/common/lib/model/SyncSupplier";

class ListingStoreFrontModel extends SyncSupplier<IListingStoreFront> implements IListingStoreFrontModel {
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
        this.sync.syncEnd();
    }

    @action
    private _onSearchError = (error : any) => {
        this.searchResults = [];
        this.sync.syncError(error);
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
        this.sync.syncEnd();
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
                this.sync.syncStart({ type: "search" });
                this._searchTimeout = setTimeout(this._searchImpl, this._searchDelay);
            } else {
                this.sync.syncEnd();
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
            this.sync.syncStart({ type: "search" });
            ps.push(this._searchImpl());
        }
        return Promise.all(ps);
    }
}

export { ListingStoreFrontModel }