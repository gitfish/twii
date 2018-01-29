import * as React from "react";
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import IMESummaryModel from "me/summary/IMESummaryModel";
import pnrHistoryColumns from "./PNRHistoryColumns";
import "./PNRHistorySummary.scss";
import MEDetailsList from "me/component/MEDetailsList";

interface PNRHistorySummaryProps {
    model: IMESummaryModel;
}


@observer
class PNRHistorySummary extends React.Component<PNRHistorySummaryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="PNR History"
                           className="pnr-history-summary"
                           columns={pnrHistoryColumns}
                           items={this.props.model.pnrHistoryItems}
                           sync={this.props.model.sync}/>

        );
    }
}

export { PNRHistorySummary as default, PNRHistorySummary }