import IApplicationClientRiskModel from "./IApplicationClientRiskModel";
import IApplicationClientRiskSummaryModel from "./IApplicationClientRiskSummaryModel";
import ApplicationClientRiskSummaryModel from "./ApplicationClientRiskSummaryModel";
import IProfileMatchesModel from "./IProfileMatchesModel";
import ProfileMatchesModel from "./ProfileMatchesModel";
import IClientRiskCheckKey from "./IClientRiskCheckKey";

class ApplicationClientRiskModel implements IApplicationClientRiskModel {
    summary: IApplicationClientRiskSummaryModel = new ApplicationClientRiskSummaryModel();
    profileMatches: IProfileMatchesModel = new ProfileMatchesModel();
    load(clientRiskCheckKey: IClientRiskCheckKey) :  Promise<any> {
        return this.summary.load(clientRiskCheckKey).then(() => {
            return this.profileMatches.load(this.summary.selectedItem);
        });
    }
}

export { ApplicationClientRiskModel as default, ApplicationClientRiskModel };