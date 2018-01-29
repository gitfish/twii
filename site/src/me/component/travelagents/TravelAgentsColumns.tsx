import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const TravelAgency : IColumn = {
    key: "AgentName",
    ariaLabel: "Travel Agency",
    name: "Travel Agency",
    fieldName: "AgentName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 200,
    maxWidth: 300,
};

const Location : IColumn = {
    key: "Location",
    ariaLabel: "Location",
    name: "Location",
    fieldName: "Location",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 140,
    maxWidth: 160,
};

const AgentName : IColumn = {
    key: "AgentContactName",
    ariaLabel: "Agent Name",
    name: "Agent Name",
    fieldName: "AgentContactName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 180,
    maxWidth: 200,
};

const IATACode : IColumn = {
    key: "IATAAgentCode",
    ariaLabel: "IATA Code",
    name: "IATA Code",
    fieldName: "IATAAgentCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 200,
    maxWidth: 200,
};

const RoleTypeCode : IColumn = {
    key: "RoleTypeCode",
    ariaLabel: "Role Type Code",
    name: "Role Type Code",
    fieldName: "RoleTypeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1100,
    maxWidth: 1100,
};

const travelAgentsColumns : IColumn[] = [
    TravelAgency,
    Location,
    AgentName,
    IATACode,
    RoleTypeCode
];

export {
    travelAgentsColumns as default,
    travelAgentsColumns,
    TravelAgency,
    Location,
    AgentName,
    IATACode,
    RoleTypeCode
};