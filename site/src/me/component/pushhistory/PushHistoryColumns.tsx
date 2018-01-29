import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IPNRPushHistory from "../../../risk/traveller/pnr/IPNRPushHistory";
import * as DateUtils from "../../../util/Date";

const Dir : IColumn = {
    key: "DirectionCode",
    ariaLabel: "Direction",
    name: "Direction",
    fieldName: "DirectionCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
};

const RouteID : IColumn = {
    key: "RouteId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 90,
    maxWidth: 100,
};

const LocalPort : IColumn = {
    key: "LocalPort",
    ariaLabel: "Local Port",
    name: "Local Port",
    fieldName: "LocalPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const Scheduled : IColumn = {
    key: "ScheduledDate",
    ariaLabel: "Scheduled",
    name: "Scheduled",
    fieldName: "ScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 140,
    maxWidth: 160,
    onRender: (item: IPNRPushHistory) => {
        return DateUtils.dateToOutputText(item.ScheduledDate);
    }
};

const PushType : IColumn = {
    key: "PushTypeCode",
    ariaLabel: "Push Type",
    name: "Push Type",
    fieldName: "PushTypeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
};

const PushNumber : IColumn = {
    key: "PushNumber",
    ariaLabel: "Push Number",
    name: "Push Number",
    fieldName: "PushNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const DateTimeReceived : IColumn = {
    key: "PNRReceivedTimeStamp",
    ariaLabel: "Date Time Received",
    name: "Date Time Received",
    fieldName: "PNRReceivedTimeStamp",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1200,
    maxWidth: 1200,
    onRender: (item: IPNRPushHistory) => {
        return DateUtils.dateToOutputText(item.PNRReceivedTimeStamp);
    }
};

const pushHistoryColumns : IColumn[] = [
    Dir,
    RouteID,
    LocalPort,
    Scheduled,
    PushType,
    PushNumber,
    DateTimeReceived
];

export {
    pushHistoryColumns as default,
    pushHistoryColumns,
    Dir,
    RouteID,
    LocalPort,
    Scheduled,
    PushType,
    PushNumber,
    DateTimeReceived
};