import { observable, action, computed } from "mobx";
import IMasterEntitySourceModel from "../entity/IMasterEntitySourceModel";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import IIATAlias from "./IIATAlias";
import IIATMovementAliasesModel from "./IIATMovementAliasesModel";
import IATServiceContext from "./IATServiceContext";

class IATMovementAliasesModel implements IIATMovementAliasesModel {
    @observable visible: boolean = false;
    @observable sync : ISyncModel = new SyncModel();
    @observable items: IIATAlias[] = [];
    @observable masterEntitySource: IMasterEntitySourceModel;

    @computed
    get total() : number {
        return this.items ? this.items.length : 0;
    }

    protected _getItems() : Promise<IIATAlias[]> {
        let sourceEntities = this.masterEntitySource.sourceEntities;
        if (sourceEntities && sourceEntities.length > 0) {
            let allItems : IIATAlias[] = [];
            return Promise.all(sourceEntities.map((entity) => {
                return IATServiceContext.value.getAliases(entity.ref.sourceRelatedKeyValue).then((items) => {
                    allItems = allItems.concat(items);
                });
            })).then(() => {
                return Promise.resolve(allItems);
            });
        } else {
            return Promise.resolve([] as IIATAlias[]);
        }
    }

    @action
    refresh() : Promise<any> {
        const syncId = this._calcSyncId(this.masterEntitySource);
        this.sync.syncStart({ id: syncId });
        return this._getItems()
            .then((data : IIATAlias[]) => {
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
    loadForEntity(masterEntitySource: IMasterEntitySourceModel) : Promise<any> {
        const syncId = this._calcSyncId(masterEntitySource);
        if(syncId !== this.sync.id) {
            this.masterEntitySource = masterEntitySource;
            return this.refresh();
        }
        return Promise.resolve();
    }

    protected _calcSyncId(masterEntitySource: IMasterEntitySourceModel) : string {
        return String(masterEntitySource.masterEntityId);
    }

    @action
    setVisible(visible: boolean) {
        this.visible = visible;
    }
}

export { IATMovementAliasesModel as default, IATMovementAliasesModel }