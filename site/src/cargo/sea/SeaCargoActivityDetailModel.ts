import { observable, action, computed } from "mobx";
import ISeaCargoActivity from "./ISeaCargoActivity";
import ISeaCargoActivityDetail from "./ISeaCargoActivityDetail";
import ISeaCargoActivityDetailModel from "./ISeaCargoActivityDetailModel";
import SeaCargoServiceContext from "./SeaCargoServiceContext";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";

class SeaCargoActivityDetailModel implements ISeaCargoActivityDetailModel {
    @observable visible: boolean = false;
    @observable sync : ISyncModel = new SyncModel();
    @observable items: ISeaCargoActivityDetail[] = [];
    @observable activity: ISeaCargoActivity;

    @computed
    get total() : number {
        return this.items ? this.items.length : 0;
    }

    @action
    refresh() : Promise<any> {
        const syncId = this.activity.oceanBillNbr;
        this.sync.syncStart({ id: syncId });
        return SeaCargoServiceContext.value.getSeaCargoActivityDetails(this.activity.oceanBillNbr)
            .then((data : ISeaCargoActivityDetail[]) => {
                if(syncId === this.sync.id) {
                    this.items = data;
                    this.sync.syncEnd();
                }
            }).catch((error) => {
                if(syncId === this.sync.id) {
                    this.items = [];
                    this.sync.syncError(error);
                }
            });
    }

    @action
    load(activity: ISeaCargoActivity) : Promise<any> {
        const syncId = activity.oceanBillNbr;
        if(syncId !== this.sync.id) {
            this.activity = activity;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @action
    setVisible(visible: boolean) {
        this.visible = visible;
    }
}

export { SeaCargoActivityDetailModel as default, SeaCargoActivityDetailModel }