import { IMutableSupplier } from "./IMutableSupplier";
import { ISync } from "./ISync";

interface ISyncSupplier<T> extends IMutableSupplier<T> {
    sync: ISync;
    load() : Promise<void>;
    refresh() : Promise<void>;
}

export { ISyncSupplier }