import Context from "common/Context";
import IMasterEntityPotentialMatchesService from "./IMasterEntityPotentialMatchesService";
import RestMasterEntityPotentialMatchesService from "./RestMasterEntityPotentialMatchesService";

const MasterEntityPotentialMatchesServiceContext = new Context<IMasterEntityPotentialMatchesService>({
    id: "MasterEntityPotentialMatchesService",
    factory() { 
        return new RestMasterEntityPotentialMatchesService()
    }
});

export { MasterEntityPotentialMatchesServiceContext as default, MasterEntityPotentialMatchesServiceContext };