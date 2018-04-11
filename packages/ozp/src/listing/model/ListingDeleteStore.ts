import { IListingModel } from "./IListingModel";
import { SyncSupplier } from "@pu/common/lib/model/SyncSupplier";

const ListingDeleteStore = new SyncSupplier<IListingModel>();

export { ListingDeleteStore }