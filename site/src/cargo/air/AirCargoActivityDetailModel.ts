import { observable, action, computed } from "mobx";
import IAirCargoActivity from "./IAirCargoActivity";
import IAirCargoActivityDetail from "./IAirCargoActivityDetail";
import IAirCargoActivityDetailModel from "./IAirCargoActivityDetailModel";
import AirCargoServiceContext from "./AirCargoServiceContext";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";

class AirCargoActivityDetailModel implements IAirCargoActivityDetailModel {
    @observable visible: boolean = false;
    @observable sync : ISyncModel = new SyncModel();
    @observable items: IAirCargoActivityDetail[] = [];
    @observable activity: IAirCargoActivity;

    @computed
    get total() : number {
        return this.items ? this.items.length : 0;
    }

    @action
    refresh() : Promise<any> {
        const syncId = this.activity.masterBillNbr;
        this.sync.syncStart({ id: syncId });
        return AirCargoServiceContext.value.getAirCargoActivityDetails(this.activity.masterBillNbr)
            .then((data : IAirCargoActivityDetail[]) => {
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
    load(activity: IAirCargoActivity) : Promise<any> {
        const syncId = activity.masterBillNbr;
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

export { AirCargoActivityDetailModel as default, AirCargoActivityDetailModel }