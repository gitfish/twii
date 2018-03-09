import { Context } from "@twii/core/lib/common/Context";
import { IMasterEntityDataService } from "./IMasterEntityDataService";
import { RestMasterEntityDataService } from "./RestMasterEntityDataService";

const MasterEntityDataServiceContext = new Context<IMasterEntityDataService>({
    factory() {
        return new RestMasterEntityDataService();
    }
});

export { MasterEntityDataServiceContext }