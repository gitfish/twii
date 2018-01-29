import * as React from "react";
import IIATAAgency from "../IIATAAgency";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IATAAgencyColumns from "./IATAAgencyColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";
import IViewPreferencesModel from "common/IViewPreferencesModel";
import { openAgencyDetails } from "../IATAActions";

interface IIATAAgencyDetailsListProps {
    list: IMasterEntitySourceListModel<IIATAAgency>;
    viewPreferences?: IViewPreferencesModel;
}

class IATAAgencyDetailsList extends React.Component<IIATAAgencyDetailsListProps, any> {
    private _onItemInvoked = (item : IIATAAgency) => {
        openAgencyDetails(item);
    }
    render() {
        return <MasterEntitySourceDetailsList
                    columns={IATAAgencyColumns}
                    viewPreferences={this.props.viewPreferences}
                    list={this.props.list}
                    typeLabel="IATA Agencies"
                    itemType="agency"
                    onItemInvoked={this._onItemInvoked} />;
    }
}

export { IATAAgencyDetailsList as default, IATAAgencyDetailsList }