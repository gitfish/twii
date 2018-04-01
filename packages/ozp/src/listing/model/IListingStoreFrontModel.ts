import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { IListingStoreFront } from "../IListingStoreFront";
import { IListing } from "../IListing";

interface IListingStoreFrontModel extends ISyncSupplier<IListingStoreFront> {
    searchText : string;
    searchResults : IListing[];
    setSearchText(searchText : string) : void;
}

export { IListingStoreFrontModel }