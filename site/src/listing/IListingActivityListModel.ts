import { IListingActivity } from "./IListingActivity";
import { IListModel } from "common/IListModel";
import { IListingModel } from "./IListingModel";
import { IListingReviewModel } from "./IListingReviewModel";

interface IListingActivityListModel extends IListModel<IListingActivity> {
    listing : IListingModel;
    refresh() : Promise<any>;
    load() : Promise<any>;
}

export { IListingActivityListModel };