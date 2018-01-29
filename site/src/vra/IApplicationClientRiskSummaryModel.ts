import IListModel from "common/IListModel";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";
import IClientRiskCheckKey from "./IClientRiskCheckKey";

interface IApplicationClientRiskSummaryModel extends IListModel<IApplicationClientRiskSummaryItem> {
    clientRiskCheckKey: IClientRiskCheckKey;
    selectedItem: IApplicationClientRiskSummaryItem
    readonly selectedIndex: number;
    load(clientRiskCheckKey: IClientRiskCheckKey) :  Promise<any>;
}

export { IApplicationClientRiskSummaryModel as default, IApplicationClientRiskSummaryModel };