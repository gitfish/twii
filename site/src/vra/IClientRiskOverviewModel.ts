import ISyncModel from "common/ISyncModel";
import IClientRiskOverviewListModel from "./IClientRiskOverviewListModel";

interface IClientRiskOverviewModel {
    clientId: string;
    sync: ISyncModel;
    preDecisionList: IClientRiskOverviewListModel;
    postDecisionList: IClientRiskOverviewListModel;
    load() :  Promise<any>;
}

export { IClientRiskOverviewModel as default, IClientRiskOverviewModel };