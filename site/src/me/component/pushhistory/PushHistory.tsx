import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./PushHistory.scss";
import IMESummaryModel from "me/summary/IMESummaryModel";
import pushHistoryColumns from "./PushHistoryColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IPushHistoryProps {
    model: IMESummaryModel;
}


@observer
class MEBSPushHistory extends React.Component<IPushHistoryProps, any> {

    render() {
        return(
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="Push History"
                           className="push-history"
                           columns={pushHistoryColumns}
                           items={this.props.model.pushHistoryItems}
                           sync={this.props.model.sync}/>

        );
    }
}
export {MEBSPushHistory as default, MEBSPushHistory}