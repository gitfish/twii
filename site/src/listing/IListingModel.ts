import IListing from "./IListing";
import ISync from "common/ISync";
import { ListingApprovalStatus } from "./ListingApprovalStatus";
import { IListingBookmark } from "./IListingBookmark";
import { IImage } from "media/IImage";
import { IError } from "common/IError";
import { IListingLinkModel } from "./IListingLinkModel";

interface IListingModel extends IListing {
    validationErrors: IError[];
    valid: boolean;
    saveSync : ISync;
    state : any;
    doc_urls : IListingLinkModel[];
    setTitle(title : string) : void;
    setDescription(description : string) : void;
    setShortDescription(shortDescription : string) : void;
    setEnabled(enabled : boolean) : void;
    setFeatured(featured : boolean) : void;
    setPrivate(prv : boolean) : void;
    setLaunchUrl(url : string) : void;
    setSecurityMarking(securityMarking : string) : void;
    setVersion(version : string) : void;
    setApprovalStatus(status : ListingApprovalStatus) : void;
    setSmallIcon(smallIcon : IImage) : void;
    setLargeIcon(largeIcon : IImage) : void;
    setBannerIcon(bannerIcon : IImage) : void;
    setLargeBannerIcon(largeBannerIcon : IImage) : void;
    submitForApproval() : Promise<any>;
    approve() : Promise<any>;
    reject() : Promise<any>;
    save() : Promise<any>;
    delete() : Promise<any>;
    reset() : void;
    setState(state : any) : void;
    addLink() : void;
    removeLink(link : IListingLinkModel) : void;
}

export { IListingModel }