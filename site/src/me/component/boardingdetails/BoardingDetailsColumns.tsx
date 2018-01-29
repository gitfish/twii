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
    maxWidth: 80,
};

const ST : IColumn = {
    key: "ST",
    ariaLabel: "ST",
    name: "ST",
    fieldName: "ST",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 80,
};

const SepSeat : IColumn = {
    key: "SeparateSeatInd",
    ariaLabel: "Sep Seat",
    name: "Sep Seat",
    fieldName: "SeparateSeatInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 50,
    maxWidth: 80,
};

const SeatBoard : IColumn = {
    key: "SeatBoardingPort",
    ariaLabel: "Seat Board",
    name: "Seat Board",
    fieldName: "SeatBoardingPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const SeatDest : IColumn = {
    key: "SeatDestinationPort",
    ariaLabel: "Seat Dest",
    name: "Seat Dest",
    fieldName: "SeatDestinationPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 90,
    maxWidth: 90,
};

const BoardingStatus : IColumn = {
    key: "BoardingStatus",
    ariaLabel: "Boarding Status",
    name: "Boarding Status",
    fieldName: "BoardingStatus",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const GOSHO : IColumn = {
    key: "GoShowInd",
    ariaLabel: "GOSHO",
    name: "GOSHO",
    fieldName: "GoShowInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
};

const NOSHO : IColumn = {
    key: "NoShowInd",
    ariaLabel: "NOSHO",
    name: "NOSHO",
    fieldName: "NoShowInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1300,
    maxWidth: 1300,
};

const boardingDetailsColumns : IColumn[] = [
    PT,
    ST,
    SepSeat,
    SeatBoard,
    SeatDest,
    BoardingStatus,
    GOSHO,
    NOSHO
];

export {
    boardingDetailsColumns as default,
    boardingDetailsColumns,
    PT,
    ST,
    SepSeat,
    SeatBoard,
    SeatDest,
    BoardingStatus,
    GOSHO,
    NOSHO

};