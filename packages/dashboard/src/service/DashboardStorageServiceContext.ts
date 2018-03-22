import { Context } from "@twii/common/lib/Context";
import { IStorageService } from "@twii/common/lib/service/IStorageService";
import { TransientStorageService } from "@twii/common/lib/service/TransientStorageService";
import { ChainedStorageService } from "@twii/common/lib/service/ChainedStorageService";
import { LoggingStorageService } from "@twii/common/lib/service/LoggingStorageService";

const DashboardStorageServiceContext = new Context<IStorageService>({
    factory: () => {
        return new LoggingStorageService({ target:  new TransientStorageService(), prefix: "transientStorage" });
    }
});

export { DashboardStorageServiceContext }