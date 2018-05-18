import { TransientStorageService } from "@twii/core/lib/service/TransientStorageService";
import { ChainedStorageService } from "@twii/core/lib/service/ChainedStorageService";
import { LoggingStorageService } from "@twii/core/lib/service/LoggingStorageService";
import { StorageServiceContext } from "../service/StorageServiceContext";

const mock = (env : any) => {
    const storageService = new LoggingStorageService({ target: new TransientStorageService(), prefix: "mockStorage" });
    StorageServiceContext.value = storageService;
};

export { mock, mock as default }