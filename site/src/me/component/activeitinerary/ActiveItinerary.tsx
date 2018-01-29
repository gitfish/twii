import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./ActiveItinerary.scss";
import IMESummaryModel from "me/summary/IMESummaryModel";
import activeItineraryColumns from "./ActiveItineraryColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IActiveItineraryProps {
    model: IMESummaryModel;
}


@observer
class ActiveItinerary extends React.Component<IActiveItineraryProps, any> {
    render() {
        return (<MEDetailsList icon={<Icons.ACTIVEITINERARY/>}
                       label="Active Itinerary"
                       className="active-itinerary"
                       columns={activeItineraryColumns}
                       items={this.props.model.activeItineraryItems}
                       sync={this.props.model.sync}/>
        );
    }
}
export {ActiveItinerary as default, ActiveItinerary}