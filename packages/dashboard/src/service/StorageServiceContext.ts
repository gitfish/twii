import { Context } from "@twii/common/lib/Context";
import { IStorageService } from "@twii/common/lib/service/IStorageService";

const StorageServiceContext = new Context<Promise<IStorageService>>({
    factory: () => {
        return import("./DefaultStorageServiceFactory").then(m => m.DefaultStorageServiceFactory());
    }
});

export { StorageServiceContext }