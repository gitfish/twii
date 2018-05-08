import { action, observable, computed } from "mobx";
import { IListingActivity } from "../IListingActivity";
import { IListingActivityListModel } from "./IListingActivityListModel";
import { IListingModel } from "./IListingModel";
import { IListingReviewModel } from "./IListingReviewModel";
import { ListingRelatedListModel } from "./ListingRelatedListModel";

class ListingActivityListModel extends ListingRelatedListModel<IListingActivity> implements IListingActivityListModel {
    constructor(listing : IListingModel) {
        super(listing);
    }
    
    protected _loadImpl() {
        return this.listingService.getListingActivity({ listingId: this.listing.id });
    }
}

export { ListingActivityListModel }