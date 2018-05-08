import { IListModel } from "@twii/common/lib/model/IListModel";
import { IListingBookmark } from "../IListingBookmark";

interface IListingBookmarkListModel extends IListModel<IListingBookmark> {
    addBookmark(bookmark : IListingBookmark) : Promise<any>;
    removeBookmark(bookmark : IListingBookmark) : Promise<any>;
    getBookmarkForListingId(listingId : number) : IListingBookmark;
}

export { IListingBookmarkListModel }