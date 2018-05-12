import { IListingLink } from "../IListingLink";
import { IListingModel } from "./IListingModel";
import { IError } from "@twii/core/lib/IError";

interface IListingLinkModel extends IListingLink {
    validationErrors: IError[];
    listing: IListingModel;
    data : IListingLink;
    valid : boolean;
    setName(name : string) : void;
    setUrl(url : string) : void;
    validate() : void;
    removeFromListing() : void;
    setData(data : IListingLink) : void;
}

export { IListingLinkModel }