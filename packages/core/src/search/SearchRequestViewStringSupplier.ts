import { ISupplier } from "../ISupplier";
import { ISearchRequest } from "./ISearchRequest";
import { ISearchSchema } from "./ISearchSchema";
import { SearchGroupOperator } from "./SearchGroupOperator";
import * as StringUtils from "../StringUtils";
import { SearchGroupViewStringSupplier } from "./SearchGroupViewStringSupplier";

interface ISearchRequestViewStringSupplierOptions {
    request: ISearchRequest;
    schema: ISearchSchema;
    defaultOp?: SearchGroupOperator;
}

class SearchRequestViewStringSupplier implements ISupplier<string> {
    private _defaultOp : SearchGroupOperator;
    request : ISearchRequest;
    schema: ISearchSchema;
    constructor(opts?: ISearchRequestViewStringSupplierOptions) {
        this.request = opts ? opts.request : undefined;
        this.schema = opts ? opts.schema : undefined;
        this.defaultOp = opts ? opts.defaultOp : undefined;
    }
    get defaultOp() {
        return this._defaultOp || SearchGroupOperator.AND;
    }
    set defaultOp(value : SearchGroupOperator) {
        this._defaultOp = value;
    }
    get searchString() {
        const els : string[] = [];
        if(StringUtils.isNotBlank(this.request.searchString)) {
            els.push(this.request.searchString);
        }
        if(this.schema && ((this.request.fields && this.request.fields.length > 0) || (this.request.groups && this.request.groups.length > 0))) {
            const supplier = new SearchGroupViewStringSupplier({
                group: this.request,
                schema: this.schema
            });
            els.push(supplier.searchString);
        }
        return els.length > 0 ? els.join(" ") : undefined;
    }
    get value() {
        return this.searchString;
    }
    toString() {
        return this.searchString;
    }
}

export { SearchRequestViewStringSupplier, ISearchRequestViewStringSupplierOptions }