import * as React from "react";
import IINTCPMovement from "../IINTCPMovement";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import INTCPMovementColumns from "./INTCPMovementColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";

interface IINTCPMovementDetailsListProps {
    list: IMasterEntitySourceListModel<IINTCPMovement>;
    viewPreferences?: IViewPreferencesModel;
}

class INTCPMovementDetailsList extends React.Component<IINTCPMovementDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={INTCPMovementColumns}
                    list={this.props.list}
                    typeLabel="INTCP Movements"
                    itemType="movement"
                    viewPreferences={this.props.viewPreferences} />;
    }
}

export { INTCPMovementDetailsList as default, INTCPMovementDetailsList }