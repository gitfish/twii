import { ISupplier } from "./ISupplier";
import { ISync } from "./ISync";

interface ISyncSupplier<T> extends ISupplier<T> {
    sync: ISync;
    load() : Promise<void>;
    refresh() : Promise<void>;
}

export { ISyncSupplier }