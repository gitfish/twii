import Context from "common/Context";
import IMasterEntitySearchService from "./IMasterEntitySearchService";
import RestMasterEntitySearchService from "./RestMasterEntitySearchService";

const MasterEntitySearchServiceContext = new Context<IMasterEntitySearchService>({
    id: "MasterEntitySearchService",
    value: new RestMasterEntitySearchService()
});

export { MasterEntitySearchServiceContext as default, MasterEntitySearchServiceContext };