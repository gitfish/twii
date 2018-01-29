import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import AirCargoActivityColumns from "../air/component/AirCargoActivityColumns";
import SeaCargoActivityColumns from "../sea/component/SeaCargoActivityColumns";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import { openActivityDetails as openAirActivityDetails } from "../air/AirCargoActions";
import { openActivityDetails as openSeaActivityDetails } from "../sea/SeaCargoActions";

class AirCargoActivityApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="air-cargo-activities" title="Air Cargo Activities">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={AirCargoActivityColumns} onItemInvoked={openAirActivityDetails} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const AirCargoActivityDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("Air Cargo Activities", doc);
    buildTable(group.items, AirCargoActivityColumns, doc);
    buildComments(group.comments, doc);
};

class SeaCargoActivityApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="sea-cargo-activities" title="Sea Cargo Activities">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={SeaCargoActivityColumns} onItemInvoked={openSeaActivityDetails} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const SeaCargoActivityDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("Sea Cargo Activities", doc);
    buildTable(group.items, SeaCargoActivityColumns, doc);
    buildComments(group.comments, doc);
};

export { AirCargoActivityApplet, SeaCargoActivityApplet, AirCargoActivityDocumentHandler, SeaCargoActivityDocumentHandler }