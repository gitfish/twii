import { observable, computed, action } from "mobx";
import { ISearchRequestModel } from "./ISearchRequestModel";
import { ISearchRequest } from "../ISearchRequest";
import { isNotBlank } from "../../StringUtils";
import { SearchGroupModel } from "./SearchGroupModel";

class SearchRequestModel extends SearchGroupModel implements ISearchRequestModel {
    @observable protected _searchString : string;
    @observable protected _complex = false;

    constructor(data?: ISearchRequest) {
        super();
        this.setData(data);
    }

    @computed
    get isComplex() {
        return this._complex;
    }
    set isComplex(value) {
        this.setComplex(value);
    }
    @action
    setComplex(complex : boolean) {
        this._complex = complex;
        if(complex && this.fieldCount === 0) {
            this.addField();
            this.fields[0].searchString = this.searchString;
        }
    }

    @computed
    get data() : ISearchRequest {
        return {
            searchString: this.isSearchingStringSpecified && !this.isComplex ? this._searchString : undefined,
            fields: this.areFieldsSpecified && this.isComplex ? this.fieldData : undefined,
            groups: this.areGroupsSpecified && this.isComplex ? this.groupData : undefined,
            op: this._op
        };
    }
    set data(value : ISearchRequest) {
        this.setData(value);
    }

    @action
    setData(data : ISearchRequest) {
        super.setData(data);
        this.setSearchString(data ? data.searchString : undefined);
        this.setComplex(this.groupCount > 0 || this.fieldCount > 0);
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
        // NOTE: potentially search during typing
    }

    @computed
    get areFieldsSpecified() {
        return this.fields.some(f => f.isSpecified);
    }

    @computed
    get isSearchingStringSpecified() {
        return isNotBlank(this._searchString);
    }

    @computed
    get isSpecified() : boolean {
        return (!this.isComplex && this.isSearchingStringSpecified) || (this.isComplex && (this.areFieldsSpecified || this.areGroupsSpecified));
    }

    @action
    clearSearchString() {
        this._searchString = undefined;
    }

    @action
    clear() {
        super.clear();
        this.clearSearchString();
    }

    @action
    reset() {
        this.clearSearchString();
        this.removeAllFields();
        this.removeAllGroups();
        this.setComplex(false);
    }

    toJSON() {
        return this.data;
    }
}

export { SearchRequestModel }