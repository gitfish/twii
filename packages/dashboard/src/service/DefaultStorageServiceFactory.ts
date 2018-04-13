import { TransientStorageService } from "@twii/common/lib/service/TransientStorageService";
import { ChainedStorageService } from "@twii/common/lib/service/ChainedStorageService";
import { LoggingStorageService } from "@twii/common/lib/service/LoggingStorageService";

const DefaultStorageServiceFactory = () => {
    return new LoggingStorageService({ target: new TransientStorageService(), prefix: "transientStorage" });
};

export { DefaultStorageServiceFactory }