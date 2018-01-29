import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import SyncContainer from "common/component/SyncContainer";
import Details from "common/component/Details";
import IApplicationRiskSummaryModel from "../IApplicationRiskSummaryModel";
import ApplicationRiskSummaryItem from "./ApplicationRiskSummaryItem";

interface IApplicationRiskSummaryProps {
    applicationRiskSummary: IApplicationRiskSummaryModel;
}

@observer
class ApplicationRiskSummary extends React.Component<IApplicationRiskSummaryProps, any> {
    render() {
        let content;
        if(this.props.applicationRiskSummary.selectedItem) {
            content = <ApplicationRiskSummaryItem applicationRiskSummary={this.props.applicationRiskSummary}/>;
        } else {
            content = <MessageBar messageBarType={MessageBarType.warning}>No risk summary found</MessageBar>;
        }
        return (
            <div className="application-risk-summary">
                {content}
            </div>
        )
    }
}

class ApplicationRiskSummaryContainer extends React.Component<IApplicationRiskSummaryProps, any> {
    private _onRenderDone = () => {
        return <ApplicationRiskSummary {...this.props} />
    };
    render() {
        return (
            <Details className="application-risk-summary-container" title="Application Risk Summary"
                     controlOnHeaderClick={false} open={true}>
                <SyncContainer sync={this.props.applicationRiskSummary.sync} onRenderDone={this._onRenderDone} />
            </Details>
        )
    }
}

export { ApplicationRiskSummary as default, ApplicationRiskSummary, ApplicationRiskSummaryContainer }