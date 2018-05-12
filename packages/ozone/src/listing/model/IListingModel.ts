import { IListing } from "../IListing";
import { ListingApprovalStatus } from "../ListingApprovalStatus";
import { IListingBookmark } from "../IListingBookmark";
import { IImage } from "../../media/IImage";
import { IListingLinkModel } from "./IListingLinkModel";
import { ISync } from "@twii/core/lib/ISync";
import { IError } from "@twii/core/lib/IError";
import { IStateManager } from "@twii/core/lib/IStateManager";

interface IListingModel extends IListing, IStateManager {
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
    addLink() : void;
    removeLink(link : IListingLinkModel) : void;
}

export { IListingModel }