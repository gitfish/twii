import { Context } from "@twii/core/lib/Context";
import { IStorageService } from "@twii/core/lib/service/IStorageService";

const StorageServiceContext = new Context<Promise<IStorageService>>({
    factory: () => {
        return import("./DefaultStorageServiceFactory").then(m => m.DefaultStorageServiceFactory());
    }
});

export { StorageServiceContext }