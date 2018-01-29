import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const PassengerTattoo : IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
};
const ST : IColumn = {
    key: "ST",
    ariaLabel: "ST",
    name: "ST",
    fieldName: "ST",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};
const Type : IColumn = {
    key: "Type",
    ariaLabel: "Contact Type",
    name: "Contact Type",
    fieldName: "Type",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 200,
    maxWidth: 250,
};

const FreeTextValue : IColumn = {
    key: "FreeTextValue",
    ariaLabel: "Contact Details",
    name: "Contact Details",
    fieldName: "FreeTextValue",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1500,
    maxWidth: 1500,
};


const travellersContactColumns : IColumn[] = [
    PassengerTattoo,
    ST,
    Type,
    FreeTextValue
];

export {
    travellersContactColumns as default,
    travellersContactColumns,
    PassengerTattoo,
    ST,
    Type,
    FreeTextValue
};
