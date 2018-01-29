import Context from "./Context";
import IStorageService from "./IStorageService";
import LocalStorageService from "./LocalStorageService";
import ChainedStorageService from "./ChainedStorageService";
import RestIWCUserStorageService from "./RestIWCUserStorageService";
import LoggingStorageService from "./LoggingStorageService";

const StorageServiceContext = new Context<IStorageService>({
    factory: () => {
        const chainedService = new ChainedStorageService([
            new LoggingStorageService(new LocalStorageService(), "localStorage"),
            new LoggingStorageService(new RestIWCUserStorageService(), "iwcUserStorage")
        ])
        return chainedService;
    }
});

export { StorageServiceContext as default, StorageServiceContext }