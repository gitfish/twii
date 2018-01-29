import IApplicationClientRiskSummaryModel from "./IApplicationClientRiskSummaryModel";
import IProfileMatchesModel from "./IProfileMatchesModel";
import IClientRiskCheckKey from "./IClientRiskCheckKey";

interface IApplicationClientRiskModel {
    summary: IApplicationClientRiskSummaryModel;
    profileMatches: IProfileMatchesModel;
    load(clientRiskCheckKey: IClientRiskCheckKey) :  Promise<any>;
}

export { IApplicationClientRiskModel as default, IApplicationClientRiskModel };