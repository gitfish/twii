import * as React from "react";
import IAppHost from "app/IAppHost";
import IAppProps from "app/component/IAppProps";
import MasterEntitySearchResult from "./MasterEntitySearchResult";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntitySearchRequestEntry from "../IMasterEntitySearchRequestEntry";
import IMasterEntitySearchResultModel from "../IMasterEntitySearchResultModel";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import MasterEntitySearchHistoryStore from "../MasterEntitySearchHistoryStore";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { loadSearch, loadSearchResultItem, selectSearchResultItem } from "../MasterEntitySearchActions";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { getSearchRequestModel, hasSearchRequestModel, getSearchResultModel } from "../MasterEntitySearchHelper";
import "./EntitySearchResultApplet.scss";

class EntitySearchResultCommandBar extends React.Component<IAppProps, any> {
    private _onBackToSearchClick = () => {
        loadSearch(this.props.host);
    }
    private _onGoToEntityDetailsClick = () => {
        loadSearchResultItem(this.props.host, this.props.host.state.entitySearchResultItem);
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "backToSearch",
                name: "Search",
                title: "Back to Search",
                iconProps: {
                    iconName: "Back"
                },
                onClick: this._onBackToSearchClick
            }
        ];
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
        return <CommandBar className="entity-search-result-command-bar" items={items} />;
    }
}

class EntitySearchResultApplet extends React.Component<IAppProps, any> {
    get searchResult() : IMasterEntitySearchResultModel {
        return getSearchResultModel(this.props.host);
    }
    componentWillMount() {
        this.props.host.title = "Entity Search Results";
        const searchRequest : IMasterEntitySearchRequest = this.props.host.params;
        if(searchRequest && Object.keys(searchRequest).length > 0 && searchRequest !== this.searchResult.request) {
            if(!hasSearchRequestModel(this.props.host)) {
                getSearchRequestModel(this.props.host).setRequest(searchRequest);
            }
            this.searchResult.search(searchRequest);
        }
    }
    private _onItemSelected = (item : IMasterEntitySearchResultItem) => {
        selectSearchResultItem(this.props.host, item);
    }
    render() {
        return (
            <AppHostWrapper title="Entity Search Results" host={this.props.host} className="entity-search-result-applet">
                <EntitySearchResultCommandBar {...this.props} />
                <MasterEntitySearchResult searchResult={this.searchResult} onItemSelected={this._onItemSelected} />
            </AppHostWrapper>
        );
    }
}

export { EntitySearchResultApplet as default, EntitySearchResultApplet }
