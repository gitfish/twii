import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import "./AlertInfoDetailsList.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface MEAlertInfoSummaryProps {
    model: ITravellerHistoryModel;
    alertDataColumns?: any;
}


@observer
class MEAlertInfoSummary extends React.Component<MEAlertInfoSummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.ALERTSUMMARY/>}
                           label="Alerts"
                           className="alert-info"
                           columns={this.props.alertDataColumns}
                           items={this.props.model.alerts}
                           sync={this.props.model.sync}/>
        );
    }

}

export { MEAlertInfoSummary as default, MEAlertInfoSummary }