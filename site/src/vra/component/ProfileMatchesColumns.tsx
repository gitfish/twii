import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const ProfileId: IColumn = {
    key: "profileId",
    ariaLabel: "Profile ID",
    name: "Profile ID",
    fieldName: "profileId",
    minWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ProfileDescription: IColumn = {
    key: "profileDescription",
    ariaLabel: "Profile Description",
    name: "Profile Description",
    fieldName: "profileDescription",
    minWidth: 300,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const AlertMessage: IColumn = {
    key: "alertMessage",
    ariaLabel: "Alert Message",
    name: "Alert Message",
    fieldName: "alertMessage",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 300
};

const Threat: IColumn = {
    key: "threat",
    ariaLabel: "Threat",
    name: "Threat",
    fieldName: "threat",
    minWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ThresholdScore: IColumn = {
    key: "thresholdScore",
    ariaLabel: "Threshold",
    name: "Threshold",
    fieldName: "thresholdScore",
    minWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const SourceSystem: IColumn = {
    key: "sourceSystem",
    ariaLabel: "Source System",
    name: "Source System",
    fieldName: "sourceSystem",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const RiskTier: IColumn = {
    key: "riskTier",
    ariaLabel: "Risk Rating",
    name: "Risk Rating",
    fieldName: "riskTier",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ProfileMatchesColumns : IColumn[] = [
    ProfileId,
    ProfileDescription,
    AlertMessage,
    Threat,
    ThresholdScore,
    SourceSystem,
    RiskTier
];

export { ProfileMatchesColumns as default, ProfileMatchesColumns, ThresholdScore }