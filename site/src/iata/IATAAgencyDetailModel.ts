import { observable, action, computed } from "mobx";
import IIATAAgency from "./IIATAAgency";
import IIATAAgencyDetail from "./IIATAAgencyDetail";
import IIATAAgencyDetailModel from "./IIATAAgencyDetailModel";
import IATAServiceContext from "./IATAServiceContext";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";

class IATAAgencyDetailModel implements IIATAAgencyDetailModel {
    @observable visible: boolean = false;
    @observable sync : ISyncModel = new SyncModel();
    @observable items: IIATAAgencyDetail[] = [];
    @observable agency: IIATAAgency;

    @computed
    get total() : number {
        return this.items ? this.items.length : 0;
    }

    @action
    refresh() : Promise<any> {
        const iataTravelAgencyId = this._iataTravelAgencyId(this.agency);
        const syncId = iataTravelAgencyId;
        this.sync.syncStart({ id: syncId });
        return IATAServiceContext.value.getIATAAgencyDetails(iataTravelAgencyId)
            .then((data : IIATAAgencyDetail[]) => {
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
    load(agency : IIATAAgency) : Promise<any> {
        const syncId = this._iataTravelAgencyId(agency);
        if(syncId !== this.sync.id) {
            this.agency = agency;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @action
    setVisible(visible: boolean) {
        this.visible = visible;
    }

    private _iataTravelAgencyId(agency : IIATAAgency) : string {
        return String(agency.iataTravelAgencyCode) + String(agency.iataTravelAgencyCheckDigit);
    }
}

export { IATAAgencyDetailModel as default, IATAAgencyDetailModel }