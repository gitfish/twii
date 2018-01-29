import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";
import IINTCPMovement from "../IINTCPMovement";

const SubjectID : IColumn = {
    key: "targetSubjectId",
    ariaLabel: "Subject ID",
    name: "Subject ID",
    fieldName: "targetSubjectId",
    minWidth: 30,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const SequenceNumber : IColumn = {
    key: "sequenceNumber",
    ariaLabel: "Sequence Number",
    name: "Sequence Number",
    fieldName: "sequenceNumber",
    minWidth: 30,
    maxWidth: 54,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const OccurredPort : IColumn = {
    key: "portNameWhereOccurred",
    ariaLabel: "Inward Movement Port",
    name: "Inward Movement Port",
    fieldName: "portNameWhereOccurred",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 100
};

const AtPortDate : IColumn = {
    key: "atPortDate",
    ariaLabel: "Outward Movement Date",
    name: "Outward Movement Date",
    fieldName: "atPortDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 95,
    data: {
        getText(item : IINTCPMovement) {
            return DateUtils.dataToOutputText(item.atPortDate);
        }
    },
    onRender: (item: IINTCPMovement) => {
        return DateUtils.dataToOutputText(item.atPortDate);
    }
};

const MovementInType : IColumn = {
    key: "movementInType",
    ariaLabel: "Inward Movement Type",
    name: "Inward Movement Type",
    fieldName: "movementInType",
    minWidth: 30,
    maxWidth: 95,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true
};

const MovementOutType : IColumn = {
    key: "movementOutType",
    ariaLabel: "Outward Movement Type",
    name: "Outward Movement Type",
    fieldName: "movementOutType",
    minWidth: 30,
    maxWidth: 110,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const DepartureDate : IColumn = {
    key: "departureDate",
    ariaLabel: "Inward Movement Date",
    name: "Inward Movement Date",
    fieldName: "departureDate",
    minWidth: 30,
    maxWidth: 95,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IINTCPMovement) {
            return DateUtils.dataToOutputText(item.departureDate);
        }
    },
    onRender: (item: IINTCPMovement) => {
        return DateUtils.dataToOutputText(item.departureDate);
    }
};

const OutwardsPort : IColumn = {
    key: "outwardPortName",
    ariaLabel: "Outward Movement Port",
    name: "Outward Movement Port",
    fieldName: "outwardPortName",
    minWidth: 40,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const NextPort : IColumn = {
    key: "nextPortName",
    ariaLabel: "Next Port",
    name: "Next Port",
    fieldName: "nextPortName",
    minWidth: 40,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const CraftName : IColumn = {
    key: "craftName",
    ariaLabel: "Craft Name",
    name: "Craft Name",
    fieldName: "craftName",
    minWidth: 30,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const LloydsNumber : IColumn = {
    key: "lloydsNumber",
    ariaLabel: "Lloyds Number",
    name: "Lloyds Number",
    fieldName: "lloydsNumber",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
};

const VesselType : IColumn = {
    key: "vesselType",
    ariaLabel: "Vessel Type",
    name: "Vessel Type",
    fieldName: "vesselType",
    minWidth: 40,
    maxWidth: 75,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const RelationshipClass : IColumn = {
    key: "relationshipClass",
    ariaLabel: "Relationship Class",
    name: "Relationship Class",
    fieldName: "relationshipClass",
    minWidth: 40,
    maxWidth: 75,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const RelationshipType : IColumn = {
    key: "relationshipType",
    ariaLabel: "Relationship Type",
    name: "Relationship Type",
    fieldName: "relationshipType",
    minWidth: 40,
    maxWidth: 75,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TravelDocNumber : IColumn = {
    key: "travelDocumentNumber",
    ariaLabel: "Travel Doc Number",
    name: "Travel Doc Number",
    fieldName: "travelDocumentNumber",
    minWidth: 40,
    maxWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TravelDocType : IColumn = {
    key: "travelDocumentType",
    ariaLabel: "Travel Doc Type",
    name: "Travel Doc Type",
    fieldName: "travelDocumentType",
    minWidth: 40,
    maxWidth: 50,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExpectedOrConfirmedInd : IColumn = {
    key: "expectedOrConfirmedInd",
    ariaLabel: "Expected / Confirmed",
    name: "Expected / Confirmed",
    fieldName: "expectedOrConfirmedInd",
    minWidth: 40,
    maxWidth: 50,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const INTCPMovementColumns : IColumn[] = [
    SubjectID,
    SequenceNumber,
    MovementInType,
    DepartureDate,
    OccurredPort,
    MovementOutType,
    AtPortDate,
    OutwardsPort,
    NextPort,
    CraftName,
    LloydsNumber,
    VesselType,
    RelationshipClass,
    RelationshipType,
    TravelDocNumber,
    TravelDocType,
    ExpectedOrConfirmedInd
];

export {
    INTCPMovementColumns as default,
    INTCPMovementColumns,
    SubjectID,
    SequenceNumber,
    OccurredPort,
    AtPortDate,
    MovementInType,
    MovementOutType,
    DepartureDate,
    OutwardsPort,
    NextPort,
    CraftName,
    LloydsNumber,
    VesselType,
    RelationshipClass,
    RelationshipType,
    TravelDocNumber,
    TravelDocType,
    ExpectedOrConfirmedInd
}