import * as React from 'react';
import { observer } from "mobx-react";
import * as Icons from "icon/AnalystDesktopIcons";
import "./MovementHistory.scss";
import MEDetailsList from "me/component/MEDetailsList";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";

interface IMovementsProps {
    model: ITravellerHistoryModel;
    movementDataColumns?: any;
}

@observer
class MovementsHistory extends React.Component<IMovementsProps, any> {

    render() {
        return (
            <MEDetailsList icon={<Icons.MOVEMENTHISTORY/>}
                           label="Movement History"
                           className="movements"
                           columns={this.props.movementDataColumns}
                           items={this.props.model.movementItems}
                           sync={this.props.model.sync}/>
        );
    }
}
export {MovementsHistory as default, MovementsHistory}