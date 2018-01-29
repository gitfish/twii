import { IAppHost } from "app/IAppHost";
import { ISmartGateSearchRequestModel } from "./ISmartGateSearchRequestModel";
import { SmartGateSearchRequestModel } from "./SmartGateSearchRequestModel";
import { ISmartGateSearchResultListModel } from "./ISmartGateSearchResultListModel";
import { SmartGateSearchResultListModel } from "./SmartGateSearchResultListModel";
import { ISmartGateSearchResult } from "./ISmartGateSearchResult";
import { IHandleModel } from "common/IHandleModel";
import { HandleModel } from "common/HandleModel";

const getSearchRequest = (host : IAppHost) : ISmartGateSearchRequestModel => {
    let r = host.state.smartGateSearchRequest;
    if(!r) {
        r = new SmartGateSearchRequestModel();
        host.setState({ smartGateSearchRequest: r });
    }
    return r;
};

const hasSearchRequest = (host : IAppHost) : boolean => {
    return host.state.smartGateSearchRequest ? true : false;
};

const getSearchResultList = (host : IAppHost) : ISmartGateSearchResultListModel => {
    let r = host.state.smartGateSearchResultList;
    if(!r) {
        r = new SmartGateSearchResultListModel();
        host.setState({ smartGateSearchResultList: r });
    }
    return r;
};

const hasSearchResultList = (host : IAppHost) : boolean => {
    return host.state.smartGateSearchResultList ? true : false;
};

const clearSearchResultList = (host : IAppHost) => {
    host.setState({ smartGateSearchResultList: null });
};

const getSearchResultHandle = (host : IAppHost) : IHandleModel<ISmartGateSearchResult> => {
    let r = host.state.smartGateSearchResultToggle;
    if(!r) {
        r = new HandleModel();
        host.setState({ smartGateSearchResultToggle: r });
    }
    return r;
};

export {
    getSearchRequest,
    hasSearchRequest, 
    getSearchResultList,
    hasSearchResultList,
    clearSearchResultList,
    getSearchResultHandle
}