import ISyncHandleModel from "common/ISyncHandleModel";
import ISync from "common/ISync";
import { IListingStoreFront } from "./IListingStoreFront";
import { IListing } from "./IListing";

interface IListingStoreFrontModel extends ISyncHandleModel<IListingStoreFront> {
    searchSync : ISync;
    searchText : string;
    searchResults : IListing[];
    setSearchText(searchText : string) : void;
    refresh() : Promise<any>;
    load() : Promise<any>;

}

export { IListingStoreFrontModel }