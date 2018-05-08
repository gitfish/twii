import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { ISync } from "@twii/common/lib/ISync";
import { IListingStoreFront } from "../IListingStoreFront";
import { IListing } from "../IListing";

interface IListingStoreFrontModel extends ISyncSupplier<IListingStoreFront> {
    searchSync : ISync;
    searchText : string;
    searchResults : IListing[];
    setSearchText(searchText : string) : void;
}

export { IListingStoreFrontModel }