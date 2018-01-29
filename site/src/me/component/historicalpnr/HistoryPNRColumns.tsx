import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IHistoricalPNRRecord from "risk/traveller/pnr/IHistoricalPNRRecord";
import * as DateUtils from "../../../util/Date";
import MESummaryStore from "me/summary/MESummaryStore";
import METSPNRStore from "me/travellersummary/METSPNRStore";
import { Link } from "office-ui-fabric-react/lib/Link";
import IMESummaryModel from "../../summary/MESummaryModel";

const RESBio : IColumn = {
    key: "RESBio",
    ariaLabel: "Res Bio",
    name: "Res Bio",
    fieldName: "RESBio",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 180,
};

const PT : IColumn = {
    key: "PT",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PT",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 80,
};

const Carrier : IColumn = {
    key: "Carrier",
    ariaLabel: "Host Airline",
    name: "Host Airline",
    fieldName: "Carrier",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const PNRPushCount : IColumn = {
    key: "PNRPushCount",
    ariaLabel: "Number of Pushes",
    name: "Number of Pushes",
    fieldName: "PNRPushCount",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000,
};

const LastReceivedTimeStamp : IColumn = {
    key: "LastReceivedTimeStamp",
    ariaLabel: "Last Received Date",
    name: "Last Received Date",
    fieldName: "LastReceivedTimeStamp",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
    onRender: (item: IHistoricalPNRRecord) => {
        return DateUtils.dateToOutputText(item.LastReceivedTimeStamp);
    }

};

const RouteId : IColumn = {
    key: "RouteId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const DirectionCode : IColumn = {
    key: "DirectionCode",
    ariaLabel: "Direction",
    name: "Direction",
    fieldName: "DirectionCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const LocalPortCode : IColumn = {
    key: "LocalPortCode",
    ariaLabel: "Local Port",
    name: "Local Port",
    fieldName: "LocalPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150,
};

const LocalScheduledDate : IColumn = {
    key: "LocalScheduledDate",
    ariaLabel: "Local Scheduled Date",
    name: "Local Scheduled Date",
    fieldName: "LocalScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
    onRender: (item: IHistoricalPNRRecord) => {
        return DateUtils.dateToOutputText(item.LocalScheduledDate);
    }
};

const RecordLocator : IColumn = {
    key: "RecordLocator",
    ariaLabel: "Record Locator",
    name: "Record Locator",
    fieldName: "RecordLocator",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item : IHistoricalPNRRecord) => {
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            MESummaryStore.loadByHistoricalPNRItem(item);
            METSPNRStore.setVisibility(true);
        };
        return <Link onClick={_handleClick}>{ String(item.RecordLocator) }</Link>;
    }
};

const CreationTimeStamp : IColumn = {
    key: "CreationTimeStamp",
    ariaLabel: "PNR Creation Timestamp",
    name: "PNR Creation Timestamp",
    fieldName: "CreationTimeStamp",
    minWidth: 120,
    maxWidth: 150,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    onRender: (item: IHistoricalPNRRecord) => {
        return DateUtils.dateToOutputText(item.CreationTimeStamp);
    }
};

// For History PNR - Traveller Summary
const historyPNRColumns : IColumn[] = [
    PT,
    RESBio,
    Carrier,
    RecordLocator,
    CreationTimeStamp,
    LocalScheduledDate,
    LocalPortCode,
    DirectionCode,
    RouteId,
    LastReceivedTimeStamp,
    PNRPushCount
];

export {
    historyPNRColumns as default,
    historyPNRColumns,
    PT,
    RESBio,
    Carrier,
    RecordLocator,
    CreationTimeStamp,
    LocalScheduledDate,
    LocalPortCode,
    DirectionCode,
    RouteId,
    LastReceivedTimeStamp,
    PNRPushCount
};