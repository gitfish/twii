import {
    IColumn, 
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IAlertMovementInfo from "risk/traveller/iat/IAlertMovementInfo";
import * as DateUtils from "util/Date";

const LocalScheduledDate: IColumn = {
    key: "localScheduledDate",
    ariaLabel: "Local Scheduled Date",
    name: "Local Scheduled Date",
    fieldName: "localScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IAlertMovementInfo) => {
        return DateUtils.dateToOutputText(item.localScheduledDate);
    }
};

const LocalPortCode: IColumn = {
    key: "localPortCode",
    ariaLabel: "Local Port Code",
    name: "Local Port Code",
    fieldName: "localPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const AlertNumber: IColumn = {
    key: "alertNumber",
    ariaLabel: "Alert Number",
    name: "Alert Number",
    fieldName: "alertNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const MatchCategoryCode: IColumn = {
    key: "matchCategoryCode",
    ariaLabel: "Match Category Code",
    name: "Match Category Code",
    fieldName: "matchCategoryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const BIDSelectStatus: IColumn = {
    key: "BIDSelectStatus",
    ariaLabel: "BID Select Status",
    name: "BID Select Status",
    fieldName: "BIDSelectStatus",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FIDSelectStatus: IColumn = {
    key: "FIDSelectStatus",
    ariaLabel: "FID Select Status",
    name: "FID Select Status",
    fieldName: "FIDSelectStatus",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const ExpectedMovementIndicator: IColumn = {
    key: "ExpectedMovementIndicator",
    ariaLabel: "Expected Movement Indicator",
    name: "Expected Movement Indicator",
    fieldName: "ExpectedMovementIndicator",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1500,
    maxWidth: 1500
};

const PassengerTatoo : IColumn = {
    key: "passengerTatoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "passengerTatoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 60,
};

const IATTravellerId : IColumn = {
    key: "iatTravellerId",
    ariaLabel: "IAT Traveller ID",
    name: "IAT Traveller ID",
    fieldName: "iatTravellerId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1200,
};

const AirAlertHistoryColumns : IColumn[] = [
    PassengerTatoo,
    LocalScheduledDate,
    LocalPortCode,
    AlertNumber,
    MatchCategoryCode,
    BIDSelectStatus,
    FIDSelectStatus,
    ExpectedMovementIndicator
];

const CruiseAlertHistoryColumns : IColumn[] = [
    IATTravellerId,
    LocalScheduledDate,
    LocalPortCode,
    AlertNumber,
    MatchCategoryCode,
    BIDSelectStatus,
    FIDSelectStatus,
    ExpectedMovementIndicator
];

export {
    AirAlertHistoryColumns,
    CruiseAlertHistoryColumns,
    PassengerTatoo,
    IATTravellerId,
    LocalScheduledDate,
    LocalPortCode,
    AlertNumber,
    MatchCategoryCode,
    BIDSelectStatus,
    FIDSelectStatus,
    ExpectedMovementIndicator

 };