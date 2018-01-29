import { action } from "mobx";
import IAppHost from "app/IAppHost";
import IPNRSearchRequest from "./IPNRSearchRequest";
import PNRSearchHistoryStore from "./PNRSearchHistoryStore";
import IPNRSearchResult from "./IPNRSearchResult";

const loadSearch = action((host : IAppHost) => {
    host.load({ path: "/pnr/search" });
});

const submitRequest = action((host : IAppHost, request : IPNRSearchRequest) => {
    // clear any search results or details on the host
    clearSearchResults(host);
    PNRSearchHistoryStore.addEntry(request);
    host.load({ path: "/pnr/search/results", params: { searchRequest: request } });
});

const submitRequestTicketPayment = action((host : IAppHost, request : IPNRSearchRequest) => {
    host.load({ path: "/pnr/ticketpayment", params: { searchRequest: request } });
});

const submitRequestTicketing = action((host : IAppHost, request : IPNRSearchRequest) => {
    host.load({ path: "/pnr/ticketing", params: { searchRequest: request } });
});

const loadSearchResults = action((host : IAppHost) => {
    host.load({ path: "/pnr/search/results" });
});

const clearSearchResults = action((host : IAppHost) => {
    host.setState({ pnrSearchResults: null, pnrSearchResult: null });
});

const selectPnrSearchResultItem = action((host : IAppHost, request : IPNRSearchRequest, item : IPNRSearchResult) => {
    host.setState({ pnrSearchResultItem: item });
    loadPnrSearchResultItem(host, request, item);
});

const loadPnrSearchResultItem = action((host : IAppHost, request : IPNRSearchRequest, item : IPNRSearchResult) => {
    host.load({ path: "/pnr/ticketpayment", params: { searchRequest: request } });
});

export {
    loadSearch,
    submitRequest,
    loadSearchResults,
    clearSearchResults, 
    submitRequestTicketPayment, 
    submitRequestTicketing, 
    loadPnrSearchResultItem, 
    selectPnrSearchResultItem 
}