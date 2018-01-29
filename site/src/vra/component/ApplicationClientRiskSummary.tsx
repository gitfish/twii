import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import SyncContainer from "common/component/SyncContainer";
import Details from "common/component/Details";
import IApplicationClientRiskSummaryModel from "../IApplicationClientRiskSummaryModel";
import IApplicationClientRiskSummaryItem from "../IApplicationClientRiskSummaryItem";
import ApplicationClientRiskSummaryItem from "./ApplicationClientRiskSummaryItem";

interface IApplicationClientRiskSummaryProps {
    applicationClientRiskSummary: IApplicationClientRiskSummaryModel;
    onItemSelected: (item: IApplicationClientRiskSummaryItem) => void;
    onApplicationSelected?: (permissionRequestId: string) => void;
    onClientSelected?: (clientId: string) => void;
}

@observer
class ApplicationClientRiskSummary extends React.Component<IApplicationClientRiskSummaryProps, any> {
    render() {
        let content;
        if(this.props.applicationClientRiskSummary.selectedItem) {
            content = <ApplicationClientRiskSummaryItem applicationClientRiskSummary={this.props.applicationClientRiskSummary}
                                                        onItemSelected={this.props.onItemSelected}
                                                        onApplicationSelected={this.props.onApplicationSelected}
                                                        onClientSelected={this.props.onClientSelected}/>;
        } else {
            content = <MessageBar messageBarType={MessageBarType.warning}>No risk summary found</MessageBar>;
        }
        return (
            <div className="application-client-risk-summary">
                {content}
            </div>
        )
    }
}

class ApplicationClientRiskSummaryContainer extends React.Component<IApplicationClientRiskSummaryProps, any> {
    private _onRenderDone = () => {
        return <ApplicationClientRiskSummary {...this.props} />
    };
    render() {
        return (
            <Details className="application-client-risk-summary-container" title="Client Risk Assessment"
                     controlOnHeaderClick={false} open={true}>
                <SyncContainer sync={this.props.applicationClientRiskSummary.sync} onRenderDone={this._onRenderDone} />
            </Details>
        )
    }
}

export { ApplicationClientRiskSummary as default, ApplicationClientRiskSummary, ApplicationClientRiskSummaryContainer }