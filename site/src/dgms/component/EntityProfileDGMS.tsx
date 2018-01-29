import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import DGMSActivityColumns from "./DGMSActivityColumns";

class DGMSActivityApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="dgms-activities" title="DGMS Activities">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={DGMSActivityColumns} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const DGMSActivityDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("DGMS Activities", doc);
    buildTable(group.items, DGMSActivityColumns, doc);
    buildComments(group.comments, doc);
};

export { DGMSActivityApplet as default, DGMSActivityApplet, DGMSActivityDocumentHandler }