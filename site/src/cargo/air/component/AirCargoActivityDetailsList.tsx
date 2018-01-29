import * as React from "react";
import IAirCargoActivity from "../IAirCargoActivity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import AirCargoActivityColumns from "./AirCargoActivityColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";
import { openActivityDetails } from "../AirCargoActions";

interface IAirCargoActivityDetailsListProps {
    list: IMasterEntitySourceListModel<IAirCargoActivity>;
    viewPreferences?: IViewPreferencesModel;
}

class AirCargoActivityDetailsList extends React.Component<IAirCargoActivityDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={AirCargoActivityColumns}
                    list={this.props.list}
                    typeLabel="Air Cargo Activities"
                    itemType="activity/air"
                    viewPreferences={this.props.viewPreferences}
                    onItemInvoked={openActivityDetails} />;
    }
}

export { AirCargoActivityDetailsList as default, AirCargoActivityDetailsList }