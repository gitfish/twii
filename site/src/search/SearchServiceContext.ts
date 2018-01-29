import Context from "common/Context";
import ISearchService from "./ISearchService";
import SolrSearchService from "./SolrSearchService";

const SearchServiceContext = new Context<ISearchService>({
    factory() {
        return new SolrSearchService();
    }
});

export { SearchServiceContext as default, SearchServiceContext }