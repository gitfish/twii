import { observable, computed } from "mobx";
import IClientRiskCheck from "./IClientRiskCheck";
import IClientRiskOverviewListModel from "./IClientRiskOverviewListModel";
import ListModel from "common/ListModel";
import SortModel from "common/SortModel";
import * as SortUtils from "util/Sort";
import * as DateUtils from "util/Date";
import { ClientRiskPerformedTimestamp } from "./component/ClientRiskOverviewColumns";

class ClientRiskOverviewListModel extends ListModel<IClientRiskCheck> implements IClientRiskOverviewListModel {
    @observable sort = new SortModel();

    @computed
    get itemsView() {
        return SortUtils.sort(this.items, this.sort, this._toSortValue);
    }

    private _toSortValue = (item : IClientRiskCheck, field: string) => {
        if(item) {
            if(field === ClientRiskPerformedTimestamp.fieldName) {
                return DateUtils.dateFromTimestampDataText(item.clientRiskPerformedTimestamp);
            }
            return item[field];
        }
    };
}

export { ClientRiskOverviewListModel as default, ClientRiskOverviewListModel }