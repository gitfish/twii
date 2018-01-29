import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import ICheckinBoarding from "../../../risk/traveller/pnr/ICheckinBoarding";
import * as DateUtils from "../../../util/Date";

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
    minWidth: 60,
    maxWidth: 80,
};

const Route : IColumn = {
    key: "Route",
    ariaLabel: "Route",
    name: "Route",
    fieldName: "Route",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const RouteId : IColumn = {
    key: "RouteId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const DepartureLocal : IColumn = {
    key: "DepartureTimeStamp",
    ariaLabel: "Departure (Local)",
    name: "Departure (Local)",
    fieldName: "DepartureTimeStamp",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: ICheckinBoarding) => {
        return DateUtils.dateToOutputText(item.DepartureTimeStamp);
    }
};

const CheckinSurname : IColumn = {
    key: "familyName",
    ariaLabel: "Check-in Surname",
    name: "Check-in Surname",
    fieldName: "familyName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ICheckinBoarding) => {
        return item.CheckInInfo.personInfo.familyName;
    }
};

const CheckinGivenNames : IColumn = {
    key: "givenName",
    ariaLabel: "Check-in Given Names",
    name: "Check-in Given Names",
    fieldName: "givenName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: ICheckinBoarding) => {
        return item.CheckInInfo.personInfo.givenName;
    }
};

const CISeq : IColumn = {
    key: "CheckinSequence",
    ariaLabel: "Check-in Sequence",
    name: "Check-in Sequence",
    fieldName: "CheckinSequence",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 90,
    maxWidth: 100,
};

const CheckinDateTime : IColumn = {
    key: "CheckinDateTime",
    ariaLabel: "Check-in Date Time",
    name: "Check-in Date Time",
    fieldName: "CheckinDateTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ICheckinBoarding) => {
        return DateUtils.dateToOutputText(item.CheckInInfo.checkInDateTime);
    }
};

const CheckinAgent : IColumn = {
    key: "checkInAgent",
    ariaLabel: "Check-in Agent",
    name: "Check-in Agent",
    fieldName: "checkInAgent",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const CheckinCity : IColumn = {
    key: "checkInPortCode",
    ariaLabel: "Check-in City",
    name: "Check-in City",
    fieldName: "checkInPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const AllocSeat : IColumn = {
    key: "AllocatedSeat",
    ariaLabel: "Alloc Seat",
    name: "Alloc Seat",
    fieldName: "AllocatedSeat",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 110,
    maxWidth: 120,
};

const SeatReq : IColumn = {
    key: "RequestedSeat",
    ariaLabel: "Seat Request",
    name: "Seat Request",
    fieldName: "RequestedSeat",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 130,
};

const CabinClass : IColumn = {
    key: "CabinClass",
    ariaLabel: "Cabin Class",
    name: "Cabin Class",
    fieldName: "CabinClass",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 460,
    maxWidth: 480,
};

// For Booking Summary - Check In
const checkInColumns : IColumn[] = [
    PT,
    ST,
    Route,
    RouteId,
    DepartureLocal,
    CheckinSurname,
    CheckinGivenNames,
    CISeq,
    CheckinDateTime,
    CheckinAgent,
    CheckinCity,
    AllocSeat,
    SeatReq,
    CabinClass
];

export {
    checkInColumns as default,
    checkInColumns,
    PT,
    ST,
    Route,
    RouteId,
    DepartureLocal,
    CheckinSurname,
    CheckinGivenNames,
    CISeq,
    CheckinDateTime,
    CheckinAgent,
    CheckinCity,
    AllocSeat,
    SeatReq,
    CabinClass
};