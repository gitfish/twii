import { IAppHost } from "app/IAppHost";
import { IMasterEntitySearchRequestModel } from "./IMasterEntitySearchRequestModel";
import { MasterEntitySearchRequestModel } from "./MasterEntitySearchRequestModel";
import { IMasterEntitySearchResultModel } from "./IMasterEntitySearchResultModel";
import { MasterEntitySearchResultModel } from "./MasterEntitySearchResultModel";

const hasSearchRequestModel = (host : IAppHost) : boolean => {
    return host.state.entitySearchRequest ? true : false;
};

const getSearchRequestModel = (host : IAppHost) : IMasterEntitySearchRequestModel => {
    let r = host.state.entitySearchRequest;
    if(!r) {
        r = new MasterEntitySearchRequestModel();
        host.setState({ entitySearchRequest: r });
    }
    return r;
};

const getSearchResultModel = (host : IAppHost) : IMasterEntitySearchResultModel => {
    let r = host.state.entitySearchResult;
    if(!r) {
        r = new MasterEntitySearchResultModel();
        host.setState({ entitySearchResult: r });
    }
    return r;
    
}

export { getSearchRequestModel, hasSearchRequestModel, getSearchResultModel }