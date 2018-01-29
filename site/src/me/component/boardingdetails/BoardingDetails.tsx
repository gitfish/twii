import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./BoardingDetails.scss";
import MEDetailsList from "me/component/MEDetailsList";
import IMESummaryModel from "me/summary/IMESummaryModel";
import boardingDetailsColumns from "./BoardingDetailsColumns";

interface IBoardingDetailsProps {
    model: IMESummaryModel;
}

@observer
class BoardingDetails extends React.Component<IBoardingDetailsProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BOARDINGDETAILS/>}
                           label="Boarding"
                           className="boarding-details"
                           columns={boardingDetailsColumns}
                           items={this.props.model.checkinNboardingItems}
                           sync={this.props.model.sync} />
        );
    }
}
export {BoardingDetails as default, BoardingDetails}