import { IAppHost } from "app/IAppHost";
import { action } from "mobx";
import { IListing } from "./IListing";
import { IListingModel } from "./IListingModel";
import { ListingBookmarksStore } from "./ListingBookmarksStore";

const launch = (host : IAppHost, listing : IListing) : Promise<any> => {
    host.load({ path: `/listing/${listing.id}/launch`, params: { id: listing.id, title: listing.title }, replace: true });
    return Promise.resolve();
};

export { launch }
