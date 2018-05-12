import { IAppHost } from "@twii/core/lib/IAppHost";
import { action } from "mobx";
import { IListing } from "./IListing";
import { IListingModel } from "./model/IListingModel";
import { ListingBookmarkListStore } from "./model/ListingBookmarkListStore";

const launch = (host : IAppHost, listing : IListing) : Promise<any> => {
    host.load({ path: `/ozone/listings/${listing.id}/launch`, params: { id: listing.id, title: listing.title }, replace: true });
    return Promise.resolve();
};

export { launch }