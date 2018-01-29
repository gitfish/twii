import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import IPNRSearchResult from "../IPNRSearchResult";
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
    onRender(item : IPNRSearchResult) {
        return DateUtils.dataTimestampToOutputText(item.pnrCreationTimestamp);
    }
};

const firstILocalPortCode : IColumn = {
    key: "firstILocalPortCode",
    fieldName: "firstILocalPortCode",
    name: "First Inbound Local Port Code",
    minWidth: 100,
    isResizable: true
};

const firstILocalScheduleDate : IColumn = {
    key: "firstILocalScheduledDate",
    fieldName: "firstILocalScheduledDate",
    name: "First Inbound Local Scheduled Date",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRSearchResult) {
        return DateUtils.dataToOutputText(item.firstILocalScheduledDate);
    }
};

const firstIRouteId : IColumn = {
    key: "firstIRouteId",
    fieldName: "firstIRouteId",
    name: "First Inbound Route Id",
    minWidth: 100,
    isResizable: true
};

const firstIForeignPortCode : IColumn = {
    key: "firstIForeignPortCode",
    fieldName: "firstIForeignPortCode",
    name: "First Inbound Foreign Port Code",
    minWidth: 100,
    isResizable: true
};

const intentToTravelDate : IColumn = {
    key: "intentToTravelDate",
    fieldName: "intentToTravelDate",
    name: "Intent to Travel Date",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRSearchResult) {
        return DateUtils.dataToOutputText(item.intentToTravelDate);
    }
};

const intentToTravelEndDate : IColumn = {
    key: "intentToTravelEndDate",
    fieldName: "intentToTravelEndDate",
    name: "Intent to Travel End Date",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRSearchResult) {
        return DateUtils.dataToOutputText(item.intentToEndTravelDate);
    }
}

const firstOLocalScheduleDate : IColumn = {
    key: "firstOLocalScheduledDate",
    fieldName: "firstOLocalScheduledDate",
    name: "First Outbound Local Scheduled Date",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRSearchResult) {
        return DateUtils.dataToOutputText(item.firstOLocalScheduledDate);
    }
};

const firstOForeignPortCode : IColumn = {
    key: "firstOForeignPortCode",
    fieldName: "firstOForeignPortCode",
    name: "First Outbound Foreign Port Code",
    minWidth: 100,
    isResizable: true
};

const firstOLocalPortCode : IColumn = {
    key: "firstOLocalPortCode",
    fieldName: "firstOLocalPortCode",
    name: "First Outbound Local Port Code",
    minWidth: 100,
    isResizable: true
};

const firstORouteId : IColumn = {
    key: "firstORouteId",
    fieldName: "firstORouteId",
    name: "First Outbound Route Id",
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

const givenNames : IColumn = {
    key: "givenNames",
    fieldName: "givenNames",
    name: "Given Name(s)",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRSearchResult) {
        return item.givenNames || item.givenName;
    }
};

const familyName : IColumn = {
    key: "familyName",
    fieldName: "familyName",
    name: "Family Name(s)",
    minWidth: 100,
    isResizable: true
};

const gender : IColumn = {
    key: "gender",
    fieldName: "gender",
    name: "Gender",
    minWidth: 100,
    isResizable: true
};

const dateOfBirth : IColumn = {
    key: "dateOfBirth",
    fieldName: "dateOfBirth",
    name: "Date of Birth",
    minWidth: 100,
    isResizable: true,
    onRender(item : IPNRSearchResult) {
        return DateUtils.dataToOutputText(item.dateOfBirth);
    }
};

const travelDocumentNbr : IColumn = {
    key: "travelDocumentNbr",
    fieldName: "travelDocumentNbr",
    name: "Travel Document Number",
    minWidth: 100,
    isResizable: true
};

const countryOfIssue : IColumn = {
    key: "countryOfIssue",
    fieldName: "countryOfIssue",
    name: "Country of Issue",
    minWidth: 100,
    isResizable: true
};

const documentFreeText : IColumn = {
    key: "documentFreeText",
    fieldName: "documentFreeText",
    name: "Document Free Text",
    minWidth: 100,
    isResizable: true
};

const PNRSearchResultColumns : IColumn[] = [
    bookingSystemCode,
    recordLocator,
    pnrCreationTimestamp,
    firstILocalPortCode,
    firstILocalScheduleDate,
    firstIRouteId,
    firstIForeignPortCode,
    firstOLocalScheduleDate,
    firstOForeignPortCode,
    firstOLocalPortCode,
    firstORouteId,
    intentToTravelDate,
    intentToTravelEndDate,
    passengerTattoo,
    givenNames,
    familyName,
    dateOfBirth,
    gender,
    travelDocumentNbr,
    countryOfIssue,
    documentFreeText
];

export {
    PNRSearchResultColumns as default,
    PNRSearchResultColumns,
    bookingSystemCode,
    recordLocator,
    pnrCreationTimestamp,
    firstILocalPortCode,
    firstILocalScheduleDate,
    firstIRouteId,
    firstIForeignPortCode,
    firstOLocalScheduleDate,
    firstOForeignPortCode,
    firstOLocalPortCode,
    firstORouteId,
    intentToTravelDate,
    intentToTravelEndDate,
    passengerTattoo,
    givenNames,
    familyName,
    dateOfBirth,
    gender,
    travelDocumentNbr,
    countryOfIssue,
    documentFreeText
}