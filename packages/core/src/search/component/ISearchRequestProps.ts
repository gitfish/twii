import { ISearchRequestModel } from "../model/ISearchRequestModel";
import { ISearchRequest } from "../ISearchRequest";

interface ISearchRequestProps {
    request: ISearchRequestModel;
    onSubmit?: (request : ISearchRequest) => void;
}

export { ISearchRequestProps }