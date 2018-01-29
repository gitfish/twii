import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IBagsExamResultInfo from "risk/traveller/iat/IBagsExamResultInfo";
import * as DateUtils from "util/Date";

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
    minWidth: 120,
    maxWidth: 140,
};

const localScheduledDate: IColumn = {
    key: "localScheduledDate",
    ariaLabel: "Local Scheduled Date",
    name: "Local Scheduled Date",
    fieldName: "localScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    data : {
        getText (item: IBagsExamResultInfo) {
                return DateUtils.dateToOutputText(item.localScheduledDate);
            }
        },
    onRender: (item: IBagsExamResultInfo) => {
        return DateUtils.dateToOutputText(item.localScheduledDate);
    }
};

const routeId: IColumn = {
    key: "routeId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "routeId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const examinationNbr: IColumn = {
    key: "examinationNbr",
    ariaLabel: "Exam Number",
    name: "Exam Number",
    fieldName: "examinationNbr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const targettingMethod: IColumn = {
    key: "targettingMethod",
    ariaLabel: "Targeting Method",
    name: "Targeting Method",
    fieldName: "targettingMethod",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const alertNumber: IColumn = {
    key: "alertNumber",
    ariaLabel: "Alert Number",
    name: "Alert Number",
    fieldName: "alertNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const highestResultsType: IColumn = {
    key: "highestResultsType",
    ariaLabel: "Highest Results Type",
    name: "Highest Results Type",
    fieldName: "highestResultsType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const examinationResultType: IColumn = {
    key: "examinationResultType",
    ariaLabel: "Exam Result Type",
    name: "Exam Result Type",
    fieldName: "examinationResultType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const findMethod: IColumn = {
    key: "findMethod",
    ariaLabel: "Find Method",
    name: "Find Method",
    fieldName: "findMethod",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const baggageLocation: IColumn = {
    key: "baggageLocation",
    ariaLabel: "Bag Location",
    name: "Bag Location",
    fieldName: "baggageLocation",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const notes: IColumn = {
    key: "notes",
    ariaLabel: "Notes",
    name: "Notes",
    fieldName: "notes",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const outcomeType: IColumn = {
    key: "outcomeType",
    ariaLabel: "Outcome Type",
    name: "Outcome Type",
    fieldName: "outcomeType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const quantityValue: IColumn = {
    key: "quantityValue",
    ariaLabel: "Quantity Value",
    name: "Quantity Value",
    fieldName: "quantityValue",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const quantityUnit: IColumn = {
    key: "quantityUnit",
    ariaLabel: "Quantity Unit",
    name: "Quantity Unit",
    fieldName: "Quantity Unit",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000
};

const AirBagExamsResultColumns : IColumn[] = [
    PassengerTatoo,
    localScheduledDate,
    routeId,
    examinationNbr,
    targettingMethod,
    alertNumber,
    highestResultsType,
    examinationResultType,
    findMethod,
    baggageLocation,
    notes,
    outcomeType,
    quantityValue,
    quantityUnit
];

const CruiseBagExamsResultColumns : IColumn[] = [
    IATTravellerId,
    localScheduledDate,
    routeId,
    examinationNbr,
    targettingMethod,
    alertNumber,
    highestResultsType,
    examinationResultType,
    findMethod,
    baggageLocation,
    notes,
    outcomeType,
    quantityValue,
    quantityUnit
];

export {
    AirBagExamsResultColumns,
    CruiseBagExamsResultColumns,
    PassengerTatoo,
    IATTravellerId,
    localScheduledDate,
    routeId,
    examinationNbr,
    targettingMethod,
    alertNumber,
    highestResultsType,
    examinationResultType,
    findMethod,
    baggageLocation,
    notes,
    outcomeType,
    quantityValue,
    quantityUnit

};

