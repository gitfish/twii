import Context from "common/Context";
import IMasterEntityDataService from "./IMasterEntityDataService";
import RestMasterEntityDataService from "./RestMasterEntityDataService";

const MasterEntityDataServiceContext = new Context<IMasterEntityDataService>({
    id: "MasterEntityDataService",
    value: new RestMasterEntityDataService()
});

export { MasterEntityDataServiceContext as default, MasterEntityDataServiceContext };