import { ISearchService } from "./ISearchService";
import { ISearchRequest } from "../ISearchRequest";
import { ISearchResponse } from "../ISearchResponse";
import Axios from "axios";
import { ISupplierFunc } from "../../ISupplierFunc";
import * as StringUtils from "../../StringUtils";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { ISearchSchema } from "../ISearchSchema";
import { SearchRequestSearchStringSupplier } from "../SearchRequestSearchStringSupplier";

interface IDSSearchRequest {
    searchString: string;
    op?: string;
    start?: number;
    rows?: number;
    cursorMark?: string;
    allResults?: boolean;
}

interface IDSSolrSearchResponseHeader {
    zkConnected?: boolean;
    status?: number;
    QTime?: number;
}

interface IDSSearchResponseBody<T = any> {
    numFound?: number;
    start?: number;
    docs?: T[];
}

interface IDSSearchResponseHighlighting {
    [key: string]: {
        [key: string]: string[];
    }
}

interface IDSSearchResponseFacetCounts {
    facet_queries?: any;
    facet_fields?: any;
    facet_ranges?: any;
    facet_intervals?: any;
    facet_heatmaps?: any;
}

interface IDSSearchResponse<T = any> {
    responseHeader?: IDSSolrSearchResponseHeader;
    response?: IDSSearchResponseBody<T>;
    highlighting?: IDSSearchResponseHighlighting;
    facet_counts?: IDSSearchResponseFacetCounts;
    nextCursorMark?: string;
}

class DSSearchService<D = any> implements ISearchService<D> {
    searchUrlSupplier: ISupplierFunc<string>
    private _searchUrl : string;
    private _defaultSearchGroupOperator : SearchGroupOperator;
    defaultParams : any;
    schema : ISearchSchema;
    get defaultSearchGroupOperator() {
        return this._defaultSearchGroupOperator || SearchGroupOperator.AND;
    }
    set defaultSearchGroupOperator(value) {
        this._defaultSearchGroupOperator = value;
    }
    get searchUrl() {
        if(!this._searchUrl) {
            this._searchUrl = this.searchUrlSupplier ? this.searchUrlSupplier() : undefined;
        }
        return this._searchUrl;
    }
    set searchUrl(value) {
        this._searchUrl = value;
    }

    protected _escapeSearchValue(value : string) : string {
        return StringUtils.map(value, ch => {
            if(ch === '"') {
                return '\\"';
            } else if(ch === '\\') {
                return "\\\\";
            }
            return ch;
        });
    }
    protected _mapToSearchString(request : ISearchRequest) : string {
        const supplier = new SearchRequestSearchStringSupplier({ request: request, schema: this.schema, defaultOp: this.defaultSearchGroupOperator });
        const r = supplier.value;
        return r ? `"${this._escapeSearchValue(r)}"` : undefined;
    }
    protected _mapToSearchRequest(request : ISearchRequest) : IDSSearchRequest {
        return {
            searchString: this._mapToSearchString(request),
            op: request.op,
            start: request.offset,
            rows: request.limit,
            allResults: request.allResults
        };
    }
    protected _mapFromSearchResponse(response : IDSSearchResponse<D>) : ISearchResponse<D> {
        if(response) {
            const header = response.responseHeader;
            const body = response.response;
            const r : ISearchResponse = {};
            r.duration = header ? header.QTime : undefined;
            r.total = body ? body.numFound : 0;
            r.offset = body ? body.start : 0;
            r.results = body && body.docs ? body.docs : [];
            r.highlighting = response.highlighting;
            r.facetCounts = response.facet_counts;
            r.nextCursorId = response.nextCursorMark;
            return r; 
        }
        return {
            duration: 0,
            total: 0,
            offset: 0,
            results: []
        };
    }
    search(request : ISearchRequest) : Promise<ISearchResponse<D>> {
        let req : IDSSearchRequest = this._mapToSearchRequest(request);
        if(this.defaultParams) {
            req = Object.assign({}, req, this.defaultParams);
        }
        return Axios.get(this.searchUrl, { params: req }).then(ar => {
            return this._mapFromSearchResponse(ar.data as IDSSearchResponse<D>);
        });
    }
}

export { DSSearchService }