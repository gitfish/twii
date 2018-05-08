import { action, observable } from "mobx";
import { IListingBookmark } from "../IListingBookmark";
import { ListingServiceContext } from "../service/ListingServiceContext";
import { ListModel } from "@twii/common/lib/model/ListModel";
import { IListingBookmarkListModel } from "./IListingBookmarkListModel";

class ListingBookmarkListModel extends ListModel<IListingBookmark> implements IListingBookmarkListModel {
    
    protected _loadImpl() {
        return ListingServiceContext.value.getBookmarkedListings();
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
        this.items.push(bookmark);
        this.sync.syncEnd();
    }

    @action
    private _addError = (error : any) => {
        this.sync.syncError(error);
    }

    @action
    addBookmark(bookmark : IListingBookmark) : Promise<any> {
        if(bookmark) {
            const existing = this._findMatching(bookmark);
            if(!existing) {
                this.sync.syncStart({ type: "update" });
                return ListingServiceContext.value.addBookmark(bookmark).then(this._addDone).catch(this._addError);
            }
            return Promise.resolve();
        }
        return Promise.reject({ code: "INVALID ARGUMENT", message: "No bookmark specified" });
    }

    @action
    private _removeDone = (bookmark : IListingBookmark) => {
        const idx = this._findMatchingIndex(bookmark);
        console.log()
        if(idx >= 0) {
            this.items.splice(idx, 1);
        }
        this.sync.syncEnd();
    }

    @action
    private _removeError = (error : any) => {
        this.sync.syncError(error);
    }

    @action
    removeBookmark(bookmark : IListingBookmark) : Promise<any> {
        if(bookmark) {
            const existing = this._findMatching(bookmark);
            if(existing) {
                this.sync.syncStart({ type: "update" });
                return ListingServiceContext.value.removeBookmark(existing).then(this._removeDone).catch(this._removeError);
            }
            return Promise.resolve();
        }
        return Promise.reject({ code: "INVALID ARGUMENT", message: "No bookmark specified" });
    }

    @action
    getBookmarkForListingId(listingId : number) : IListingBookmark {
        return this.items ? this.items.find(b => b.listing && b.listing.id === listingId) : undefined;
    }
}

export { ListingBookmarkListModel }