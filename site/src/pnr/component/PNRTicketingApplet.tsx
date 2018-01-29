import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import PNRTicketPaymentModel from "../PNRTicketPaymentModel";
import PNRTicketingModel from "../PNRTicketingModel";
import IPNRSearchRequest from "../IPNRSearchRequest";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { loadSearch } from "../PNRSearchActions";
import { PNRTicketPaymentContainer } from "./PNRTicketPayment";
import { PNRTicketingContainer } from "./PNRTicketing";
import { ClassNames } from "./PNRTicketingApplet.style";
import { css } from "office-ui-fabric-react/lib/Utilities";

@observer
class PNRTicketingCommandBar extends React.Component<IAppProps, any> {
    private _onClickBackToSearch = () => {
        loadSearch(this.props.host);
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
        return <CommandBar className="pnr-search-results-command-bar" items={items} />;
    }
}

class PNRTicketingApplet extends React.Component<IAppProps, any> {

    get ticketing() {
        let r = this.props.host.state.pnrTicketing;
        if(!r) {
            r = new PNRTicketingModel();
            this.props.host.setState({ pnrTicketing: r });
        }
        return r;
    }

    componentWillMount() {
        this.props.host.setTitle("PNR Ticketing Details");
        const ticketingRequest = this.props.host.params.searchRequest;

        if(ticketingRequest && ticketingRequest !== this.ticketing.request) {
            this.ticketing.getTicketing(ticketingRequest);

        }
    }
    render() {
        return (
            <div className={css(ClassNames.root, "pnr-search-results-applet")}>
                <div className={css(ClassNames.header, "pnr-search-results-applet-header")}>
                    <PNRTicketingCommandBar {...this.props} />
                </div>
                <div className={css(ClassNames.body, "pnr-ticket-payment-applet-body")}>
                    <PNRTicketingContainer results={this.ticketing} />
                </div>
            </div>
        );
    }
}

export { PNRTicketingApplet as default, PNRTicketingApplet }