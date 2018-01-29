import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import IPNRTicketPayment from "../IPNRTicketPayment";
import * as DateUtils from "util/Date";

const bookingSystemCode : IColumn = {
    key: "bookingSystemCode",
    fieldName: "bookingSystemCode",
    name: "Booking System Code",
    minWidth: 100,
    isResizable: true
};

const recordLocator : IColumn = {
    key: "recordLocator",
    fieldName: "recordLocator",
    name: "Record Locator",
    minWidth: 100,
    isResizable: true
};

const pnrCreationTimestamp : IColumn = {
    key: "pnrCreationTimestamp",
    fieldName: "pnrCreationTimestamp",
    name: "PNR Creation Timestamp",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRTicketPayment) {
        return DateUtils.dataTimestampToOutputText(item.pnrCreationTimestamp);
    }
};

const amount : IColumn = {
    key: "amount",
    fieldName: "amount",
    name: "Amount",
    minWidth: 100,
    isResizable: true
};

const paymentModeCode : IColumn = {
    key: "paymentModeCode",
    fieldName: "paymentModeCode",
    name: "Payment Mode Code",
    minWidth: 100,
    isResizable: true
};

const currencyCode : IColumn = {
    key: "currencyCode",
    fieldName: "currencyCode",
    name: "Currency Code",
    minWidth: 100,
    isResizable: true
};

const tax : IColumn = {
    key: "tax",
    fieldName: "tax",
    name: "Tax",
    minWidth: 100,
    isResizable: true
};

const creditCardNbr : IColumn = {
    key: "creditCardNbr",
    fieldName: "creditCardNbr",
    name: "Credit Card Nbr",
    minWidth: 100,
    isResizable: true
};

const paymentType : IColumn = {
    key: "paymentType",
    fieldName: "paymentType",
    name: "Payment Type",
    minWidth: 100,
    isResizable: true
};

const creditCardName : IColumn = {
    key: "creditCardName",
    fieldName: "creditCardName",
    name: "Credit Card Name",
    minWidth: 100,
    isResizable: true
};

const pnrPaymentFreeText : IColumn = {
    key: "pnrPaymentFreeText",
    fieldName: "pnrPaymentFreeText",
    name: "PNR Payment Free Text",
    minWidth: 100,
    isResizable: true
};

const PNRTicketPaymentColumns : IColumn[] = [
    bookingSystemCode,
    recordLocator, 
    pnrCreationTimestamp, 
    amount, 
    paymentModeCode, 
    currencyCode, 
    tax, 
    creditCardNbr, 
    paymentType, 
    creditCardName, 
    pnrPaymentFreeText
];

export {
    PNRTicketPaymentColumns as default,
    PNRTicketPaymentColumns,
    bookingSystemCode,
    recordLocator, 
    pnrCreationTimestamp, 
    amount, 
    paymentModeCode, 
    currencyCode, 
    tax, 
    creditCardNbr, 
    paymentType, 
    creditCardName, 
    pnrPaymentFreeText
}