import { IListingModel } from "./IListingModel";
import { SyncSupplier } from "@twii/core/lib/model/SyncSupplier";

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore }