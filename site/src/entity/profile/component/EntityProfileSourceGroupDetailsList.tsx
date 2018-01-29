import * as React from "react";
import { observer } from "mobx-react";
import {
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { createItemRemoveColumn, getActionDisabledVariant, getViewPreferenceColumns } from "common/component/ColumnHelper";
import IEntityProfileSourceGroupModel from "../IEntityProfileSourceGroupModel";
import IEntityProfileSourceGroupProps from "./IEntityProfileSourceGroupProps";
import IViewPreferencesModel from "common/IViewPreferencesModel";

interface IEntityProfileSourceGroupDetailsListProps extends IEntityProfileSourceGroupProps {
    columns?: IColumn[];
    viewPreferences?: IViewPreferencesModel;
    onItemInvoked?: (item : any, index : number, e : Event) => void;
}

@observer
class EntityProfileSourceGroupDetailsList extends React.Component<IEntityProfileSourceGroupDetailsListProps, any> {
    private _onRemoveItem = (item : any) => {
        this.props.group.removeItem(item);
    }
    private get _filteredColumns() {
        return getViewPreferenceColumns(this.props.columns, this.props.viewPreferences);
    }
    render() {
        // filter columns first
        let columns = this._filteredColumns;
        columns = [createItemRemoveColumn(this._onRemoveItem)]
                            .concat(getActionDisabledVariant(columns));
        return (
            <DetailsList className="entity-profile-source-group-details-list"
                         items={this.props.group.items.slice(0)}
                         columns={columns}
                         checkboxVisibility={CheckboxVisibility.hidden}
                         layoutMode={DetailsListLayoutMode.fixedColumns}
                         constrainMode={ConstrainMode.unconstrained}
                         onItemInvoked={this.props.onItemInvoked} />
        );
    }
}

export { EntityProfileSourceGroupDetailsList as default, EntityProfileSourceGroupDetailsList, IEntityProfileSourceGroupDetailsListProps }

