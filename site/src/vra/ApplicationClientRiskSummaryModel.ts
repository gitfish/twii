import { observable, action, computed } from "mobx";
import ListModel from "common/ListModel";
import IApplicationClientRiskSummaryModel from "./IApplicationClientRiskSummaryModel";
import IApplicationClientRiskSummaryItem from "./IApplicationClientRiskSummaryItem";
import ApplicationClientRiskSummaryServiceContext from "./ApplicationClientRiskSummaryServiceContext";
import IClientRiskCheckKey from "./IClientRiskCheckKey";

class ApplicationClientRiskSummaryModel extends ListModel<IApplicationClientRiskSummaryItem> implements IApplicationClientRiskSummaryModel {
    @observable clientRiskCheckKey: IClientRiskCheckKey;
    @observable _selectedItem: IApplicationClientRiskSummaryItem;

    @computed
    get selectedItem() : IApplicationClientRiskSummaryItem {
        if (this._selectedItem) {
            return this._selectedItem;
        } else if (this.items && this.items.length > 0) {
            return this.items[0];
        } else {
            return undefined;
        }
    }

    set selectedItem(item: IApplicationClientRiskSummaryItem) {
        this._selectedItem = item;
    }

    get selectedIndex() : number {
        if (this.selectedItem) {
            return this.items.indexOf(this.selectedItem);
        } else {
            return undefined;
        }
    }

    @action
    refresh() : Promise<any> {
        const syncId = this.clientRiskCheckKey.asString();
        this.sync.syncStart({ id: syncId });
        return ApplicationClientRiskSummaryServiceContext.value.getApplicationClientRiskSummary(this.clientRiskCheckKey)
            .then((items : IApplicationClientRiskSummaryItem[]) => {
                if(syncId === this.sync.id) {
                    this.setItems(items);
                }
            }).catch((error) => {
                if(syncId === this.sync.id) {
                    this.clearItems();
                    this.sync.syncError(error);
                }
            });
    }

    @action
    load(clientRiskCheckKey: IClientRiskCheckKey) :  Promise<any> {
        const syncId = clientRiskCheckKey.asString();
        this._selectedItem = undefined;
        if(syncId !== this.sync.id) {
            this.clientRiskCheckKey = clientRiskCheckKey;
            return this.refresh();
        }
        return Promise.resolve();
    }
}

export { ApplicationClientRiskSummaryModel as default, ApplicationClientRiskSummaryModel };