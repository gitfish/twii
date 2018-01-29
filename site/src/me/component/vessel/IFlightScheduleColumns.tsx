import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";
import IVesselItinerary from "risk/traveller/vessel/response/IVesselItinerary";

const BorderPortInd : IColumn = {
    key: "BorderPortInd",
    ariaLabel: "Border Ind",
    name: "Border Ind",
    fieldName: "BorderPortInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 50,
};

const RouteID : IColumn = {
    key: "RouteId",
    ariaLabel: "RouteID",
    name: "Route ID",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const FullRountingText : IColumn = {
    key: "FullRountingText",
    ariaLabel: "Full Route",
    name: "Full Route",
    fieldName: "FullRoute",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150,
};

const LocalPortCode : IColumn = {
    key: "LocalPortCode",
    ariaLabel: "Local Port",
    name: "Local Port",
    fieldName: "LocalPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
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

const LocalScheduledDate: IColumn = {
    key: "LocalScheduledDate",
    ariaLabel: "Local Scheduled Date",
    name: "Local Scheduled Date",
    fieldName: "LocalScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: IVesselItinerary) => {
        return DateUtils.dateToOutputText(item.LocalScheduledDate);
    }
};

const LocalScheduledDayOfWeek : IColumn = {
    key: "LocalScheduledDayOfWeek",
    ariaLabel: "Day Of Week",
    name: "Day Of Week",
    fieldName: "LocalScheduledDayOfWeek",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
};

const ForeignPortCode : IColumn = {
    key: "ForeignPortCode",
    ariaLabel: "Foreign Port",
    name: "Foreign Port",
    fieldName: "ForeignPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const DepartureDateTime: IColumn = {
    key: "DepartureDateTime",
    ariaLabel: "Dep Date",
    name: "Dep Date",
    fieldName: "DepartureDateTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: IVesselItinerary) => {
        return DateUtils.dateToTimestampOutputText(item.DepartureDateTime);
    }
};

const CanberraDepartureDateTime: IColumn = {
    key: "CanberraDepartureDateTime",
    ariaLabel: "Cbr Dep Date",
    name: "Cbr Dep Date",
    fieldName: "CanberraDepartureDateTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: IVesselItinerary) => {
        return DateUtils.dateToTimestampOutputText(item.CanberraDepartureDateTime);
    }
};

const DeparturePortCode : IColumn = {
    key: "DeparturePortCode",
    ariaLabel: "Dep Port",
    name: "Dep Port",
    fieldName: "DeparturePortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const DeparturePortCountryCode : IColumn = {
    key: "DeparturePortCountryCode",
    ariaLabel: "Dep Country",
    name: "Dep Country",
    fieldName: "DeparturePortCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const CanberraArrivalDateTime: IColumn = {
    key: "CanberraArrivalDateTime",
    ariaLabel: "Cbr Arrival Date",
    name: "Cbr Arrival Date",
    fieldName: "CanberraArrivalDateTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: IVesselItinerary) => {
        return DateUtils.dateToTimestampOutputText(item.CanberraArrivalDateTime);
    }
};

const ArrivalPortCode : IColumn = {
    key: "ArrivalPortCode",
    ariaLabel: "Arrival Port",
    name: "Arrival Port",
    fieldName: "ArrivalPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const ArrivalPortCountryCode : IColumn = {
    key: "ArrivalPortCountryCode",
    ariaLabel: "Arrival Country",
    name: "Arrival Country",
    fieldName: "ArrivalPortCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

// For Summary - Flight Schedule
const IFlightScheduleColumns : IColumn[] = [
    BorderPortInd,
    RouteID,
    FullRountingText,
    LocalPortCode,
    DirectionCode,
    LocalScheduledDate,
    LocalScheduledDayOfWeek,
    ForeignPortCode,
    DepartureDateTime,
    CanberraDepartureDateTime,
    DeparturePortCode,
    DeparturePortCountryCode,
    CanberraArrivalDateTime,
    ArrivalPortCode,
    ArrivalPortCountryCode
];

export {
    IFlightScheduleColumns as default,IFlightScheduleColumns,
    BorderPortInd,
    RouteID,
    FullRountingText,
    LocalPortCode,
    DirectionCode,
    LocalScheduledDate,
    LocalScheduledDayOfWeek,
    ForeignPortCode,
    DepartureDateTime,
    CanberraDepartureDateTime,
    DeparturePortCode,
    DeparturePortCountryCode,
    CanberraArrivalDateTime,
    ArrivalPortCode,
    ArrivalPortCountryCode
}