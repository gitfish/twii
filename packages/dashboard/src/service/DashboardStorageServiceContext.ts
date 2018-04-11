import { Context } from "@pu/common/lib/Context";
import { IStorageService } from "@pu/common/lib/service/IStorageService";
import { TransientStorageService } from "@pu/common/lib/service/TransientStorageService";
import { ChainedStorageService } from "@pu/common/lib/service/ChainedStorageService";
import { LoggingStorageService } from "@pu/common/lib/service/LoggingStorageService";

const DashboardStorageServiceContext = new Context<IStorageService>({
    factory: () => {
        return new LoggingStorageService({ target:  new TransientStorageService(), prefix: "transientStorage" });
    }
});

export { DashboardStorageServiceContext }