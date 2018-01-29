import IProfileMatchSummary from "./IProfileMatchSummary";
import ISortableListModel from "common/ISortableListModel";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";

interface IProfileMatchesModel extends ISortableListModel<IProfileMatchSummary> {
    riskCheckSummaryItem: IApplicationClientRiskSummaryItem;
    load(riskCheckSummaryItem: IApplicationClientRiskSummaryItem) :  Promise<any>;
}

export { IProfileMatchesModel as default, IProfileMatchesModel };