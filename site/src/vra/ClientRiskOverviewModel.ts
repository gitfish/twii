import { observable, action } from "mobx";
import SyncModel from "common/SyncModel";
import IClientRiskCheck from "./IClientRiskCheck";
import IClientRiskOverviewModel from "./IClientRiskOverviewModel";
import ClientRiskOverviewListModel from "./ClientRiskOverviewListModel";
import ClientRiskCheckServiceContext from "./ClientRiskCheckServiceContext";

class ClientRiskOverviewModel implements IClientRiskOverviewModel {
    @observable clientId: string;
    @observable sync = new SyncModel();
    @observable preDecisionList = new ClientRiskOverviewListModel();
    @observable postDecisionList = new ClientRiskOverviewListModel();

    @action
    refresh() : Promise<any> {
        const syncId = this.clientId;
        this.sync.syncStart({ id: syncId });
        return ClientRiskCheckServiceContext.value.getClientRiskChecks(this.clientId).then((items) => {
            if(syncId === this.sync.id) {
                this.preDecisionList.setItems(this._filterByStageCode(items, 'PRE'));
                this.postDecisionList.setItems(this._filterByStageCode(items, 'POST'));
                this.sync.syncEnd();
            }
        }).catch((error) => {
            if(syncId === this.sync.id) {
                this.preDecisionList.clearItems();
                this.postDecisionList.clearItems();
                this.sync.syncError(error);
            }
        });
    }

    @action
    load() : Promise<any> {
        const syncId = this.clientId;
        if(syncId !== this.sync.id) {
            return this.refresh();
        }
        return Promise.resolve();
    }

    private _filterByStageCode = (items: IClientRiskCheck[], stageCode: string) : IClientRiskCheck[] => {
        const list = items || [];
        return list.filter(item => item.applicationStageCode === stageCode);
    }
}

export { ClientRiskOverviewModel as default, ClientRiskOverviewModel };