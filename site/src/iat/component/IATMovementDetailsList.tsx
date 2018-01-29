import * as React from "react";
import IIATMovement from "../IIATMovement";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IATMovementColumns from "./IATMovementColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";
import { openMovementDetails } from "../IATActions";

interface IIATMovementDetailsListProps {
    list: IMasterEntitySourceListModel<IIATMovement>;
    viewPreferences?: IViewPreferencesModel;
}

class IATMovementDetailsList extends React.Component<IIATMovementDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={IATMovementColumns}
                    viewPreferences={this.props.viewPreferences}
                    list={this.props.list}
                    typeLabel="IAT Movements"
                    itemType="movement"
                    onItemInvoked={openMovementDetails} />;
    }
}

export { IATMovementDetailsList as default, IATMovementDetailsList }