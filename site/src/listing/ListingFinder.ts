import { action } from "mobx";
import ISyncHandle from "common/ISyncHandle";
import { SyncHandleModel } from "common/SyncHandleModel";
import { IListingModel } from "./IListingModel";
import { ListingServiceContext } from "./ListingServiceContext";
import { IListing } from "./IListing";
import { ListingModel } from "./ListingModel";
import { ISyncHandleModel } from "common/ISyncHandleModel";
import { TimedCache } from "common/TimedCache";

const _listingLoaded = action((handle : SyncHandleModel<IListingModel>, data : IListing) => {
    handle.setValue(new ListingModel(data));
    handle.sync.syncEnd();
});

const _listingLoadError = action((handle : SyncHandleModel<IListingModel>, error : any) => {
    handle.clearValue();
    handle.sync.syncError(error);
});

const cache = new TimedCache<SyncHandleModel<IListingModel>>(500);

interface IFindByIdOptions {
    noCache?: boolean;
}

const findById = (id : number, opts?: IFindByIdOptions) : ISyncHandle<IListingModel> => {
    let handle = !opts || !opts.noCache ? cache.get(id) : undefined;
    if(!handle || handle.sync.error) {
        handle = new SyncHandleModel<IListingModel>();
        handle.sync.syncStart({ id: String(id) });
        ListingServiceContext.value.getListing({ listingId: id }).then(data => {
            _listingLoaded(handle, data);
        }).catch(error => {
            _listingLoadError(handle, error);
        });
    }
    cache.put(id, handle);
    return handle;
};


export { findById }