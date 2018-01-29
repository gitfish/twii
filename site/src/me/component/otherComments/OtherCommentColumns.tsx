import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const PassengerTattoo: IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const SegmentTattoo: IColumn = {
    key: "SegmentTattoo",
    ariaLabel: "ST",
    name: "ST",
    fieldName: "SegmentTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const Type: IColumn = {
    key: "Type",
    ariaLabel: "SK Type",
    name: "SK Type",
    fieldName: "Type",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const Code: IColumn = {
    key: "Code",
    ariaLabel: "SK Code",
    name: "SK Code",
    fieldName: "Code",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FreeTextValue: IColumn = {
    key: "FreeTextValue",
    ariaLabel: "SK Free Text",
    name: "SK Free Text",
    fieldName: "FreeTextValue",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 500,
    maxWidth: 500
};

const otherCommentColumns : IColumn[] = [
    PassengerTattoo,
    SegmentTattoo,
    Type,
    Code,
    FreeTextValue
];

export {
    otherCommentColumns as default,
    otherCommentColumns,
    PassengerTattoo,
    SegmentTattoo,
    Type,
    Code,
    FreeTextValue
};

