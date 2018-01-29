import { observable, action, computed } from "mobx";
import IEntityProfileSourceModel from "./IEntityProfileSourceModel";
import IEntityProfileSourceGroupModel from "./IEntityProfileSourceGroupModel";
import isEqual from "lodash.isequal";

class EntityProfileSourceGroupModel implements IEntityProfileSourceGroupModel {
    @observable private _source : IEntityProfileSourceModel;
    @observable private _type : string;
    @observable items: any[] = [];
    @observable open : boolean = true;
    @observable comments : string;

    constructor(source : IEntityProfileSourceModel, type : string) {
        this._source = source;
        this._type = type;
    }

    @computed
    get source() {
        return this._source;
    }

    @computed
    get type() {
        return this._type;
    }

    @action
    addItems(items : any[]) {
        if(items && items.length > 0) {
            items.forEach(n => {
                const existing = this.items.find(item => isEqual(item, n));
                if(!existing) {
                    this.items.push(n);
                }
            });
        }
    }

    @action
    removeItem(item : any) {
        const idx = this.items.indexOf(item);
        if(idx >= 0) {
            this.items.splice(idx, 1);
        }
        if(this.items.length === 0) {
            this.remove();
        }
    }

    @action
    remove() {
        this._source.removeGroup(this);
    }

    @action
    setOpen(open : boolean) : void {
        this.open = open;
    }

    @action
    setComments(comments : string) : void {
        this.comments = comments;
    }
}

export { EntityProfileSourceGroupModel as default, EntityProfileSourceGroupModel }