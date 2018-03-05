import { SupplierModel } from "./SupplierModel";
import { ISyncSupplier } from "../ISyncSupplier";
import { SyncModel } from "./SyncModel";

class SyncSupplierModel<T> extends SupplierModel<T> implements ISyncSupplier<T> {
    sync = new SyncModel();
}

export { SyncSupplierModel }