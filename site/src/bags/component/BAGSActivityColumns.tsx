import { IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import IBAGSActivity from "../IBAGSActivity";
import * as DateUtils from "util/Date";

const CraftMovementNumber : IColumn = {
    key: "craftMovementNumber",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "craftMovementNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 100
};

const CraftMovementDate : IColumn = {
    key: "craftMovementDate",
    ariaLabel: "Movement Date",
    name: "Movement Date",
    fieldName: "craftMovementDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true,
    minWidth: 40,
    maxWidth: 100,
    data: {
        getText: (item : IBAGSActivity) => {
            return DateUtils.dataToOutputText(item.craftMovementDate);
        }
    },
    onRender: (item :  IBAGSActivity) => {
        return DateUtils.dataToOutputText(item.craftMovementDate);
    }
};

const PortCode : IColumn = {
    key: "portCode",
    ariaLabel: "Port",
    name: "Port",
    fieldName: "portCode",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true
};

const DirectionCode : IColumn = {
    key: "directionCode",
    ariaLabel: "Direction",
    name: "Direction",
    fieldName: "directionCode",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ModeOfEntryType : IColumn = {
    key: "modeOfEntryType",
    ariaLabel: "Mode of Entry",
    name: "Mode of Entry",
    fieldName: "modeOfEntryType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TargetingMethod : IColumn = {
    key: "targetingMthdType",
    ariaLabel: "Targeting Method",
    name: "Targeting Method",
    fieldName: "targetingMthdType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const FindMethod : IColumn = {
    key: "findMethodType",
    ariaLabel: "Find Method",
    name: "Find Method",
    fieldName: "findMethodType",
    minWidth: 40,
    maxWidth: 100,
    isResizable: true,
    isMultiline: true,
    columnActionsMode:ColumnActionsMode.clickable
};

const BagLocation : IColumn = {
    key: "bagLocationType",
    ariaLabel: "Bag Location",
    name: "Bag Location",
    fieldName: "bagLocationType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExamResultType : IColumn = {
    key: "examinationResultType",
    ariaLabel: "Exam Result",
    name: "Exam Result",
    fieldName: "examinationResultType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ConcealmentMethod : IColumn = {
    key: "concealmentMthdType",
    ariaLabel: "Concealment Method",
    name: "Concealment Method",
    fieldName: "concealmentMthdType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TravellerType : IColumn = {
    key: "travellerType",
    ariaLabel: "Traveller Type",
    name: "Traveller Type",
    fieldName: "travellerType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExamSeverity : IColumn = {
    key: "bagsExamSeverityCategory",
    ariaLabel: "Exam Severity",
    name: "Exam Severity",
    fieldName: "bagsExamSeverityCategory",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const OutcomeType : IColumn = {
    key: "outcomeType",
    ariaLabel: "Outcome",
    name: "Outcome",
    fieldName: "outcomeType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ResultType : IColumn = {
    key: "resultType",
    ariaLabel: "Result",
    name: "Result",
    fieldName: "resultType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const BAGSActivityColumns : IColumn[] = [
    CraftMovementNumber,
    CraftMovementDate,
    PortCode,
    DirectionCode,
    ModeOfEntryType,
    TargetingMethod,
    FindMethod,
    BagLocation,
    ExamResultType,
    ConcealmentMethod,
    TravellerType,
    ExamSeverity,
    OutcomeType,
    ResultType
];

export {
    BAGSActivityColumns as default,
    BAGSActivityColumns,
    CraftMovementNumber,
    CraftMovementDate,
    PortCode,
    DirectionCode,
    TargetingMethod,
    FindMethod,
    BagLocation,
    ExamResultType,
    ConcealmentMethod,
    TravellerType,
    ExamSeverity,
    OutcomeType,
    ResultType
}