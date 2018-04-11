import { IListingReview } from "../IListingReview";
import { ISync } from "@pu/common/lib/ISync";

interface IListingReviewModel extends IListingReview {
    sync : ISync;
    setText(text : string) : void;
    setRate(rate : number) : void;
    save() : Promise<any>;
}

export { IListingReviewModel }