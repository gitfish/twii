import ISearchService from "./ISearchService";
import ISearchRequest from "./ISearchRequest";
import ISearchResponse from "./ISearchResponse";
import { ISolrConfig } from "solr/ISolrConfig";
import RestSolrConfig from "config/RestSolrConfig";
import { IQueryRequest } from "solr/RestClient";
import { runQuery, IDataServiceQueryRequest } from "solr/DataServiceRestClient";
import * as StringUtils from "util/String";

const DEFAULT_PATH = "/demo/solrPOST/";

class SolrSearchService implements ISearchService {
    private _config : ISolrConfig;
    get config() : ISolrConfig {
        return this._config || RestSolrConfig;
    }
    set config(value) {
        this._config = value;
    }
    search(request : ISearchRequest) : Promise<ISearchResponse> {
        let query = request.text;
        if(StringUtils.isBlank(query)) {
            return Promise.resolve({
                total: 0,
                offset: 0,
                items: []
            });
        }
        
        const solrRequest : IQueryRequest = {
            q: query,
            start: request.offset !== undefined ? request.offset : undefined,
            rows: request.limit !== undefined ? request.limit : undefined,
            sort: request.sortBy ? `${request.sortBy} ${request.sortDescending ? "desc" : "asc"}` : undefined,
            wt: "json"
        };

        const dsRequest : IDataServiceQueryRequest = {
            server: this.config.server,
            port: this.config.port,
            core: request.core,
            solrQuery: {
                params: solrRequest
            }
        };

        return runQuery(`${this.config.baseUrl}`, dsRequest).then(solrResponse => {
            return {
                total: solrResponse.response.numFound,
                offset: solrResponse.response.start,
                items: solrResponse.response.docs
            };
        });
    }
}

export { SolrSearchService as default, SolrSearchService }