import { action, observable } from "mobx";
import { IListingBookmarksModel } from "./IListingBookmarksModel";
import { IListingBookmark } from "./IListingBookmark";
import SyncHandleModel from "common/SyncHandleModel";
import { toPromise } from "common/SyncUtils";
import { SyncModel } from "common/SyncModel";
import ListingServiceContext from "./ListingServiceContext";

class ListingBookmarksModel extends SyncHandleModel<IListingBookmark[]> implements IListingBookmarksModel {
    @observable updateSync = new SyncModel();

    @action
    private _refreshDone = (data : IListingBookmark[]) => {
        this.setValue(data ? data : []);
        this.sync.syncEnd();
    }

    @action
    private _refreshError = (error : any) => {
        this.clearValue();
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        if(this.sync.syncing) {
            return toPromise(this.sync);
        }
        this.sync.syncStart();
        return ListingServiceContext.value.getBookmarkedListings().then(this._refreshDone).catch(this._refreshError);
    }

    @action
    load() : Promise<any> {
        if(!this.sync.syncing && (!this.sync.hasSynced || this.sync.error)) {
            return this.refresh();
        }
        return Promise.resolve();
    }

    private _findMatchingIndex(bookmark : IListingBookmark) {
        return this.value ? this.value.findIndex(item => {
            return item.id === bookmark.id || (item.listing && bookmark.listing ? item.listing.id === bookmark.listing.id : false);
        }) : -1;
    }

    private _findMatching(bookmark : IListingBookmark) {
        return this.value ? this.value.find(item => {
            return item.id === bookmark.id || (item.listing && bookmark.listing ? item.listing.id === bookmark.listing.id : false);
        }) : undefined;
    }

    @action
    private _addDone = (bookmark : IListingBookmark) => {
        if(!this.value) {
            this.value = [bookmark];
        } else {
            this.value.push(bookmark);
        }
        this.updateSync.syncEnd();
    }

    @action
    private _addError = (error : any) => {
        this.updateSync.syncError(error);
    }

    @action
    addBookmark(bookmark : IListingBookmark) : Promise<any> {
        if(bookmark) {
            const existing = this._findMatching(bookmark);
            if(!existing) {
                this.updateSync.syncStart();
                return ListingServiceContext.value.addBookmark(bookmark).then(this._addDone).catch(this._addError);
            }
            return Promise.resolve();
        }
        return Promise.reject({ code: "INVALID ARGUMENT", message: "No bookmark specified" });
    }

    private _removeDone = (bookmark : IListingBookmark) => {
        const idx = this._findMatchingIndex(bookmark);
        if(idx >= 0) {
            this.value.splice(idx, 1);
        }
        this.updateSync.syncEnd();
    }

    private _removeError = (error : any) => {
        this.updateSync.syncError(error);
    }

    @action
    removeBookmark(bookmark : IListingBookmark) : Promise<any> {
        if(bookmark) {
            const existing = this._findMatching(bookmark);
            if(existing) {
                this.updateSync.syncStart();
                return ListingServiceContext.value.removeBookmark(existing).then(this._removeDone).catch(this._removeError);
            }
            return Promise.resolve();
        }
        return Promise.reject({ code: "INVALID ARGUMENT", message: "No bookmark specified" });
    }

    getBookmarkForListingId(listingId : number) : IListingBookmark {
        return this.value ? this.value.find(b => b.listing && b.listing.id === listingId) : undefined;
    }
}

export { ListingBookmarksModel }