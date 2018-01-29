import * as React from "react";
import IEXAMSActivity from "../IEXAMSActivity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import EXAMSActivityColumns from "./EXAMSActivityColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";

interface IEXAMSActivityDetailsListProps {
    list: IMasterEntitySourceListModel<IEXAMSActivity>;
    viewPreferences?: IViewPreferencesModel;
}

class EXAMSActivityDetailsList extends React.Component<IEXAMSActivityDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={EXAMSActivityColumns}
                    list={this.props.list}
                    typeLabel="EXAMS Activities"
                    itemType="activity"
                    viewPreferences={this.props.viewPreferences} />;
    }
}

export { EXAMSActivityDetailsList as default, EXAMSActivityDetailsList }