import * as React from "react";
import { observer } from "mobx-react";
import SearchInputContainer from "./SearchInputContainer";
import SearchCores from "./SearchCores";
import ISearchRequest from "../ISearchRequest";
import ISearchRequestModel from "../ISearchRequestModel";
import ISearchModel from "../ISearchModel";
import "./SearchContainer.scss";

interface ISearchContainerProps {
    request: ISearchRequestModel;
    search: ISearchModel;
}

class SearchContainer extends React.Component<ISearchContainerProps, any> {
    _handleSearch = (request : ISearchRequest) => {
        this.props.search.search(request);
    }
    render() {
        return (
            <div className="search-container">
                <SearchInputContainer request={this.props.request} onSearch={this._handleSearch} />
                <SearchCores search={this.props.search} />
            </div>
        );
    }
}

export { SearchContainer as default, SearchContainer }