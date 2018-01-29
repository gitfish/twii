import { IListing } from "./IListing";

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