import ISyncHandleModel from "common/ISyncHandleModel";
import { IListingBookmark } from "./IListingBookmark";
import { ISync } from "common/ISync";

interface IListingBookmarksModel extends ISyncHandleModel<IListingBookmark[]> {
    updateSync: ISync;
    refresh() : Promise<any>;
    load() : Promise<any>;
    addBookmark(bookmark : IListingBookmark) : Promise<any>;
    removeBookmark(bookmark : IListingBookmark) : Promise<any>;
    getBookmarkForListingId(listingId : number) : IListingBookmark;
}

export { IListingBookmarksModel }