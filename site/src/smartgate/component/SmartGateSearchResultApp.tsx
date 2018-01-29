import * as React from "react";
import { IAppProps } from "app/component/IAppProps";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import { ISmartGateSearchRequest } from "../ISmartGateSearchRequest";
import { ISmartGateSearchResult } from "../ISmartGateSearchResult";
import { hasSearchRequest, getSearchRequest, getSearchResultList, getSearchResultHandle } from "../SmartGateSearchUtils";
import { loadSearch, openSearchResult } from "../SmartGateSearchActions";
import { SmartGateSearchResultListContainer } from "./SmartGateSearchResultList";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { SmartGateSearchResultPanel } from "./SmartGateSearchResultPanel";

class SmartGateSearchResultCommandBar extends React.Component<IAppProps, any> {
    private _onBackToSearchClick = () => {
        loadSearch(this.props.host);
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
        return <CommandBar className="entity-search-result-command-bar" items={items} />;
    }
}

class SmartGateSearchResultApp extends React.Component<IAppProps, any> {
    get resultList() {
        return getSearchResultList(this.props.host);
    }
    componentWillMount() {
        this.props.host.setTitle("Smart Gate Search Result");
        const searchRequest : ISmartGateSearchRequest = this.props.host.params;
        if(searchRequest && Object.keys(searchRequest).length > 0 && searchRequest !== this.resultList.request) {
            if(!hasSearchRequest(this.props.host)) {
                getSearchRequest(this.props.host).setRequest(searchRequest);
            }
            this.resultList.search(searchRequest);
        }
    }
    private _onSelectItem = (item : ISmartGateSearchResult) => {
        console.log("-- On Select Item: " + JSON.stringify(item));
        openSearchResult(this.props.host, item);
    }
    render() {
        return (
            <AppHostWrapper host={this.props.host} title="Smart Gate Search Result">
                <SmartGateSearchResultCommandBar {...this.props} />
                <SmartGateSearchResultListContainer resultList={this.resultList} onSelectItem={this._onSelectItem} />
                <SmartGateSearchResultPanel resultHandle={getSearchResultHandle(this.props.host)} />
            </AppHostWrapper>
        );
    }
}

export { SmartGateSearchResultApp }