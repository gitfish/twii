import { IListingModel } from "./IListingModel";
import { SyncSupplier } from "@twii/common/lib/model/SyncSupplier";

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore }