import { Supplier } from "./Supplier";
import { ISyncSupplier } from "../ISyncSupplier";
import { Sync } from "./Sync";

class SyncSupplier<T> extends Supplier<T> implements ISyncSupplier<T> {
    sync = new Sync();
}

export { SyncSupplier }