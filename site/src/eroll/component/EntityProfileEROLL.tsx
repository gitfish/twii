import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import { EROLLEntityColumns } from "./EROLLEntityColumns";

class EROLLEntityApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="eroll-instances" title="EROLL Instances">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={EROLLEntityColumns} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const EROLLEntityDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("EROLL Instances", doc);
    buildTable(group.items, EROLLEntityColumns, doc);
    buildComments(group.comments, doc);
};

export { EROLLEntityApplet as default, EROLLEntityApplet, EROLLEntityDocumentHandler }