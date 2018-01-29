import Context from "common/Context";
import IApplicationRiskSummaryService from "./IApplicationRiskSummaryService";
import RestApplicationRiskSummaryService from "./RestApplicationRiskSummaryService";

const ApplicationRiskSummaryServiceContext = new Context<IApplicationRiskSummaryService>({
    id: "ApplicationRiskSummaryService",
    factory() { 
        return new RestApplicationRiskSummaryService()
    }
});

export { ApplicationRiskSummaryServiceContext as default, ApplicationRiskSummaryServiceContext };