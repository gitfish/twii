import { observable, action, computed } from "mobx";
import { ISearchFieldModel } from "./ISearchFieldModel";
import { ISearchGroupModel } from "./ISearchGroupModel";
import { ISearchGroup } from "../ISearchGroup";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { SearchFieldHostModel } from "./SearchFieldHostModel";

class SearchGroupModel extends SearchFieldHostModel implements ISearchGroupModel {
    @observable protected _op : SearchGroupOperator;
    @observable fields : ISearchFieldModel[] = [];
    @observable groups : ISearchGroupModel[] = [];
    @observable.ref parent : ISearchGroupModel;

    constructor(data?: ISearchGroup) {
        super();
        this.setData(data);
    }

    @computed
    get schema() {
        if(this._schema) {
            return this._schema;
        }
        if(this.parent) {
            return this.parent.schema;
        }
    }

    @computed
    get op() {
        return this._op || SearchGroupOperator.AND;
    }
    set op(value) {
        this.setOp(value);
    }
    @action
    setOp(op : SearchGroupOperator) {
        this._op = op;
    }

    @computed
    get groupCount() {
        return this.groups ? this.groups.length : 0;
    }

    @action
    addGroup(group?: ISearchGroup) : ISearchGroupModel {
        const m = new SearchGroupModel(group);
        m.parent = this;
        this.groups.push(m);
        return m;
    }

    @action
    removeGroup(group : ISearchGroupModel) {
        const idx = this.groups.indexOf(group);
        if(idx >= 0) {
            this.groups.splice(idx, 1);
        }
    }

    @action
    remove() {
        if(this.parent) {
            this.parent.removeGroup(this);
            this.parent = undefined;
        }
    }

    @action
    setGroups(groups : ISearchGroup[]) {
        this.removeAllGroups();
        if(groups) {
            groups.forEach(g => {
                this.addGroup(g);
            });
        }
    }

    @action
    removeAllGroups() {
        this.groups = [];
    }

    @action
    clearGroups() {
        this.groups.forEach(g => {
            g.clearFields();
            g.clearGroups();
        });
    }

    @computed
    get groupData() : ISearchGroup[] {
        const groupData : ISearchGroup[] = [];
        this.groups.forEach(g => {
            if(g.isSpecified) {
                groupData.push(g.data);
            }
        });
        return groupData;
    }

    @action
    clear() {
        this.clearFields();
        this.clearGroups();
        this._op = undefined;
    }

    @computed
    get areGroupsSpecified() {
        return this.groups.some(g => g.isSpecified);
    }

    @computed
    get isSpecified() {
        return this.areFieldsSpecified || this.areGroupsSpecified;
    }

    @computed
    get data() : ISearchGroup {
        const fieldData = this.fieldData;
        const groupData = this.groupData;
        return {
            op: this._op,
            fields: fieldData && fieldData.length > 0 ? fieldData : undefined,
            groups: groupData && groupData.length > 0 ? groupData : undefined
        };
    }
    set data(value) {
        this.setData(value);
    }

    @action
    setData(data : ISearchGroup) {
        this.setOp(data ? data.op : undefined);
        this.setFields(data ? data.fields : undefined);
        this.setGroups(data ? data.groups : undefined);
    }
}

export { SearchGroupModel }