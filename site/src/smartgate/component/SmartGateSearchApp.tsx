import * as React from "react";
import { observer } from "mobx-react";
import { IAppProps } from "app/component/IAppProps";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { getSearchRequest, hasSearchResultList } from "../SmartGateSearchUtils";
import { SmartGateSearchRequestForm } from "./SmartGateSearchRequestForm";
import { ISmartGateSearchRequest } from "../ISmartGateSearchRequest";
import { submitRequest, setAndSubmitRequest, loadSearchResultList, clearSearchResultList } from "../SmartGateSearchActions";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { SmartGateSearchHistoryStore } from "../SmartGateSearchHistoryStore";
import { IHistoryEntry } from "common/IHistoryEntry";
import { createHistoryMenuItem } from "common/component/History"
import { SmartGateSearchRequestSummary } from "./SmartGateSearchRequestSummary";

@observer
class SmartGateSearchCommandBar extends React.Component<IAppProps, any> {
    private _onGoToResultClick = () => {
        loadSearchResultList(this.props.host);
    }
    componentWillMount() {
        SmartGateSearchHistoryStore.load();
    }
    private _onSelectHistoryItem = (item : IHistoryEntry<ISmartGateSearchRequest>) => {
        setAndSubmitRequest(this.props.host, item.value);
    }
    private _onRenderHistoryItem = (item : IHistoryEntry<ISmartGateSearchRequest>, idx : number) => {
        return <SmartGateSearchRequestSummary request={item.value} />
    }
    render() {
        const items : IContextualMenuItem[] = [
            createHistoryMenuItem({
                key: "recentSearches",
                name: "Recent Searches",
                history: SmartGateSearchHistoryStore,
                onSelectItem: this._onSelectHistoryItem,
                onRenderItem: this._onRenderHistoryItem
            })
        ];
        if(hasSearchResultList(this.props.host)) {
            items.push({
                key: "goToResult",
                name: "Search Results",
                iconProps: { iconName: "Forward" },
                onClick: this._onGoToResultClick,
                title: "Show Search Results"
            });
        }
        return <CommandBar className="smartgate-search-command-bar" items={items} />
    }
}

class SmartGateSearchApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Smart Gate Search");
    }
    private _onSubmit = (request : ISmartGateSearchRequest) => {
        submitRequest(this.props.host, request);
    }
    private _onClear = () => {
        clearSearchResultList(this.props.host);
    }
    render() {
        return (
            <AppHostWrapper host={this.props.host} title="Smart Gate Search">
                <SmartGateSearchCommandBar {...this.props} />
                <SmartGateSearchRequestForm request={getSearchRequest(this.props.host)} onSubmit={this._onSubmit} onClear={this._onClear} />
            </AppHostWrapper>
        );
    }
}

export { SmartGateSearchApp }