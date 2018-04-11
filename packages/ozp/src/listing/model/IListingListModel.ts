import { IListing } from "../IListing";
import { IListModel } from "@pu/common/lib/model/IListModel";
import { IListingListCounts } from "../IListingListCounts";

interface IListingListModel extends IListModel<IListing> {
    searchText : string;
    setSearchText(searchText : string) : void;
    counts: IListingListCounts;
}

export { IListingListModel };