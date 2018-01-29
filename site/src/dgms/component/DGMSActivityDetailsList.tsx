import * as React from "react";
import IDGMSActivity from "../IDGMSActivity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import DGMSActivityColumns from "./DGMSActivityColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";

interface IDGMSActivityDetailsListProps {
    list: IMasterEntitySourceListModel<IDGMSActivity>;
    viewPreferences?: IViewPreferencesModel;
}

class DGMSActivityDetailsList extends React.Component<IDGMSActivityDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={DGMSActivityColumns}
                    list={this.props.list}
                    typeLabel="DGMS Activities"
                    itemType="activity"
                    viewPreferences={this.props.viewPreferences} />;
    }
}

export { DGMSActivityDetailsList as default, DGMSActivityDetailsList }