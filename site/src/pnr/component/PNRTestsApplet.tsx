import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import { PNRTestsRequestContainer, PNRTestsRequestContainerTwo } from "./PNRTestsRequest";
//import { PNRTestsRequestContainerTwo } from "./PNRTestsRequest";
import IPNRSearchRequestModel from "../IPNRSearchRequestModel";
import PNRSearchRequestModel from "../PNRSearchRequestModel";
import IPNRSearchRequest from "../IPNRSearchRequest";
import { submitRequest, loadSearchResults, clearSearchResults, submitRequestTicketPayment, submitRequestTicketing } from "../PNRSearchActions";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { createHistoryMenuItem } from "common/component/History";
import PNRSearchHistoryStore from "../PNRSearchHistoryStore";
import { ClassNames } from "./PNRTestsApplet.style";

interface IPNRTestsCommandBarProps extends IAppProps {
    pnrTestsRequest: IPNRSearchRequestModel;
}

@observer
class PNRTestsCommandBar extends React.Component<IPNRTestsCommandBarProps, any> {

    private _onGoToResultClick = () => {
        loadSearchResults(this.props.host);
    }
    
    componentWillMount() {
        PNRSearchHistoryStore.load();
    }
    render() {
        const items : IContextualMenuItem[] = [];
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

class PNRTestsApplet extends React.Component<IAppProps, any> {
    get pnrTestsRequest() {
        let r = this.props.host.state.pnrTestsRequest;
        if(!r) {
            r = new PNRSearchRequestModel();
            this.props.host.setState({ pnrTestsRequest: r });
        }
        return r;
    }
    private _onSubmit = (request : IPNRSearchRequest) => {
        submitRequestTicketPayment(this.props.host, request);
    }

    private _onSubmitTicketing = (request : IPNRSearchRequest) => {
        submitRequestTicketing(this.props.host, request);
    }

    componentWillMount() {
        this.props.host.setTitle("PNR Tests");
    }
    render() {
        return (
            <div>
                <PNRTestsCommandBar {...this.props} pnrTestsRequest={this.pnrTestsRequest} />
                <PNRTestsRequestContainer pnrTestsRequest={this.pnrTestsRequest} onSubmit={this._onSubmit} />
                <PNRTestsRequestContainerTwo pnrTestsRequest={this.pnrTestsRequest} onSubmit={this._onSubmitTicketing} />
            </div>
        );
    }
}

export { PNRTestsApplet as default, PNRTestsApplet }