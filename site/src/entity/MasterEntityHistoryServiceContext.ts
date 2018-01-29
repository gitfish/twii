import Context from "common/Context";
import IMasterEntityHistoryService from "./IMasterEntityHistoryService";
import RestMasterEntityHistoryService from "./RestMasterEntityHistoryService";

const MasterEntityHistoryServiceContext = new Context<IMasterEntityHistoryService>({
    id: "MasterEntityHistoryService",
    factory() { 
        return new RestMasterEntityHistoryService()
    }
});

export { MasterEntityHistoryServiceContext as default, MasterEntityHistoryServiceContext };