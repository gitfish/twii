import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./BaggageDetails.scss";
import IMESummaryModel from "me/summary/IMESummaryModel";
import baggageDetailsColumns from "./BaggageDetailsColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IBaggageDetailsProps {
    model: IMESummaryModel;
}

@observer
class MEBaggageDetails extends React.Component<IBaggageDetailsProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.BAGGAGEDETAILS/>}
                           label="Baggage"
                           className="baggage-details"
                           columns={baggageDetailsColumns}
                           items={this.props.model.baggageItems}
                           sync={this.props.model.sync} />
        );
    }
}
export {MEBaggageDetails as default, MEBaggageDetails}