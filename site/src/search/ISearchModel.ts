import ISearchRequest from "./ISearchRequest";
import ISearchCoreModel from "./ISearchCoreModel";

interface ISearchModel {
    request: ISearchRequest;
    cores: ISearchCoreModel[];
    search(request : ISearchRequest);
    addCore(container : ISearchCoreModel) : void;
    addCoreById(coreId : string, coreName: string) : void;
}

export { ISearchModel as default, ISearchModel }