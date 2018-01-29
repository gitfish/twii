import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import BAGSActivityColumns from "./BAGSActivityColumns";

class BAGSActivityApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="bags-activities" title="BAGS Activities">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={BAGSActivityColumns} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const BAGSActivityDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("BAGS Activities", doc);
    buildTable(group.items, BAGSActivityColumns, doc);
    buildComments(group.comments, doc);
};

export { BAGSActivityApplet as default, BAGSActivityApplet, BAGSActivityDocumentHandler }