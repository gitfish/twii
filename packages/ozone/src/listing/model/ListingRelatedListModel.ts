import { action, observable, computed } from "mobx";
import { IListing } from "../IListing";
import { ListModel } from "@twii/core/lib/model/ListModel";
import { IListingService } from "../service/IListingService";
import { ListingServiceContext } from "../service/ListingServiceContext";
import { isNotBlank } from "@twii/core/lib/StringUtils";
import { IListingModel } from "./IListingModel";
import { IListingReviewModel } from "./IListingReviewModel";
import { ListingReviewModel } from "./ListingReviewModel";
import { IListingRelatedListModel } from "./IListingRelatedListModel";

class ListingRelatedListModel<T> extends ListModel<T> implements IListingRelatedListModel<T> {
    private _listingService : IListingService;

    @observable private _listing : IListingModel;

    constructor(listing : IListingModel) {
        super();
        this._listing = listing;
    }
    
    get listingService() {
        return this._listingService || ListingServiceContext.value;
    }
    set listingService(value : IListingService) {
        this._listingService = value;
    }

    @computed
    get listing() {
        return this._listing;
    }
}

export { ListingRelatedListModel }