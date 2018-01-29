import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import SyncContainer from "common/component/SyncContainer";
import IClientRiskOverviewModel from "../IClientRiskOverviewModel";
import "./ClientRiskOverviewSummaryContainer.scss";

interface IClientRiskOverviewListProps {
    clientRiskOverview: IClientRiskOverviewModel;
}

@observer
class ClientRiskOverviewSummary extends React.Component<IClientRiskOverviewListProps, any> {
    render() {
        let items = this.props.clientRiskOverview.preDecisionList.total > 0
            ? this.props.clientRiskOverview.preDecisionList.items :
              this.props.clientRiskOverview.postDecisionList.items;
        if(!items || items.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>No risk checks found</MessageBar>;
        }
        let clientName = items[0].clientName;
        let clientId = this.props.clientRiskOverview.clientId;
        return (
            <div className="client-risk-overview-summary">
                <div className="client-name">{clientName}</div>
                <div className="client-id">
                    <span className="client-id-label">Client ID</span>
                    <span className="client-id-value">{clientId}</span>
                </div>
            </div>
        );
    }
}


class ClientRiskOverviewSummaryContainer extends React.Component<IClientRiskOverviewListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="client-risk-overview-summary-container">
                <ClientRiskOverviewSummary {...this.props} />
            </div>
        )
    };
    render() {
        return (
            <SyncContainer sync={this.props.clientRiskOverview.sync} onRenderDone={this._onRenderDone} />
        )
    }
}


export { ClientRiskOverviewSummaryContainer as default, ClientRiskOverviewSummaryContainer, ClientRiskOverviewSummary }