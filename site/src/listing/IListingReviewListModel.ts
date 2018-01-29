import { IListingReview } from "./IListingReview";
import { IListModel } from "common/IListModel";
import { IListingModel } from "./IListingModel";
import { IListingReviewModel } from "./IListingReviewModel";

interface IListingReviewListModel extends IListModel<IListingReview> {
    newReview : IListingReviewModel;
    listing : IListingModel;
    refresh() : Promise<any>;
    load() : Promise<any>;
    add() : void;
    cancelEdit() : void;
}

export { IListingReviewListModel as default, IListingReviewListModel };