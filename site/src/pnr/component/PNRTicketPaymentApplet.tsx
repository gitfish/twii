import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import PNRTicketPaymentModel from "../PNRTicketPaymentModel";
import PNRTicketingModel from "../PNRTicketingModel";
import IPNRSearchRequest from "../IPNRSearchRequest";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { loadSearch, loadSearchResults, submitRequestTicketPayment } from "../PNRSearchActions";
import { PNRTicketPaymentContainer } from "./PNRTicketPayment";
import { PNRTicketingContainer } from "./PNRTicketing";
import { ClassNames } from "./PNRTicketPaymentApplet.style";
import { css } from "office-ui-fabric-react/lib/Utilities";

@observer
class PNRTicketPaymentCommandBar extends React.Component<IAppProps, any> {
    private _onClickBackToSearch = () => {
        loadSearch(this.props.host);
    }

    private _onBackToSearchResult = () => {
        loadSearchResults(this.props.host);
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

        if(this.props.host.state.pnrSearchResults) {
            items.push({
                key: "backToSearchResults",
                name: "Search Results",
                title: "Back to Search Results",
                iconProps: {
                    iconName: "Back"
                },
                onClick: this._onBackToSearchResult
            });
        }

        return <CommandBar className="pnr-search-results-command-bar" items={items} />;
    }
}

class PNRTicketPaymentApplet extends React.Component<IAppProps, any> {
    get ticketPayment() {
        let r = this.props.host.state.pnrTicketPayment;
        if(!r) {
            r = new PNRTicketPaymentModel();
            this.props.host.setState({ pnrTicketPayment: r });
        }
        return r;
    }

    componentWillMount() {
        this.props.host.setTitle("PNR Ticket Payment");
        const ticketPaymentRequest = this.props.host.params.searchRequest;
        const ticketingRequest = this.props.host.params.searchRequest;


        if(ticketPaymentRequest && ticketPaymentRequest !== this.ticketPayment.request) {
            this.ticketPayment.getTicketPayment(ticketPaymentRequest);

        }
    }
    render() {
        return (
            <div className={css(ClassNames.root, "pnr-search-results-applet")}>
                <div className={css(ClassNames.header, "pnr-search-results-applet-header")}>
                    <PNRTicketPaymentCommandBar {...this.props} />
                </div>
                <div className={css(ClassNames.body, "pnr-ticket-payment-applet-body")}>
                    <PNRTicketPaymentContainer results={this.ticketPayment} />
                </div>
            </div>
        );
    }
}

export { PNRTicketPaymentApplet as default, PNRTicketPaymentApplet }