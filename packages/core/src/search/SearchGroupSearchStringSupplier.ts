import { ISearchSchema, ISearchSchemaField, SearchSchemaFieldType } from "./ISearchSchema";
import { ISearchGroup } from "./ISearchGroup";
import { ISearchField } from "./ISearchField";
import * as StringUtils from "../StringUtils";
import { isWhitespace } from "../StringFilters";
import { SearchGroupOperator } from "./SearchGroupOperator";
import { getSchemaField } from "./SearchHelper";
import { ISupplier } from "../ISupplier";
import { dateToDataText, dateFromInputText } from "../util/Date";
import { SearchOperator } from "./SearchOperator";
import { momentRangeFromSearchString, rangeSeparator, momentToSearchString } from "./SearchDateUtils";
import { momentToDataString } from "../MomentDataUtils";
import { escapeForPhrase, escapeTerm } from "./SearchStringUtils";
import { numberRangeFromSearchString, numberToSearchString, numberFromSearchString } from "./SearchNumberUtils";

interface ISearchGroupSearchStringSupplierOptions {
    group: ISearchGroup;
    schema?: ISearchSchema;
    defaultOp?: SearchGroupOperator;
}

class SearchGroupSearchStringSupplier implements ISupplier<string> {
    private _defaultOp : SearchGroupOperator;
    schema : ISearchSchema;
    group : ISearchGroup;
    constructor(opts?: ISearchGroupSearchStringSupplierOptions) {
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
    protected _getTerms(searchString : string, escape : boolean = false) : string[] {
        let terms : string[] = [];
        let termBuf = "";
        let inQuotes = false;
        let escapeQuote = false;
        StringUtils.forEach(searchString, ch => {
            if(ch === '"') {
                if(inQuotes) {
                    if(escapeQuote) {
                        termBuf += '\\';
                        termBuf += ch;
                        escapeQuote = false;
                    } else if(termBuf) {
                        termBuf += ch;
                        inQuotes = false;
                    }
                } else {
                    termBuf += ch;
                    inQuotes = true;
                }
            } else if(ch === '\\') {
                if(inQuotes) {
                    escapeQuote = true;
                } else {
                    termBuf += ch;
                }
            } else if(isWhitespace(ch)) {
                if(inQuotes) {
                    termBuf += ch;
                } else {
                    if(termBuf) {
                        terms.push(termBuf);
                        termBuf = "";
                    }
                }
            } else {
                termBuf += ch;
            }
        });

        if(termBuf) {
            terms.push(termBuf);
        }

        return escape ? terms.map(escapeTerm) : terms;
    }
    protected _toSearchString(field : ISearchField, fieldSchema : ISearchSchemaField) : string {
        return fieldSchema && fieldSchema.toSearchString ? fieldSchema.toSearchString(field.searchString) : field.searchString;
    }
    protected _getTermsSearchString(field : ISearchField, fieldSchema : ISearchSchemaField, groupOp : SearchGroupOperator = this.defaultOp) : string {
        const searchString = this._toSearchString(field, fieldSchema);
        const terms = this._getTerms(searchString);
        if(terms && terms.length > 0) {
            if(terms.length > 1) {
                const gels : string[] = [];
                terms.forEach(term => {
                    gels.push(`${field.name ? field.name + ":" : ""}${term}`);
                });
                return `(${gels.join(` ${groupOp} `)})`;
            } 
            return `${field.name ? field.name + ":" : ""}${terms[0]}`;
        }
    }
    protected _getStringFieldSearchString(field : ISearchField, fieldSchema : ISearchSchemaField) : string {
        let searchString = this._toSearchString(field, fieldSchema);
        if(field.operator === SearchOperator.matchesPhrase) {
            return `${field.name ? field.name + ":" : ""}"${escapeForPhrase(searchString)}"`;
        } else if(field.operator === SearchOperator.beginsWith) {
            return `${field.name ? field.name + ":" : ""}"${escapeForPhrase(searchString)}"*`;
        } else if(field.operator === SearchOperator.endsWith) {
            return `${field.name ? field.name + ":" : ""}*"${escapeForPhrase(searchString)}"`;
        }
        const groupOp = !field.operator || field.operator === SearchOperator.matchesAllTerms ? SearchGroupOperator.AND : SearchGroupOperator.OR;
        return this._getTermsSearchString(field, fieldSchema, groupOp);
    }
    protected _getDateFieldSearchString(field : ISearchField, fieldSchema : ISearchSchemaField, groupOp : SearchGroupOperator = this.defaultOp) : string {
        const searchString = this._toSearchString(field, fieldSchema);
        // range
        if(field.operator === SearchOperator.between) {
            const r = momentRangeFromSearchString(searchString);
            let fromSearchString = r && r.from ? momentToDataString(r.from) : undefined;
            if(!fromSearchString && r && r.from) {
                fromSearchString = momentToSearchString(r.from);
            }
            let toSearchString = r && r.to ? momentToDataString(r.to) : undefined;
            if(!toSearchString && r && r.to) {
                toSearchString = momentToSearchString(r.to);
            }
            return `${field.name}:[${fromSearchString || "*"} ${rangeSeparator} ${toSearchString || "*"}]`;
        }

        const d = dateFromInputText(searchString);
        if(d) {
            return `${field.name}:${dateToDataText(d)}`;
        }
        return this._getTermsSearchString(field, fieldSchema, groupOp);
    }
    protected _getNumberFieldSearchString(field : ISearchField, fieldSchema : ISearchSchemaField, groupOp : SearchGroupOperator = this.defaultOp) : string {
        const searchString = this._toSearchString(field, fieldSchema);
        if(field.operator === SearchOperator.between) {
            const r = numberRangeFromSearchString(searchString);
            let fromSearchString = r && r.from ? numberToSearchString(r.from) : undefined;
            let toSearchString = r && r.to ? numberToSearchString(r.to) : undefined;
            return `${field.name}:[${fromSearchString || "*"} ${rangeSeparator} ${toSearchString || "*"}]`;
        }
        const n = numberFromSearchString(searchString);
        if(n !== undefined) {
            return `${field.name}:${searchString}`;
        }
        return this._getTermsSearchString(field, fieldSchema, groupOp);
    }
    protected _mapFieldIntoSearchStringsImmediate(field : ISearchField, fieldSchema : ISearchSchemaField, searchStrings : string[], groupOp : SearchGroupOperator = this.defaultOp) : void {
        // TODO: other types
        let fieldSearchString;
        if(fieldSchema && fieldSchema.type === SearchSchemaFieldType.date) {
            fieldSearchString = this._getDateFieldSearchString(field, fieldSchema, groupOp);
        } else if(fieldSchema && fieldSchema.type === SearchSchemaFieldType.number) {
            fieldSearchString = this._getNumberFieldSearchString(field, fieldSchema, groupOp);
        } else {
            fieldSearchString = this._getStringFieldSearchString(field, fieldSchema);
        }
        if(fieldSearchString) {
            searchStrings.push(fieldSearchString);
        }
    }
    protected _mapFieldIntoSearchStrings(group : ISearchGroup, field : ISearchField, searchStrings : string[]) : void {
        const schemaField = this._getSchemaField(field);
        if(schemaField) {
            let searchFields = schemaField.searchFields;
            if(!searchFields || searchFields.length === 0) {
                searchFields = schemaField.fields;
            }
            if(searchFields && searchFields.length > 1) {
                // map to a group string
                const gels : string[] = [];
                searchFields.forEach(sf => {
                    this._mapFieldIntoSearchStringsImmediate(Object.assign({}, field, { name: sf }), schemaField, gels, group.op);
                });
                searchStrings.push(`(${gels.join(` ${SearchGroupOperator.OR} `)})`);
            } else {
                const searchFieldName = searchFields && searchFields.length === 1 ? searchFields[0] : schemaField.key;
                this._mapFieldIntoSearchStringsImmediate(Object.assign({}, field, { name: searchFieldName }), schemaField, searchStrings, group.op);
            }
        } else {
            this._mapFieldIntoSearchStringsImmediate(field, null, searchStrings, group.op);
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

export { SearchGroupSearchStringSupplier, ISearchGroupSearchStringSupplierOptions }