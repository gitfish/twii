import { observable, action, computed } from "mobx";
import IIATMovement from "./IIATMovement";
import IIATMovementRelatedDataModel from "./IIATMovementRelatedDataModel";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";

abstract class IATMovementRelatedDataModel<T> implements IIATMovementRelatedDataModel<T> {
    @observable visible: boolean = false;
    @observable sync : ISyncModel = new SyncModel();
    @observable items: T[] = [];
    @observable movement: IIATMovement;

    @computed
    get total() : number {
        return this.items ? this.items.length : 0;
    }

    protected abstract _getItems() : Promise<T[]>;

    @action
    refresh() : Promise<any> {
        const syncId = this._calcSyncId(this.movement);
        this.sync.syncStart({ id: syncId });
        return this._getItems()
            .then((data : T[]) => {
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
    loadForMovement(movement : IIATMovement) : Promise<any> {
        const syncId = this._calcSyncId(movement);
        if(syncId !== this.sync.id) {
            this.movement = movement;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @action
    setVisible(visible: boolean) {
        this.visible = visible;
    }

    protected abstract _calcSyncId(movement : IIATMovement) : string;
}

export { IATMovementRelatedDataModel as default, IATMovementRelatedDataModel }