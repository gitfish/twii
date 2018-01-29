import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./CheckIn.scss";
import IMESummaryModel from "me/summary/IMESummaryModel";
import checkInColumns from "./MECheckInColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IActiveItineraryProps {
    model: IMESummaryModel;
}


@observer
class CheckIn extends React.Component<IActiveItineraryProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.CHECKINDETAILS/>}
                           label="Check-in"
                           className="checkin"
                           columns={checkInColumns}
                           items={this.props.model.checkinNboardingItems}
                           sync={this.props.model.sync} />
        );
    }
}
export {CheckIn as default, CheckIn}