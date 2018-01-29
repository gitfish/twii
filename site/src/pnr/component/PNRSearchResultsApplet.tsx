import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import PNRSearchResultsModel from "../PNRSearchResultsModel";
import IPNRSearchRequest from "../IPNRSearchRequest";
import { submitRequest } from "../PNRSearchActions";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { loadSearch, loadPnrSearchResultItem, selectPnrSearchResultItem, submitRequestTicketPayment  } from "../PNRSearchActions";
import { PNRSearchResultsContainer } from "./PNRSearchResults";
import { ClassNames } from "./PNRSearchResultsApplet.style";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IPNRSearchResult from "../IPNRSearchResult";


@observer
class PNRSearchResultsCommandBar extends React.Component<IAppProps, any> {
    private _onClickBackToSearch = () => {
        loadSearch(this.props.host);
    }

    private _goToTicketPayments = () => {
        submitRequestTicketPayment(this.props.host, this.props.host.params.searchRequest);
    }

    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "backToSearch",
                name: "Search",
                title: "Back to Search",
                iconProps: { iconName: "Back" },
                onClick: this._onClickBackToSearch
            }
        ];

        if(this.props.host.state.pnrTicketPayment) {
            items.push({
                key: "goToTicketPayments",
                name: "Ticket Payments",
                title: "Go to Ticket Payments",
                iconProps: {
                    iconName: "Forward"
                },
                onClick: this._goToTicketPayments
            });
        }

        return <CommandBar className="pnr-search-results-command-bar" items={items} />;
    }
}

class PNRSearchResultsApplet extends React.Component<IAppProps, any> {
    get searchResults() {
        let r = this.props.host.state.pnrSearchResults;
        if(!r) {
            r = new PNRSearchResultsModel();
            this.props.host.setState({ pnrSearchResults: r });
        }
        return r;
    }

    componentWillMount() {
        this.props.host.setTitle("PNR Search Results");
        const searchRequest = this.props.host.params.searchRequest;
        if(searchRequest && searchRequest !== this.searchResults.request) {
            this.searchResults.search(searchRequest);

        }
    }

    private _onItemSelected = (item : IPNRSearchResult) => {       
        let pnrKeyRequest = this.props.host.params.searchRequest;
        pnrKeyRequest.bookingSystemCode = item.bookingSystemCode;
        pnrKeyRequest.recordLocator = item.recordLocator;
        pnrKeyRequest.pnrCreationTimestamp = item.pnrCreationTimestamp;
        selectPnrSearchResultItem(this.props.host, pnrKeyRequest, item);
    }

    render() {
        return (
            <div className={css(ClassNames.root, "pnr-search-results-applet")}>
                <div className={css(ClassNames.header, "pnr-search-results-applet-header")}>
                    <PNRSearchResultsCommandBar {...this.props} />
                </div>
                <div className={css(ClassNames.body, "pnr-search-results-applet-body")}>
                    <PNRSearchResultsContainer results={this.searchResults} onItemSelected={this._onItemSelected} />
                </div>
            </div>
        );
    }
}

export { PNRSearchResultsApplet as default, PNRSearchResultsApplet }