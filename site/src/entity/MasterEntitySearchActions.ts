import { action } from "mobx";
import IAppHost from "app/IAppHost";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IMasterEntitySearchRequestEntry from "./IMasterEntitySearchRequestEntry";
import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import MasterEntitySearchHistoryStore from "./MasterEntitySearchHistoryStore";

const loadSearch = action((host : IAppHost) => {
    host.load({ path: "/entity/search" });
});

const openNewSearch = action((host : IAppHost, request : IMasterEntitySearchRequest) => {
    MasterEntitySearchHistoryStore.addEntry(request);
    host.open({ path: "/entity/search/result", query: request });
});

const submitRequest = action((host : IAppHost, request : IMasterEntitySearchRequest) => {
    // clear any search results or details on the host
    clearSearchResult(host);
    MasterEntitySearchHistoryStore.addEntry(request);
    host.load({ path: "/entity/search/result", query: request });
});

const loadSearchResult = action((host : IAppHost) => {
    host.load({ path: "/entity/search/result" });
});

const selectSearchResultItem = action((host : IAppHost, item : IMasterEntitySearchResultItem) => {
    host.setState({ entitySearchResultItem: item });
    loadSearchResultItem(host, item);
});

const loadSearchResultItem = action((host : IAppHost, item : IMasterEntitySearchResultItem) => {
    host.load({ path: `/entity/${encodeURIComponent(String(item.mstrEntyId))}` });
});

const clearSearchResult = action((host : IAppHost) => {
    host.setState({ entitySearchResult: null, entitySearchResultItem: null });
});

export { loadSearch, submitRequest, openNewSearch, loadSearchResult, clearSearchResult, selectSearchResultItem, loadSearchResultItem }