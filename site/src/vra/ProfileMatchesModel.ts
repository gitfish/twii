import { observable, action, computed } from "mobx";
import IProfileMatchSummary from "./IProfileMatchSummary";
import IProfileMatchesModel from "./IProfileMatchesModel";
import ListModel from "common/ListModel";
import SortModel from "common/SortModel";
import * as SortUtils from "util/Sort";
import ProfileMatchServiceContext from "./ProfileMatchServiceContext";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";
import { ThresholdScore } from "./component/ProfileMatchesColumns";

class ProfileMatchesModel extends ListModel<IProfileMatchSummary> implements IProfileMatchesModel {
    @observable riskCheckSummaryItem: IApplicationClientRiskSummaryItem;
    @observable sort = new SortModel();

    @action
    refresh() {
        const syncId = this._toSyncId(this.riskCheckSummaryItem);
        this.sync.syncStart({ id: syncId });
        if (!this.riskCheckSummaryItem) {
            this.clearItems();
        } else {
            return ProfileMatchServiceContext.value.getProfileMatches(this.riskCheckSummaryItem).then((items) => {
                if (syncId === this.sync.id) {
                    this.setItems(items);
                }
            }).catch((error) => {
                if (syncId === this.sync.id) {
                    this.clearItems();
                    this.sync.syncError(error);
                }
            });
        }
    }

    @action
    load(riskCheckSummaryItem: IApplicationClientRiskSummaryItem) :  Promise<any> {
        const syncId = this._toSyncId(riskCheckSummaryItem);
        if(syncId !== this.sync.id) {
            this.riskCheckSummaryItem = riskCheckSummaryItem;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @computed
    get itemsView() {
        return SortUtils.sort(this.items, this.sort, this._toSortValue);
    }

    private _toSyncId = (item: IApplicationClientRiskSummaryItem) => {
        return item ? `${item.applicationClientRoleId}:${item.permissionRequestId}:${item.sourceClientId}:` +
            `${item.clientRiskPerformedTimestamp}:${item.riskSystemCode}:${item.sourceSystemCode}:` +
            `${item.eventSourceCode}:${item.channelCode}` : '';
    };

    private _toSortValue = (item : IProfileMatchSummary, field: string) => {
        if(item) {
            if(field === ThresholdScore.fieldName) {
                const n = parseFloat(item.thresholdScore);
                return !isNaN(n) ? n : item.thresholdScore;
            }
            return item[field];
        }
    };
}

export { ProfileMatchesModel as default, ProfileMatchesModel }