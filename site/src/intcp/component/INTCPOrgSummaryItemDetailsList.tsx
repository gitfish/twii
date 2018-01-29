import * as React from "react";
import IINTCPOrgSummaryItem from "../IINTCPOrgSummaryItem";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import INTCPOrgSummaryItemColumns from "./INTCPOrgSummaryItemColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";

interface IINTCPOrgSummaryItemDetailsListProps {
    list: IMasterEntitySourceListModel<IINTCPOrgSummaryItem>;
    viewPreferences?: IViewPreferencesModel;
}

class INTCPOrgSummaryItemDetailsList extends React.Component<IINTCPOrgSummaryItemDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={INTCPOrgSummaryItemColumns}
                    list={this.props.list}
                    typeLabel="INTERCEPT Organisation"
                    itemType="org"
                    viewPreferences={this.props.viewPreferences} />;
    }
}

export { INTCPOrgSummaryItemDetailsList as default, INTCPOrgSummaryItemDetailsList }