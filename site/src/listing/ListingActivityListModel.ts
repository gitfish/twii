import { action, observable, computed } from "mobx";
import IListing from "./IListing";
import { IListingActivity } from "./IListingActivity";
import { IListingActivityListModel } from "./IListingActivityListModel";
import ListModel from "common/ListModel";
import { IListingService, IListingReviewListRequest } from "./IListingService";
import ListingServiceContext from "./ListingServiceContext";
import { IListingListCounts } from "./IListingListCounts";
import { SyncModel } from "common/SyncModel";
import { isNotBlank } from "util/String";
import { IListingModel } from "./IListingModel";
import { IListingReviewModel } from "./IListingReviewModel";
import { toPromise } from "common/SyncUtils";

class ListingActivityListModel extends ListModel<IListingActivity> implements IListingActivityListModel {
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

    @action
    private _refreshDone = (activity : IListingActivity[]) => {
        this.setItems(activity);
    }

    @action
    private _refreshError = (error : any) => {
        this.clearItems();
        this.sync.syncError(error);
    }

    @action
    refresh() {
        this.sync.syncStart();
        return this.listingService.getListingActivity({ listingId: this.listing.id }).then(this._refreshDone).catch(this._refreshError);
    }

    @action
    load() : Promise<any> {
        if(!this.sync.syncing && (!this.sync.hasSynced || this.sync.error)) {
            return this.refresh();
        }
        return toPromise(this.sync);
    }   
}

export { ListingActivityListModel as default, ListingActivityListModel }