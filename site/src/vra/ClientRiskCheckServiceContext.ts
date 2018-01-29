import Context from "common/Context";
import IClientRiskCheckService from "./IClientRiskCheckService";
import RestClientRiskCheckService from "./RestClientRiskCheckService";

const ClientRiskCheckServiceContext = new Context<IClientRiskCheckService>({
    id: "ClientRiskCheckService",
    factory() { 
        return new RestClientRiskCheckService()
    }
});

export { ClientRiskCheckServiceContext as default, ClientRiskCheckServiceContext };