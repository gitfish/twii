import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const PT : IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 40,
};

const ST : IColumn = {
    key: "ST",
    ariaLabel: "ST",
    name: "ST",
    fieldName: "ST",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 60,
};

const Route : IColumn = {
    key: "Route",
    ariaLabel: "Route",
    name: "Route",
    fieldName: "Route",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 100,
};

const RouteId : IColumn = {
    key: "RouteId",
    ariaLabel: "Route Id",
    name: "Route Id",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const DepartureLocal : IColumn = {
    key: "DestinationPort",
    ariaLabel: "Departure (Local)",
    name: "Departure (Local)",
    fieldName: "DestinationPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const CheckinSurname : IColumn = {
    key: "CheckinSurname",
    ariaLabel: "Check-in Surname",
    name: "Check-in Surname",
    fieldName: "CheckinSurname",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 110,
    maxWidth: 110,
};

const CheckinGivenNames : IColumn = {
    key: "CheckinGivenNames",
    ariaLabel: "Check-in Given Names",
    name: "Check-in Given Names",
    fieldName: "CheckinGivenNames",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
};

const Bags : IColumn = {
    key: "BagsCount",
    ariaLabel: "Bags",
    name: "Bags",
    fieldName: "BagsCount",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const TotalWeight : IColumn = {
    key: "TotalWeight",
    ariaLabel: "Total Weight",
    name: "Total Weight",
    fieldName: "TotalWeight",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
};

const AverageWeight : IColumn = {
    key: "AvgWeight",
    ariaLabel: "Average Weight",
    name: "Average Weight",
    fieldName: "AvgWeight",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 130,
    maxWidth: 130,
};

const Bagtags : IColumn = {
    key: "Tags",
    ariaLabel: "Bagtags",
    name: "Bagtags",
    fieldName: "Tags",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 160,
    maxWidth: 160,
};

const BagBoard : IColumn = {
    key: "BoardingPort",
    ariaLabel: "Bag Board",
    name: "Bag Board",
    fieldName: "BoardingPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
};

const BagDest : IColumn = {
    key: "DestinationPort",
    ariaLabel: "Bag Dest",
    name: "Bag Dest",
    fieldName: "DestinationPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
};

const Interline : IColumn = {
    key: "InterlineInd",
    ariaLabel: "Interline",
    name: "Interline",
    fieldName: "InterlineInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const Pool : IColumn = {
    key: "PoolId",
    ariaLabel: "Pool",
    name: "Pool",
    fieldName: "PoolId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
};

const PooledPax : IColumn = {
    key: "PooledPax",
    ariaLabel: "Pooled Pax",
    name: "Pooled Pax",
    fieldName: "PooledPax",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 130,
    maxWidth: 130,
};

const HOP : IColumn = {
    key: "HOPInd",
    ariaLabel: "HOP",
    name: "HOP",
    fieldName: "HOPInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const baggageDetailsColumns : IColumn[] = [
    PT,
    ST,
    Route,
    RouteId,
    DepartureLocal,
    CheckinSurname,
    CheckinGivenNames,
    Bags,
    TotalWeight,
    AverageWeight,
    Bagtags,
    BagBoard,
    BagDest,
    Interline,
    Pool,
    PooledPax,
    HOP
];

export {
    baggageDetailsColumns as default,
    baggageDetailsColumns,
    PT,
    ST,
    Route,
    RouteId,
    DepartureLocal,
    CheckinSurname,
    CheckinGivenNames,
    Bags,
    TotalWeight,
    AverageWeight,
    Bagtags,
    BagBoard,
    BagDest,
    Interline,
    Pool,
    PooledPax,
    HOP
};