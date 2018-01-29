import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const FormOfPayment : IColumn = {
    key: "FormOfPayment",
    ariaLabel: "Form of Payment",
    name: "Form of Payment",
    fieldName: "FormOfPayment",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150,
};

const Type : IColumn = {
    key: "Type",
    ariaLabel: "Type",
    name: "Type",
    fieldName: "Type",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
};

const Amount : IColumn = {
    key: "Amount",
    ariaLabel: "Amount",
    name: "Amount",
    fieldName: "Amount",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 150,
    maxWidth: 160,
};

const Tax : IColumn = {
    key: "Tax",
    ariaLabel: "Tax",
    name: "Tax",
    fieldName: "Tax",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 140,
    maxWidth: 180,
};

const CreditCardNumber : IColumn = {
    key: "CreditCardNumber",
    ariaLabel: "Credit Card Number",
    name: "Credit Card Number",
    fieldName: "CreditCardNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 140,
    maxWidth: 160,
};

const CreditCardName : IColumn = {
    key: "CreditCardName",
    ariaLabel: "Credit Card Name",
    name: "Credit Card Name",
    fieldName: "CreditCardName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 150,
    maxWidth: 180,
};

const Currency : IColumn = {
    key: "Currency",
    ariaLabel: "Currency",
    name: "Currency",
    fieldName: "Currency",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 160,
    maxWidth: 180,
};

const FreeTextValue : IColumn = {
    key: "FreeTextValue",
    ariaLabel: "PNR Pay Free Text",
    name: "PNR Pay Free Text",
    fieldName: "FreeTextValue",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000,
};

const paymentColumns : IColumn[] = [
    FormOfPayment,
    Type,
    Amount,
    Tax,
    CreditCardNumber,
    CreditCardName,
    Currency,
    FreeTextValue
];

export {
    paymentColumns as default,
    paymentColumns,
    FormOfPayment,
    Type,
    Amount,
    Tax,
    CreditCardNumber,
    CreditCardName,
    Currency,
    FreeTextValue
};