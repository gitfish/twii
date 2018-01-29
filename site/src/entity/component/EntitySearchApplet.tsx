import * as React from "react";
import { observer } from "mobx-react";
import IAppHost from "app/IAppHost";
import IAppProps from "app/component/IAppProps";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import IMasterEntitySearchRequestEntry from "../IMasterEntitySearchRequestEntry";
import IMasterEntitySearchRequestModel from "../IMasterEntitySearchRequestModel";
import MasterEntitySearchRequestModel from "../MasterEntitySearchRequestModel";
import MasterEntitySearchRequestContainer from "./MasterEntitySearchRequestContainer";
import MasterEntitySearchHistoryStore from "../MasterEntitySearchHistoryStore";
import MasterEntitySearchRequestSummary from "./MasterEntitySearchRequestSummary";
import IHistoryEntry from "common/IHistoryEntry";
import { createHistoryMenuItem } from "common/component/History";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { submitRequest, clearSearchResult, loadSearchResult, loadSearchResultItem } from "../MasterEntitySearchActions";
import AppHostWrapper from "app/component/AppHostWrapper";
import { getSearchRequestModel } from "../MasterEntitySearchHelper";
import "./EntitySearchApplet.scss";

interface IEntitySearchCommandBarProps extends IAppProps {
    searchRequest: IMasterEntitySearchRequestModel;
}

@observer
class EntitySearchCommandBar extends React.Component<IEntitySearchCommandBarProps, any> {
    private _onGoToResultClick = () => {
        loadSearchResult(this.props.host);
    }
    private _onGoToEntityDetailsClick = () => {
        loadSearchResultItem(this.props.host, this.props.host.state.entitySearchResultItem);
    }
    componentWillMount() {
        MasterEntitySearchHistoryStore.load();
    }
    private _onSelectHistoryItem = (item : IHistoryEntry<IMasterEntitySearchRequest>) => {
        this.props.searchRequest.setRequest(item.value);
        submitRequest(this.props.host, item.value);
    }
    private _onRenderHistoryItem = (item : IHistoryEntry<IMasterEntitySearchRequest>, idx : number) => {
        return <MasterEntitySearchRequestSummary request={item.value} />
    }
    render() {
        const items : IContextualMenuItem[] = [
            createHistoryMenuItem({
                key: "recentSearches",
                name: "Recent Searches",
                history: MasterEntitySearchHistoryStore,
                onSelectItem: this._onSelectHistoryItem,
                onRenderItem: this._onRenderHistoryItem
            })
        ];
        if(this.props.host.state.entitySearchResult) {
            items.push({
                key: "goToResult",
                name: "Search Results",
                iconProps: { iconName: "Forward" },
                onClick: this._onGoToResultClick,
                title: "Show Search Results"
            });
        }
        const searchResultItem : IMasterEntitySearchResultItem = this.props.host.state.entitySearchResultItem;
        if(searchResultItem) {
            items.push({
                key: "goToEntityDetails",
                name: searchResultItem.stdFullNm,
                iconProps: { iconName: "Forward" },
                onClick: this._onGoToEntityDetailsClick,
                title: `Show ${searchResultItem.stdFullNm} Details`
            });
        }
        return <CommandBar className="entity-search-command-bar" items={items} />
    }
}

class EntitySearchApplet extends React.Component<IAppProps, any> {
    get searchRequest() : IMasterEntitySearchRequestModel {
        return getSearchRequestModel(this.props.host);
    }
    private _onSubmitRequest = (request : IMasterEntitySearchRequest) => {
        submitRequest(this.props.host, request);
    }
    private _onClear = () => {
        clearSearchResult(this.props.host);
    }
    componentDidMount() {
        this.props.host.title = "Entity Search";
    }
    render() {
        return (
            <AppHostWrapper title="Entity Search" host={this.props.host} className="entity-search-applet">
                <EntitySearchCommandBar {...this.props} searchRequest={this.searchRequest} />
                <MasterEntitySearchRequestContainer searchRequest={this.searchRequest} onSubmit={this._onSubmitRequest} onClear={this._onClear} />
            </AppHostWrapper>
        );
    }
}

export { EntitySearchApplet as default, EntitySearchApplet }