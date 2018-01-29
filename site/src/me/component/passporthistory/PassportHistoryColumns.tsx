import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IPassportInfo from "risk/traveller/iat/common/IPassportInfo";
import * as DateUtils from "../../../util/Date";
import * as StringUtils from "util/String";

const PassengerTatoo : IColumn = {
    key: "passengerTatoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "passengerTatoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 60,
};

const ResBio : IColumn = {
    key: "resBio",
    ariaLabel: "Res Bio",
    name: "Res Bio",
    fieldName: "resBio",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 200,
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

const TravelDocId : IColumn = {
    key: "travelDocId",
    ariaLabel: "Travel Doc ID",
    name: "Travel Doc ID",
    fieldName: "travelDocId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
    onRender: (item: IPassportInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocId ? item.travelDocInfo.travelDocId : "" : "";
    }
};

const TravelDocCountryCode : IColumn = {
    key: "travelDocCountryCode",
    ariaLabel: "Travel Doc Country",
    name: "Travel Doc Country",
    fieldName: "travelDocCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: IPassportInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocCountryCode ? item.travelDocInfo.travelDocCountryCode : "" : "";
    }
};

const TravelDocTypeCode : IColumn = {
    key: "travelDocTypeCode",
    ariaLabel: "Travel Doc Type Code",
    name: "Travel Doc Type Code",
    fieldName: "travelDocTypeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: IPassportInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocTypeCode ? item.travelDocInfo.travelDocTypeCode : "" : "";
    }
};

const TravelDocSequenceNbr : IColumn = {
    key: "travelDocSequenceNbr",
    ariaLabel: "Travel Doc Sequence Nbr",
    name: "Person Sequence",
    fieldName: "travelDocSequenceNbr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 500,
    maxWidth: 500,
    onRender: (item: IPassportInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocSequenceNbr ? item.travelDocInfo.travelDocSequenceNbr : "" : "";
    }
};

const IssueCountryCode : IColumn = {
    key: "issueCountryCode",
    ariaLabel: "Issue Country Code",
    name: "Issue Country Code",
    fieldName: "issueCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IPassportInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.issueCountryCode ? item.travelDocInfo.issueCountryCode : "" : "";
    }
};

const TravelDocExpiryDate : IColumn = {
    key: "travelDocExpiryDate",
    ariaLabel: "Travel Doc Expiry Date",
    name: "Passport Expiry Date",
    fieldName: "travelDocExpiryDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: IPassportInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocExpiryDate ? DateUtils.dateToOutputText(item.travelDocInfo.travelDocExpiryDate) : "" : "";
    }
};

const DepartmentRunNbr : IColumn = {
    key: "departmentRunNbr",
    ariaLabel: "Department Run Nbr",
    name: "Department Run Nbr",
    fieldName: "departmentRunNbr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150,
};

const DocumentImpoundIndicator : IColumn = {
    key: "documentImpoundIndicator",
    ariaLabel: "Document Impound Ind",
    name: "Document Impound Ind",
    fieldName: "documentImpoundIndicator",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150,
    onRender: (item: IPassportInfo) => {
    return item.documentImpoundIndicator ? StringUtils.equalsIgnoreCase(item.documentImpoundIndicator, "y") ? "True" : "False" : "";
    }
};

const ImmigrationDirectiveCode : IColumn = {
    key: "immigrationDirectiveCode",
    ariaLabel: "Immigration Directive Code",
    name: "Immigration Directive Code",
    fieldName: "immigrationDirectiveCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150
};

const LastUpdateDate : IColumn = {
    key: "lastUpdateDate",
    ariaLabel: "Last Update Date",
    name: "Last Update Date",
    fieldName: "lastUpdateDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: IPassportInfo) => {
        return item.lastUpdateDate ? DateUtils.dateToOutputText(item.lastUpdateDate) : "";
    }
};

const PassportIssueDate : IColumn = {
    key: "passportIssueDate",
    ariaLabel: "Passport Issue Date",
    name: "Passport Issue Date",
    fieldName: "passportIssueDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: IPassportInfo) => {
        return item.lastUpdateDate ? DateUtils.dateToOutputText(item.passportIssueDate) : "";
    }
};

const PassportIssueOfficeCode : IColumn = {
    key: "passportIssueOfficeCode",
    ariaLabel: "Passport Issue Office Code",
    name: "Issue Office Code",
    fieldName: "passportIssueOfficeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150
};

const PassportStatusCode : IColumn = {
    key: "passportStatusCode",
    ariaLabel: "Passport Status Code",
    name: "Passport Status Code",
    fieldName: "passportStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150
};

const PassportTypeCode : IColumn = {
    key: "PassportTypeCode",
    ariaLabel: "Passport Type Code",
    name: "Passport Type Code",
    fieldName: "passportTypeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150
};

const SourceSystemCode : IColumn = {
    key: "sourceSystemCode",
    ariaLabel: "Source System Code",
    name: "Source System Code",
    fieldName: "sourceSystemCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000
};

const AirPassportHistoryColumns : IColumn[] = [
    PassengerTatoo,
    ResBio,
    TravelDocId,
    TravelDocCountryCode, 
    PassportIssueOfficeCode, 
    PassportIssueDate,
    TravelDocExpiryDate, 
    LastUpdateDate,
    PassportStatusCode,
    PassportTypeCode, 
    ImmigrationDirectiveCode,  
    DocumentImpoundIndicator,
    DepartmentRunNbr, 
    TravelDocSequenceNbr // Same as Person Sequence?
];

const CruisePassportHistoryColumns : IColumn[] = [
    TravelDocId,
    ResBio,
    IATTravellerId,
    TravelDocCountryCode,
    PassportIssueOfficeCode,
    PassportIssueDate,
    TravelDocExpiryDate,
    LastUpdateDate,
    PassportStatusCode,
    PassportTypeCode,
    ImmigrationDirectiveCode,
    DocumentImpoundIndicator,
    DepartmentRunNbr,
    TravelDocSequenceNbr // Same as Person Sequence?
];

export {
    AirPassportHistoryColumns,
    CruisePassportHistoryColumns,
    PassengerTatoo,
    ResBio,
    IATTravellerId,
    TravelDocId, 
    TravelDocCountryCode, 
    PassportIssueOfficeCode, 
    PassportIssueDate,
    TravelDocExpiryDate, 
    LastUpdateDate,
    PassportStatusCode,
    PassportTypeCode, 
    ImmigrationDirectiveCode,  
    DocumentImpoundIndicator,
    DepartmentRunNbr, 
    TravelDocSequenceNbr // Samne as Person Sequence?
};