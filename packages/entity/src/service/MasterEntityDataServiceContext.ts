import { Context } from "@twii/common/lib/Context";
import { IMasterEntityDataService } from "./IMasterEntityDataService";
import { RestMasterEntityDataService } from "./RestMasterEntityDataService";

const MasterEntityDataServiceContext = new Context<IMasterEntityDataService>({
    factory() {
        return new RestMasterEntityDataService();
    }
});

export { MasterEntityDataServiceContext }