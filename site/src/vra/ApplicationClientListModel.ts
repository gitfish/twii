import { observable, action, computed } from "mobx";
import IApplicationClient from "./IApplicationClient";
import IApplicationClientListModel from "./IApplicationClientListModel";
import ListModel from "common/ListModel";
import SortModel from "common/SortModel";
import * as SortUtils from "util/Sort";
import * as DateUtils from "util/Date";
import ApplicationClientDetailsServiceContext from "./ApplicationClientDetailsServiceContext";
import { ClientBirthDate } from "./component/ApplicationClientColumns";

class ApplicationClientListModel extends ListModel<IApplicationClient> implements IApplicationClientListModel {
    @observable permissionRequestId: string;
    @observable sort = new SortModel();

    @action
    refresh() {
        const syncId = this.permissionRequestId;
        this.sync.syncStart({ id: syncId });
        return ApplicationClientDetailsServiceContext.value.getApplicationClientDetails(this.permissionRequestId).then((items) => {
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
        if(syncId !== this.sync.id) {
            this.permissionRequestId = permissionRequestId;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @computed
    get itemsView() {
        return SortUtils.sort(this.items, this.sort, this._toSortValue);
    }

    private _toSortValue = (item : IApplicationClient, field: string) => {
        if(item) {
            if(field === ClientBirthDate.fieldName) {
                return DateUtils.dateFromDataText(item.clientBirthDate);
            }
            return item[field];
        }
    };
}

export { ApplicationClientListModel as default, ApplicationClientListModel }