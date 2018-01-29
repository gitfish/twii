import { observable, action } from "mobx";
import ISearchCoreModel from "./ISearchCoreModel";
import SearchCoreModel from "./SearchCoreModel";
import ISearchRequestModel from "./ISearchRequestModel";
import SearchRequestModel from "./SearchRequestModel";
import ISearchRequest from "./ISearchRequest";
import ISearchModel from "./ISearchModel";
import ISearchService from "./ISearchService";
import * as StringUtils from "util/String";

class SearchModel implements ISearchModel {
    @observable request : ISearchRequest;
    @observable cores : ISearchCoreModel[] = [];

    @action
    addCore(core : ISearchCoreModel) {
        this.cores.push(core);
        if(this.request) {
            core.search(this.request);
        }
    }

    @action
    addCoreById(coreId : string, coreName : string) {
        const core = new SearchCoreModel();
        core.id = coreId;
        core.name = coreName;
        this.addCore(core);
    }

    @action
    search(request : ISearchRequest) {
        this.request = request;
        if(request && StringUtils.isNotBlank(request.text)) {
            // invoked the search on any registered results
            this.cores.forEach(r => {
                r.search(request);
            });
        }
    }
}

export { SearchModel as default, SearchModel }