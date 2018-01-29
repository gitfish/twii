import Context from "common/Context";
import IMasterEntityService from "./IMasterEntityService";
import DataServiceMasterEntityService from "./DataServiceMasterEntityService";

const MasterEntityServiceContext = new Context<IMasterEntityService>({
    id: "MasterEntityService",
    factory: () => {
        return new DataServiceMasterEntityService()
    }
});

export { MasterEntityServiceContext as default, MasterEntityServiceContext };