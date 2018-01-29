import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import EXAMSActivityColumns from "./EXAMSActivityColumns";

class EXAMSActivityApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="exams-activities" title="EXAMS Activities">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={EXAMSActivityColumns} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const EXAMSActivityDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("EXAMS Activities", doc);
    buildTable(group.items, EXAMSActivityColumns, doc);
    buildComments(group.comments, doc);
};

export { EXAMSActivityApplet as default, EXAMSActivityApplet, EXAMSActivityDocumentHandler }