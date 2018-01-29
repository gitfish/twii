import { ISupplier } from "./ISupplier";
import { ISync } from "./ISync";

interface ISyncSupplier<T> extends ISupplier<T> {
    sync: ISync;
}

export { ISyncSupplier }