import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import { PNRSearchRequestContainer, PNRSearchRequestSummary } from "./PNRSearchRequest";
import IPNRSearchRequestModel from "../IPNRSearchRequestModel";
import PNRSearchRequestModel from "../PNRSearchRequestModel";
import IPNRSearchRequest from "../IPNRSearchRequest";
import { submitRequest, loadSearchResults, clearSearchResults,submitRequestTicketPayment } from "../PNRSearchActions";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { createHistoryMenuItem } from "common/component/History";
import PNRSearchHistoryStore from "../PNRSearchHistoryStore";
import { ClassNames } from "./PNRSearchApplet.style";

interface IPNRSearchCommandBarProps extends IAppProps {
    searchRequest: IPNRSearchRequestModel;
}

@observer
class PNRSearchCommandBar extends React.Component<IPNRSearchCommandBarProps, any> {
    private _onClickItem = (item : IPNRSearchRequest) => {
        submitRequest(this.props.host, item);
    }
    private _onGoToResultClick = () => {
        loadSearchResults(this.props.host);
    }
    private _onSelectHistoryItem = (item : any) => {
        this.props.searchRequest.setRequest(item.value);
        submitRequest(this.props.host, item.value);
    }
    private _onRenderHistoryItem = (item : any) => {
        return <PNRSearchRequestSummary searchRequest={item.value} />
    }
    componentWillMount() {
        PNRSearchHistoryStore.load();
    }
    render() {
        const items : IContextualMenuItem[] = [
            createHistoryMenuItem({
                key: "recentSearches",
                name: "Recent Searches",
                history: PNRSearchHistoryStore,
                onRenderItem: this._onRenderHistoryItem,
                onSelectItem: this._onSelectHistoryItem
            })
        ];
        if(this.props.host.state.pnrSearchResults) {
            items.push({
                key: "goToResult",
                name: "Search Results",
                iconProps: { iconName: "Forward" },
                onClick: this._onGoToResultClick,
                title: "Show Search Results"
            });
        }
        return <CommandBar className="pnr-search-command-bar" items={items} />;
    }
}

class PNRSearchApplet extends React.Component<IAppProps, any> {
    get searchRequest() {
        let r = this.props.host.state.pnrSearchRequest;
        if(!r) {
            r = new PNRSearchRequestModel();
            this.props.host.setState({ pnrSearchRequest: r });
        }
        return r;
    }
    private _onSubmit = (request : IPNRSearchRequest) => {
        submitRequest(this.props.host, request);
    }
    private _onClear = () => {
        clearSearchResults(this.props.host);
    }
    componentWillMount() {
        this.props.host.setTitle("PNR Search");
    }
    render() {
        return (
            <div>
                <PNRSearchCommandBar {...this.props} searchRequest={this.searchRequest} />
                <PNRSearchRequestContainer searchRequest={this.searchRequest} onSubmit={this._onSubmit} onClear={this._onClear} />
            </div>
        );
    }
}

export { PNRSearchApplet as default, PNRSearchApplet }