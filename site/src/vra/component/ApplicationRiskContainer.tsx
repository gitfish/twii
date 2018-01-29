import * as React from "react";
import IApplicationRiskModel from "../IApplicationRiskModel";
import { ApplicationRiskSummaryContainer } from "./ApplicationRiskSummary";
import { ApplicationClientListContainer } from "./ApplicationClientList";
import IClientRiskCheckKey from "../IClientRiskCheckKey";
import "./ApplicationRiskContainer.scss";

interface IApplicationRiskContainerProps {
    applicationRisk: IApplicationRiskModel;
    onClientSelected?: (clientRiskCheckKey: IClientRiskCheckKey) => void;
}

class ApplicationRiskContainer extends React.Component<IApplicationRiskContainerProps, any> {
    render() {
        return (
            <div className="application-risk-container">
                <ApplicationRiskSummaryContainer applicationRiskSummary={this.props.applicationRisk.summary} />
                <ApplicationClientListContainer applicationClientList={this.props.applicationRisk.clientList}
                                                onClientSelected={this.props.onClientSelected}/>
            </div>
        )
    }
}

export { ApplicationRiskContainer as default, ApplicationRiskContainer }