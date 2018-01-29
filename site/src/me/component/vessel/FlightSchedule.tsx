import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./FlightScheduleDetailsList.scss";
import  IVesselScheduleModel  from "../../IVesselScheduleModel";
import IFlightScheduleColumns from "./IFlightScheduleColumns";
import MEDetailsList from "me/component/MEDetailsList";

interface IFlightScheduleProps {
    model: IVesselScheduleModel;
}


@observer
class FlightSchedule extends React.Component<IFlightScheduleProps, any> {

    render() {

        return(
            <MEDetailsList icon={<Icons.BOOKINGS/>}
                           label="Flight Schedule"
                           className="flight-schedule"
                           columns={IFlightScheduleColumns}
                           items={this.props.model.vesselSchedule}
                           sync={this.props.model.sync}/>
        );
    }
}
export {FlightSchedule as default, FlightSchedule}