import IProfileMatchSummary from "./IProfileMatchSummary";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";

interface IProfileMatchService {
    getProfileMatches(riskCheckSummaryItem: IApplicationClientRiskSummaryItem) : Promise<IProfileMatchSummary[]>;
}

export { IProfileMatchService as default, IProfileMatchService };