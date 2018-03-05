import { Context } from "@twii/core/lib/common/Context";
import { IStorageService } from "@twii/core/lib/common/service/IStorageService";
import { TransientStorageService } from "@twii/core/lib/common/service/TransientStorageService";
import { ChainedStorageService } from "@twii/core/lib/common/service/ChainedStorageService";
import { LoggingStorageService } from "@twii/core/lib/common/service/LoggingStorageService";

const DashboardStorageServiceContext = new Context<IStorageService>({
    factory: () => {
        return new LoggingStorageService({ target:  new TransientStorageService(), prefix: "transientStorage" });
    }
});

export { DashboardStorageServiceContext }