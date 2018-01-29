import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import "./AlertHistoryDetailsList.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface AlertHistorySummaryProps {
    model: ITravellerHistoryModel;
    alertHistoryDataColumns?: any;
}


@observer
class AlertHistorySummary extends React.Component<AlertHistorySummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.ALERTHISTORYSUMMARY/>}
                           label="Alerts History"
                           className="alert-history"
                           columns={this.props.alertHistoryDataColumns}
                           items={this.props.model.alertHistoryItems}
                           sync={this.props.model.sync}/>
        );
    }

}

export { AlertHistorySummary as default, AlertHistorySummary }