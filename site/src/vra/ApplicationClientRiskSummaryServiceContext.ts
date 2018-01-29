import Context from "common/Context";
import IApplicationClientRiskSummaryService from "./IApplicationClientRiskSummaryService";
import RestApplicationClientRiskSummaryService from "./RestApplicationClientRiskSummaryService";

const ApplicationClientRiskSummaryServiceContext = new Context<IApplicationClientRiskSummaryService>({
    id: "ApplicationClientRiskSummaryService",
    factory() { 
        return new RestApplicationClientRiskSummaryService()
    }
});

export { ApplicationClientRiskSummaryServiceContext as default, ApplicationClientRiskSummaryServiceContext };