import * as React from "react";
import { observer } from "mobx-react";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { IAppProps} from "@twii/common/lib/component/IAppProps";
import { IMasterEntitySearchRequest } from "../IMasterEntitySearchRequest";
import { IMasterEntitySearchResult } from "../IMasterEntitySearchResult";
import { IMasterEntitySearchRequestModel } from "../model/IMasterEntitySearchRequestModel";
import { MasterEntitySearchRequestModel } from "../model/MasterEntitySearchRequestModel";
/*
import MasterEntitySearchRequestContainer from "./MasterEntitySearchRequestContainer";
import MasterEntitySearchHistoryStore from "../MasterEntitySearchHistoryStore";
import MasterEntitySearchRequestSummary from "./MasterEntitySearchRequestSummary";
import IHistoryEntry from "common/IHistoryEntry";
import { createHistoryMenuItem } from "common/component/History";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { submitRequest, clearSearchResult, loadSearchResult, loadSearchResultItem, loadSearchResultItems } from "../MasterEntitySearchActions";
import AppHostWrapper from "app/component/AppHostWrapper";
import { getSearchRequestModel } from "../MasterEntitySearchHelper";
import { EntityPreferencesHandleStore } from "../EntityPreferencesHandleStore";
import { createEntityPreferencesMenuItem } from "./EntityPreferencesHelper";
import "./EntitySearchApplet.scss";

interface IEntitySearchCommandBarProps extends IAppletProps {
    searchRequest: IMasterEntitySearchRequestModel;
}

@observer
class EntitySearchCommandBar extends React.Component<IEntitySearchCommandBarProps, any> {
    private _buttonRef : HTMLElement;
    private _onGoToResultClick = () => {
        loadSearchResult(this.props.host);
    }
    private _onGoToEntityDetailsClick = () => {
        if(this.props.host.state.entitySearchResultItem) {
            loadSearchResultItem(this.props.host, this.props.host.state.entitySearchResultItem);
        } else if(this.props.host.state.entitySearchResultItems) {
            loadSearchResultItems(this.props.host, this.props.host.state.entitySearchResultItems);
        }
    }
    componentWillMount() {
        MasterEntitySearchHistoryStore.load();
        EntityPreferencesHandleStore.load();
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
        const searchResultItems : IMasterEntitySearchResultItem[] = this.props.host.state.entitySearchResultItems;
        let name;
        if(searchResultItem) {
            name = searchResultItem.stdFullNm;
        } else if(searchResultItems && searchResultItems.length > 0) {
            const names : string[] = [];
            searchResultItems.forEach(r => {
                if(names.indexOf(r.stdFullNm) < 0) {
                    names.push(r.stdFullNm);
                }
            });
            name = names.join(", ");
        }
        if(name) {
            items.push({
                key: "goToEntityDetails",
                name: name,
                iconProps: { iconName: "Forward" },
                onClick: this._onGoToEntityDetailsClick,
                title: `Show ${name} Details`
            });
        }

        const farItems : IContextualMenuItem[] = [];
        farItems.push(createEntityPreferencesMenuItem(EntityPreferencesHandleStore));

        return <CommandBar className="entity-search-command-bar" items={items} farItems={farItems} />
    }
}

class EntitySearchApplet extends React.Component<IAppletProps, any> {
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
            <AppHostWrapper className="entity-search-applet" host={this.props.host} title="Entity Search">
                <EntitySearchCommandBar {...this.props} searchRequest={this.searchRequest} />
                <MasterEntitySearchRequestContainer searchRequest={this.searchRequest} onSubmit={this._onSubmitRequest} onClear={this._onClear} />
            </AppHostWrapper>
        );
    }
}

export { EntitySearchApplet as default, EntitySearchApplet }
*/