import IApplicationRiskModel from "./IApplicationRiskModel";
import IApplicationRiskSummaryModel from "./IApplicationRiskSummaryModel";
import ApplicationRiskSummaryModel from "./ApplicationRiskSummaryModel";
import IApplicationClientListModel from "./IApplicationClientListModel";
import ApplicationClientListModel from "./ApplicationClientListModel";

class ApplicationRiskModel implements IApplicationRiskModel {
    permissionRequestId: string;
    summary: IApplicationRiskSummaryModel = new ApplicationRiskSummaryModel();
    clientList: IApplicationClientListModel = new ApplicationClientListModel();
    load() :  Promise<any> {
        return Promise.all([
            this.summary.load(this.permissionRequestId),
            this.clientList.load(this.permissionRequestId)
        ]);
    }
}

export { ApplicationRiskModel as default, ApplicationRiskModel };