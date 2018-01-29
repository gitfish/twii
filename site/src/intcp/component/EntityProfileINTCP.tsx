import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import INTCPMovementColumns from "./INTCPMovementColumns";
import INTCPOrgSummaryColumns from "./INTCPOrgSummaryItemColumns";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import { getViewPreferenceColumns } from "common/component/ColumnHelper";
import INTCPMovementsViewPrefsStore from "../INTCPMovementsViewPrefsStore";

class INTCPMovementApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="intcp-movements" title="INTCP Movements">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={INTCPMovementColumns} viewPreferences={INTCPMovementsViewPrefsStore} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const INTCPMovementDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("INTCP Movements", doc);
    buildTable(group.items, getViewPreferenceColumns(INTCPMovementColumns, INTCPMovementsViewPrefsStore), doc);
    buildComments(group.comments, doc);
};

class INTCPOrgSummaryApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="intcp-org-summaries" title="INTCP Org Summaries">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={INTCPOrgSummaryColumns} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const INTCPOrgSummaryDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("INTCP Org Summaries", doc);
    buildTable(group.items, INTCPOrgSummaryColumns, doc);
    buildComments(group.comments, doc);
};

export { INTCPMovementApplet, INTCPOrgSummaryApplet, INTCPMovementDocumentHandler, INTCPOrgSummaryDocumentHandler }