import * as React from "react";
import ISeaCargoActivity from "../ISeaCargoActivity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import SeaCargoActivityColumns from "./SeaCargoActivityColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";
import { openActivityDetails } from "../SeaCargoActions";

interface ISeaCargoActivityDetailsListProps {
    list: IMasterEntitySourceListModel<ISeaCargoActivity>;
    viewPreferences?: IViewPreferencesModel;
}

class SeaCargoActivityDetailsList extends React.Component<ISeaCargoActivityDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={SeaCargoActivityColumns}
                    list={this.props.list}
                    typeLabel="Sea Cargo Activities"
                    itemType="activity/sea"
                    viewPreferences={this.props.viewPreferences}
                    onItemInvoked={openActivityDetails} />;
    }
}

export { SeaCargoActivityDetailsList as default, SeaCargoActivityDetailsList }