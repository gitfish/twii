import { ISearchFieldHostModel } from "./ISearchFieldHostModel";
import { observable, action, computed } from "mobx";
import { ISearchFieldModel } from "./ISearchFieldModel";
import { ISearchField } from "../ISearchField";
import { SearchFieldModel } from "./SearchFieldModel";
import { ISearchSchema } from "../ISearchSchema";

class SearchFieldHostModel implements ISearchFieldHostModel {
    @observable.ref protected _schema : ISearchSchema;
    @observable fields : ISearchFieldModel[] = [];

    @computed
    get schema() {
        return this._schema;
    }
    set schema(value) {
        this.setSchema(value);
    }
    @action
    setSchema(schema : ISearchSchema) {
        this._schema = schema;
    }

    @computed
    get fieldCount() {
        return this.fields.length;
    }
    
    @action
    addField(field?: ISearchField) : ISearchFieldModel {
        const m = new SearchFieldModel(field);
        m.parent = this;
        this.fields.push(m);
        return m;
    }

    @action
    removeField(field : ISearchFieldModel) {
        const idx = this.fields.indexOf(field);
        if(idx >= 0) {
            this.fields.splice(idx, 1);
        }
    }

    @action
    setFields(fields : ISearchField[]) {
        this.removeAllFields();
        if(fields) {
            fields.forEach(field => {
                this.addField(field);
            });
        }
    }

    @action
    removeAllFields() : void {
        this.fields = [];
    }

    @action
    clearFields() : void {
        this.fields.forEach(f => {
            f.searchString = undefined;
        });
    }

    @computed
    get fieldData() : ISearchField[] {
        const fieldData : ISearchField[] = [];
        this.fields.forEach(f => {
            if(f.isSpecified) {
                fieldData.push(f.data);
            }
        });
        return fieldData;
    }

    @computed
    get fieldSearchString() {
        const els : string[] = [];
        this.fields.forEach(f => {
            if(f.isSpecified) {
                els.push(`${f.name}:${f.searchString}`);
            }
        });
        return els.join(" ");
    }

    @computed
    get areFieldsSpecified() {
        return this.fields.some(f => f.isSpecified);
    }
}

export { SearchFieldHostModel }