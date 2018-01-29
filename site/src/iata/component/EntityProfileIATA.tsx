import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import IATAAgencyColumns from "./IATAAgencyColumns";
import IATAAgencyViewPrefsStore from "../IATAAgenciesViewPrefsStore";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import { getViewPreferenceColumns } from "common/component/ColumnHelper";
import { openAgencyDetails } from "../IATAActions";

class IATAAgencyApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="iata-agencies" title="IATA Agencies">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={IATAAgencyColumns} viewPreferences={IATAAgencyViewPrefsStore} onItemInvoked={openAgencyDetails} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const IATAAgencyDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("IATA Agencies", doc);
    buildTable(group.items, getViewPreferenceColumns(IATAAgencyColumns, IATAAgencyViewPrefsStore), doc);
    buildComments(group.comments, doc);
};

export { IATAAgencyApplet as default, IATAAgencyApplet, IATAAgencyDocumentHandler }