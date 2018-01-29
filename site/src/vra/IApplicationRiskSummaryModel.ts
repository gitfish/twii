import IApplicationRiskSummaryItem from "./IApplicationRiskSummaryItem";
import IListModel from "common/IListModel";

interface IApplicationRiskSummaryModel extends IListModel<IApplicationRiskSummaryItem>  {
    permissionRequestId: string;
    selectedItem: IApplicationRiskSummaryItem;
    readonly selectedIndex: number;
    load(permissionRequestId : string) :  Promise<any>;
}

export { IApplicationRiskSummaryModel as default, IApplicationRiskSummaryModel };