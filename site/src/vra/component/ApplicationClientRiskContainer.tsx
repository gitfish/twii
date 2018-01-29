import * as React from "react";
import { observer } from "mobx-react";
import IApplicationClientRiskModel from "../IApplicationClientRiskModel";
import IApplicationClientRiskSummaryItem from "../IApplicationClientRiskSummaryItem";
import { ApplicationClientRiskSummaryContainer } from "./ApplicationClientRiskSummary";
import { ProfileMatchesContainer } from "./ProfileMatches";
import { EntityMatchesContainer } from "./EntityMatches";
import "./ApplicationClientRiskContainer.scss";

interface IApplicationClientRiskContainerProps {
    applicationClientRisk: IApplicationClientRiskModel;
    onApplicationSelected?: (permissionRequestId: string) => void;
    onClientSelected?: (clientId: string) => void;
}

@observer
class ApplicationClientRiskContainer extends React.Component<IApplicationClientRiskContainerProps, any> {
    private _handleItemSelected = (item: IApplicationClientRiskSummaryItem) => {
        this.props.applicationClientRisk.summary.selectedItem = item;
        this.props.applicationClientRisk.profileMatches.load(item);
    };
    render() {
        let profileMatchesContent;
        const summarySync = this.props.applicationClientRisk.summary.sync;
        if (!summarySync.syncing && summarySync.hasSynced && !summarySync.error) {
            profileMatchesContent = <ProfileMatchesContainer profileMatches={this.props.applicationClientRisk.profileMatches} />
        }
        return (
            <div className="application-client-risk-container">
                <ApplicationClientRiskSummaryContainer applicationClientRiskSummary={this.props.applicationClientRisk.summary}
                                                       onItemSelected={this._handleItemSelected}
                                                       onApplicationSelected={this.props.onApplicationSelected}
                                                       onClientSelected={this.props.onClientSelected}/>
                {profileMatchesContent}
                <EntityMatchesContainer />
            </div>
        )
    }
}

export { ApplicationClientRiskContainer as default, ApplicationClientRiskContainer }