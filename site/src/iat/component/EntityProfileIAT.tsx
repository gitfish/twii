import * as React from "react";
import IEntityProfileSourceGroupProps from "entity/profile/component/IEntityProfileSourceGroupProps";
import EntityProfileSourceGroupDetailsList from "entity/profile/component/EntityProfileSourceGroupDetailsList";
import EntityProfileSourceGroupDetails from "entity/profile/component/EntityProfileSourceGroupDetails";
import { IEntityProfileDocumentHandler } from "entity/profile/IEntityProfileDocumentHandler";
import { buildSectionHeader, buildSectionSubHeader, buildTable, buildComments } from "entity/profile/EntityProfileDocumentHelper";
import IATMovementColumns from "./IATMovementColumns";
import IATMovementViewPrefsStore from "../IATMovementsViewPrefsStore";
import IATFlightListStore from "../IATFlightListStore";
import IATAssociatedActivityColumnsList from "./IATAssociatedActivityColumnsList";
import { getViewPreferenceColumns } from "common/component/ColumnHelper";
import { openMovementDetails } from "../IATActions";

class IATMovementApplet extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        return (
            <EntityProfileSourceGroupDetails {...this.props} className="iat-movements" title="IAT Movements">
                <EntityProfileSourceGroupDetailsList group={this.props.group} columns={IATMovementColumns} viewPreferences={IATMovementViewPrefsStore} onItemInvoked={openMovementDetails} />
            </EntityProfileSourceGroupDetails>
        );
    }
}

const IATMovementDocumentHandler : IEntityProfileDocumentHandler = props => {
    const doc = props.doc;
    const group = props.group;

    buildSectionHeader("IAT Movements", doc);
    buildTable(group.items, getViewPreferenceColumns(IATMovementColumns, IATMovementViewPrefsStore), doc);
    return IATFlightListStore.loadForMovements(group.source.entitySource.masterEntity, group.items).then(() => {
        const associatedTravellers = IATFlightListStore.associatedTravellers || [];
        if(associatedTravellers.length > 0) {
            buildSectionSubHeader("Associated Travellers", doc);
            buildTable(associatedTravellers, IATAssociatedActivityColumnsList, doc);
        }
        buildComments(group.comments, doc);
    }).catch((error) => {
        console.log("Error getting associated traveller information");
        buildComments(group.comments, doc);
    });
    
};

export { IATMovementApplet as default, IATMovementApplet, IATMovementDocumentHandler }