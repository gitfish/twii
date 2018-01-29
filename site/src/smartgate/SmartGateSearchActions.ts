import { action } from "mobx";
import { IAppHost } from "app/IAppHost";
import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";
import { ISmartGateSearchResult } from "./ISmartGateSearchResult";
import { SmartGateSearchHistoryStore } from "./SmartGateSearchHistoryStore";
import {
    getSearchRequest,
    clearSearchResultList as utilClearSearchResultList,
    getSearchResultHandle
} from "./SmartGateSearchUtils";

const loadSearch = action((host : IAppHost) => {
    host.load({ path: "/smartgate/search" });
});

const submitRequest = action((host : IAppHost, request : ISmartGateSearchRequest) => {
    // clear any search results or details on the host
    clearSearchResultList(host);
    SmartGateSearchHistoryStore.addEntry(request);
    host.load({ path: "/smartgate/search/result", query: request });
});

const setAndSubmitRequest = action((host : IAppHost, request : ISmartGateSearchRequest) => {
    const r = getSearchRequest(host);
    r.setRequest(request);
    submitRequest(host, request);
});

const loadSearchResultList = action((host : IAppHost) => {
    host.load({ path: "/smartgate/search/result" });
});

const clearSearchResultList = action((host : IAppHost) => {
    utilClearSearchResultList(host);
});

const openSearchResult = action((host : IAppHost, result : ISmartGateSearchResult) => {
    const h = getSearchResultHandle(host);
    h.setValue(result);
});

export {
    loadSearch,
    submitRequest,
    setAndSubmitRequest,
    loadSearchResultList,
    clearSearchResultList,
    openSearchResult
}