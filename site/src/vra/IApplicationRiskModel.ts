import IApplicationRiskSummaryModel from "./IApplicationRiskSummaryModel";
import IApplicationClientListModel from "./IApplicationClientListModel";

interface IApplicationRiskModel {
    permissionRequestId: string
    summary: IApplicationRiskSummaryModel;
    clientList: IApplicationClientListModel;
    load() :  Promise<any>;
}

export { IApplicationRiskModel as default, IApplicationRiskModel };