import { IListingReview } from "./IListingReview";
import { ISync } from "common/ISync";

interface IListingReviewModel extends IListingReview {
    saveSync : ISync;
    setText(text : string) : void;
    setRate(rate : number) : void;
    save() : Promise<any>;
}

export { IListingReviewModel }