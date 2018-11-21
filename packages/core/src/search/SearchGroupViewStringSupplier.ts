import { ISearchSchema, ISearchSchemaField, SearchSchemaFieldType } from "./ISearchSchema";
import { ISearchGroup } from "./ISearchGroup";
import { ISearchField } from "./ISearchField";
import { SearchGroupOperator } from "./SearchGroupOperator";
import { getSchemaField } from "./SearchHelper";
import { ISupplier } from "../ISupplier";

interface ISearchGroupViewStringSupplierOptions {
    group: ISearchGroup;
    schema?: ISearchSchema;
    defaultOp?: SearchGroupOperator;
}

class SearchGroupViewStringSupplier implements ISupplier<string> {
    private _defaultOp : SearchGroupOperator;
    schema : ISearchSchema;
    group : ISearchGroup;
    constructor(opts?: ISearchGroupViewStringSupplierOptions) {
        this.schema = opts ? opts.schema : undefined;
        this.group = opts ? opts.group : undefined;
        this.defaultOp = opts ? opts.defaultOp : undefined;
    }
    get defaultOp() {
        return this._defaultOp || SearchGroupOperator.AND;
    }
    set defaultOp(value : SearchGroupOperator) {
        this._defaultOp = value;
    }
    protected _getSchemaField(field : ISearchField) : ISearchSchemaField {
        return getSchemaField(this.schema, field.name);
    }
    protected _mapFieldIntoSearchStringsImmediate(name : string, searchString : any, searchStrings : string[], fieldSchema : ISearchSchemaField, op : SearchGroupOperator = this.defaultOp) : void {
        searchStrings.push(`${name ? name + ":" : ""}${searchString}`);
    }
    protected _mapFieldIntoSearchStrings(group : ISearchGroup, field : ISearchField, searchStrings : string[]) : void {
        const schemaField = this._getSchemaField(field);
        if(schemaField) {
            searchStrings.push(`${schemaField.name}:${field.searchString}`);
        } else {
            searchStrings.push(`${field.name ? field.name + ":" : ""}${field.searchString}`);
        }
    }
    protected _mapGroupToSearchString(group : ISearchGroup, child : boolean = false) : string {
        const els : string[] = [];
        if(group.fields && group.fields.length > 0) {
            group.fields.forEach(field => {
                this._mapFieldIntoSearchStrings(group, field, els);
            });
        }
        if(group.groups && group.groups.length > 0) {
            group.groups.forEach(g => {
                els.push(this._mapGroupToSearchString(g, true));
            });
        }
        const criteria = els.join(` ${group.op || this.defaultOp} `);
        return child ? `(${criteria})` : criteria;
    }

    get value() {
        return this.searchString;
    }

    get searchString() {
        return this._mapGroupToSearchString(this.group);
    }

    toString() {
        return this.searchString;
    }
}

export { SearchGroupViewStringSupplier, ISearchGroupViewStringSupplierOptions }