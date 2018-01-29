import Context from "common/Context";
import IStorageService from "common/IStorageService";
import TransientStorageService from "common/TransientStorageService";
import ChainedStorageService from "common/ChainedStorageService";
import RestIWCUserStorageService from "common/RestIWCUserStorageService";
import LoggingStorageService from "common/LoggingStorageService";

const DashboardStorageServiceContext = new Context<IStorageService>({
    factory: () => {
        return new ChainedStorageService([
            new LoggingStorageService(new TransientStorageService(), "transientStorage"),
            new LoggingStorageService(new RestIWCUserStorageService(), "iwcUserStorage")
        ]);
    }
});

export { DashboardStorageServiceContext as default, DashboardStorageServiceContext }