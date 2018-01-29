import IListing from "./IListing";
import IListModel from "common/IListModel";
import { IListingListCounts } from "./IListingListCounts";

interface IListingListModel extends IListModel<IListing> {
    searchText : string;
    setSearchText(searchText : string) : void;
    counts: IListingListCounts;
    refresh() : Promise<any>;
    load() : Promise<any>;
}

export { IListingListModel as default, IListingListModel };