import { ISyncSupplier } from "@twii/core/lib/ISyncSupplier";
import { IListingModel } from "./IListingModel";

interface IListingModelSupplier extends ISyncSupplier<IListingModel> {
    listingId: string | number;
}

export { IListingModelSupplier }