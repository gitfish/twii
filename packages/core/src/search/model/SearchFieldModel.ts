import { ISearchFieldModel } from "./ISearchFieldModel";
import { observable, computed, action } from "mobx";
import { ISearchField } from "../ISearchField";
import { isNotBlank } from "../../StringUtils";
import { ISearchFieldHostModel } from "./ISearchFieldHostModel";
import { SearchOperator } from "../SearchOperator";

class SearchFieldModel implements ISearchFieldModel {
    @observable private _name : string;
    @observable private _operator : SearchOperator;
    @observable private _searchString : string;
    @observable.ref parent : ISearchFieldHostModel;

    constructor(data?: ISearchField) {
        this.setData(data);
    }

    @computed
    get name() {
        return this._name;
    }
    set name(value) {
        this.setName(value);
    }
    @action
    setName(name : string) : void {
        if(name !== this._name) {
            this._name = name;
            // clear operator
            this._operator = undefined;
            this._searchString = undefined;
        }
    }

    @computed
    get operator() : SearchOperator {
        return this._operator;
    }
    set operator(value) {
        this.setOperator(value);
    }
    @action
    setOperator(operator : SearchOperator) {
        this._operator = operator;
    }

    @computed
    get searchString() {
        return this._searchString;
    }
    set searchString(value) {
        this.setSearchString(value);
    }
    @action
    setSearchString(search : string) : void {
        this._searchString = search;
    }

    @computed
    get data(): ISearchField {
        return {
            name: isNotBlank(this._name) ? this._name : undefined,
            operator: this._operator,
            searchString: isNotBlank(this._searchString) ? this._searchString : undefined
        };
    }
    set data(value) {
        this.setData(value);
    }

    @action
    setData(data : ISearchField) : void {
        this._name = data ? data.name : undefined;
        this._operator = data ? data.operator : undefined;
        this._searchString = data ? data.searchString : undefined;
    }

    @computed
    get isSpecified() {
        return isNotBlank(this._searchString);
    }

    @action
    remove() {
        if(this.parent) {
            this.parent.removeField(this);
            this.parent = undefined;
        }
    }

    toJSON() {
        return this.data;
    }
}

export { SearchFieldModel }