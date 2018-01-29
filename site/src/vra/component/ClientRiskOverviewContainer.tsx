import * as React from "react";
import IClientRiskOverviewModel from "../IClientRiskOverviewModel";
import { ClientRiskOverviewListContainer } from "./ClientRiskOverviewList";
import ClientRiskOverviewSummaryContainer from "./ClientRiskOverviewSummaryContainer";
import {
    getClientRiskOverviewPreFinalColumns,
    getClientRiskOverviewPostFinalColumns
} from "./ClientRiskOverviewColumns";
import IClientRiskCheckKey from "../IClientRiskCheckKey";
import "./ClientRiskOverviewContainer.scss";

interface IClientRiskOverviewContainerProps {
    clientRiskOverview: IClientRiskOverviewModel;
    onApplicationSelected?: (permissionRequestId: string) => void;
    onClientSelected?: (clientRiskCheckKey: IClientRiskCheckKey) => void;
}

class ClientRiskOverviewContainer extends React.Component<IClientRiskOverviewContainerProps, any> {
    render() {
        return (
            <div className="client-risk-overview-container">
                <ClientRiskOverviewSummaryContainer clientRiskOverview={this.props.clientRiskOverview} />
                <ClientRiskOverviewListContainer title="Client Risk Overview - Pre Finalised"
                                                 clientRiskOverviewList={this.props.clientRiskOverview.preDecisionList}
                                                 sync={this.props.clientRiskOverview.sync}
                                                 columns={getClientRiskOverviewPreFinalColumns(this.props.onApplicationSelected)}/>
                <ClientRiskOverviewListContainer title="Client Risk Overview - Post Finalised"
                                                 clientRiskOverviewList={this.props.clientRiskOverview.postDecisionList}
                                                 sync={this.props.clientRiskOverview.sync}
                                                 columns={getClientRiskOverviewPostFinalColumns(this.props.onClientSelected)}/>
            </div>
        )
    }
}

export { ClientRiskOverviewContainer as default, ClientRiskOverviewContainer }