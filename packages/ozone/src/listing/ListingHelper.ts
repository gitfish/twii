import { IListing } from "./IListing";

/**
 * Note: this is all temporary - how listings are handled on the view side would actually depend on the
 * listing type.
 */

const isExternalUrl = (launchUrl : string) : boolean => {
    return launchUrl && launchUrl.indexOf("://") >= 0;
};

const isExternalListing = (listing : IListing) : boolean => {
    return listing ? isExternalUrl(listing.launch_url) : false;
};

const isApplicationUrl = (launchUrl : string) : boolean => {
    return launchUrl && launchUrl.endsWith(".js");
};

const isApplicationListing = (listing : IListing) : boolean => {
    return listing ? isApplicationUrl(listing.launch_url) : false;
};

export { isExternalUrl, isExternalListing, isApplicationUrl, isApplicationListing }