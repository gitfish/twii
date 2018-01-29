import { observable, action, computed } from "mobx";
import ListModel from "common/ListModel";
import IApplicationRiskSummaryModel from "./IApplicationRiskSummaryModel";
import IApplicationRiskSummaryItem from "./IApplicationRiskSummaryItem";
import ApplicationRiskSummaryServiceContext from "./ApplicationRiskSummaryServiceContext";

class ApplicationRiskSummaryModel extends ListModel<IApplicationRiskSummaryItem> implements IApplicationRiskSummaryModel {
    @observable permissionRequestId: string;
    @observable _selectedItem: IApplicationRiskSummaryItem;

    @computed
    get selectedItem() : IApplicationRiskSummaryItem {
        if (this._selectedItem) {
            return this._selectedItem;
        } else if (this.items && this.items.length > 0) {
            return this.items[0];
        } else {
            return undefined;
        }
    }

    set selectedItem(item: IApplicationRiskSummaryItem) {
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
        const syncId = this.permissionRequestId;
        this.sync.syncStart({ id: syncId });
        return ApplicationRiskSummaryServiceContext.value.getApplicationRiskSummary(this.permissionRequestId)
            .then((items : IApplicationRiskSummaryItem[]) => {
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
    load(permissionRequestId : string) :  Promise<any> {
        const syncId = permissionRequestId;
        this._selectedItem = undefined;
        if(syncId !== this.sync.id) {
            this.permissionRequestId = permissionRequestId;
            return this.refresh();
        }
        return Promise.resolve();
    }
}

export { ApplicationRiskSummaryModel as default, ApplicationRiskSummaryModel };