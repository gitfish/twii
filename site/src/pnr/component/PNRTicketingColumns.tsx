import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import IPNRTicket from "../IPNRTicket";
import * as DateUtils from "util/Date";

const segmentTattoo : IColumn = {
    key: "segmentTattoo",
    fieldName: "segmentTattoo",
    name: "Segment Tattoo",
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

const passengerTattoo : IColumn = {
    key: "passengerTattoo",
    fieldName: "passengerTattoo",
    name: "Passenger Tattoo",
    minWidth: 100,
    isResizable: true
};

const familyName : IColumn = {
    key: "familyName",
    fieldName: "familyName",
    name: "Family Name",
    minWidth: 100,
    isResizable: true
};

const ticketNbr : IColumn = {
    key: "ticketNbr",
    fieldName: "ticketNbr",
    name: "Ticket Number",
    minWidth: 100,
    isResizable: true
};

const dataIndicator : IColumn = {
    key: "dataIndicator",
    fieldName: "dataIndicator",
    name: "Data Indicator",
    minWidth: 100,
    isResizable: true
};

const givenName : IColumn = {
    key: "givenName",
    fieldName: "givenName",
    name: "Given Name",
    minWidth: 100,
    isResizable: true
};

const pnrCreationTimestamp : IColumn = {
    key: "pnrCreationTimestamp",
    fieldName: "pnrCreationTimestamp",
    name: "PNR Creation Timestamp",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRTicket) {
        return DateUtils.dataTimestampToOutputText(item.pnrCreationTimestamp);
    }
};

const bookingSystemCode : IColumn = {
    key: "bookingSystemCode",
    fieldName: "bookingSystemCode",
    name: "Booking System Code",
    minWidth: 100,
    isResizable: true
};

const PNRTicketingColumns : IColumn[] = [
    segmentTattoo,
    recordLocator, 
    passengerTattoo, 
    familyName, 
    ticketNbr, 
    dataIndicator, 
    givenName, 
    pnrCreationTimestamp, 
    bookingSystemCode
];

export {
    PNRTicketingColumns as default,
    PNRTicketingColumns,
    segmentTattoo,
    recordLocator, 
    passengerTattoo, 
    familyName, 
    ticketNbr, 
    dataIndicator, 
    givenName, 
    pnrCreationTimestamp, 
    bookingSystemCode
}