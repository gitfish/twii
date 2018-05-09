import { IListingModel } from "./IListingModel";
import { ListingModel } from "./ListingModel";
import { IListingModelSupplier } from "./IListingModelSupplier";
import { SyncSupplier } from "@twii/common/lib/model/SyncSupplier";
import { ListingServiceContext } from "../service/ListingServiceContext";

class ListingModelSupplier extends SyncSupplier<IListingModel> implements IListingModelSupplier {
    private _listingId : string | number;
    constructor(listingId : string | number) {
        super();
        this._listingId = listingId;
    }
    get listingId() : string | number {
        return this._listingId;
    }
    protected _loadImpl() {
        return ListingServiceContext.value.getListing({ listingId: this._listingId }).then(data => {
            return new ListingModel(data);
        });
    }
}

export { ListingModelSupplier }