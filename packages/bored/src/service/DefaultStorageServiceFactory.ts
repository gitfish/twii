import { TransientStorageService } from "@twii/core/lib/service/TransientStorageService";
import { ChainedStorageService } from "@twii/core/lib/service/ChainedStorageService";
import { LoggingStorageService } from "@twii/core/lib/service/LoggingStorageService";

const DefaultStorageServiceFactory = () => {
    return new LoggingStorageService({ target: new TransientStorageService(), prefix: "transientStorage" });
};

export { DefaultStorageServiceFactory }