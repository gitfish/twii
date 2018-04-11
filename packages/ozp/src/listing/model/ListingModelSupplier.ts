import { IListingModel } from "./IListingModel";
import { ListingModel } from "./ListingModel";
import { SyncSupplier } from "@pu/common/lib/model/SyncSupplier";
import { ListingServiceContext } from "../service/ListingServiceContext";

class ListingModelSupplier extends SyncSupplier<IListingModel> {
    private _listingId : number;
    constructor(listingId : number) {
        super();
        this._listingId = listingId;
    }
    protected _loadImpl() {
        return ListingServiceContext.value.getListing({ listingId: this._listingId }).then(data => {
            return new ListingModel(data);
        });
    }
}

export { ListingModelSupplier }