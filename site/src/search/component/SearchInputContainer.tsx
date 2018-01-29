import * as React from "react";
import { observer } from "mobx-react";
import { SearchBox, ISearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import ISearchRequestModel from "../ISearchRequestModel";
import ISearchRequest from "../ISearchRequest";
import * as StringUtils from "util/String";

interface ISearchInputProps {
    request : ISearchRequestModel;
    onSearch: (request : ISearchRequest) => void;
}

@observer
class SearchInputContainer extends React.Component<ISearchInputProps, any> {
    private _searchRef : ISearchBox;
    private _onChange = (text : string) => {
        this.props.request.setText(text);
    }
    private _onSearch = () => {
        if(StringUtils.isNotBlank(this.props.request.text)) {
            this.props.onSearch({ text: this.props.request.text });
        }
    }
    private _onSearchRef = (ref : ISearchBox) => {
        this._searchRef = ref;
    }
    componentDidMount() {
        this._searchRef.focus();
    }
    render() {
        return (
            <div className="search-input-container">
                <SearchBox value={this.props.request.text || ""} componentRef={this._onSearchRef} onChange={this._onChange} onSearch={this._onSearch} />
                <PrimaryButton onClick={this._onSearch} iconProps={ { iconName: "Search" } } disabled={StringUtils.isBlank(this.props.request.text)}></PrimaryButton>
            </div>
        );
    }
}

export { SearchInputContainer as default, SearchInputContainer }