import { ISyncSupplier } from "@twii/common/lib/ISyncSupplier";
import { IListingModel } from "./IListingModel";

interface IListingModelSupplier extends ISyncSupplier<IListingModel> {
    listingId: number;
}

export { IListingModelSupplier }