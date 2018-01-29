import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";
import IClientRiskCheckKey from "./IClientRiskCheckKey";

interface IApplicationClientRiskSummaryService {
    getApplicationClientRiskSummary(clientRiskCheckKey: IClientRiskCheckKey) : Promise<IApplicationClientRiskSummaryItem[]>;
}

export { IApplicationClientRiskSummaryService as default, IApplicationClientRiskSummaryService };