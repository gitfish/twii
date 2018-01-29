import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "../../../icon/AnalystDesktopIcons";
import "./TravelAgents.scss";
import IMESummaryModel from "../../summary/IMESummaryModel";
import travelAgentsColumns from "./TravelAgentsColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IMEBookingSummaryProps {
    model: IMESummaryModel;
}


@observer
class MEBSTravelAgents extends React.Component<IMEBookingSummaryProps, any> {

    render() {

        return(
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="Travel Agents"
                           className="travel-agents"
                           columns={travelAgentsColumns}
                           items={this.props.model.travelAgents}
                           sync={this.props.model.sync}/>
        );
    }
}
export {MEBSTravelAgents as default, MEBSTravelAgents}