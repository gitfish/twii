import * as React from "react";
import IBAGSActivity from "../IBAGSActivity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import BAGSActivityColumns from "./BAGSActivityColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";

interface IBAGSActivityDetailsListProps {
    list: IMasterEntitySourceListModel<IBAGSActivity>;
    viewPreferences?: IViewPreferencesModel;
}

class BAGSActivityDetailsList extends React.Component<IBAGSActivityDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                        columns={BAGSActivityColumns}
                        list={this.props.list}
                        typeLabel="BAGS Activities"
                        itemType="activity"
                        viewPreferences={this.props.viewPreferences} />;
    }
}

export { BAGSActivityDetailsList as default, BAGSActivityDetailsList }