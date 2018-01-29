import IApplicationRiskSummaryItem from "./IApplicationRiskSummaryItem";

interface IApplicationRiskSummaryService {
    getApplicationRiskSummary(permissionRequestId : string) : Promise<IApplicationRiskSummaryItem[]>;
}

export { IApplicationRiskSummaryService as default, IApplicationRiskSummaryService };