import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IIATAAgency from "../IIATAAgency";
import AgencyTypeCdRef from "refdata/AgencyTypeCd"

const TravelAgencyCode : IColumn = {
    key: "iataTravelAgencyCode",
    ariaLabel: "Travel Agency Code",
    name: "Travel Agency Code",
    fieldName: "iataTravelAgencyCode",
    minWidth: 30,
    maxWidth: 110,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const CheckDigit : IColumn = {
    key: "iataTravelAgencyCheckDigit",
    ariaLabel: "Check Digit",
    name: "Check Digit",
    fieldName: "iataTravelAgencyCheckDigit",
    minWidth: 30,
    maxWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const AgencyType : IColumn = {
    key: "travelAgencyTypeCode",
    ariaLabel: "Location Type",
    name: "Location Type",
    fieldName: "travelAgencyTypeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 100,
    data: {
        getText(item : IIATAAgency) {
            return AgencyTypeCdRef.getDesc(item.travelAgencyTypeCode);
        }
    },
    onRender: (item: IIATAAgency) => {
        return AgencyTypeCdRef.getDesc(item.travelAgencyTypeCode);
    }
};

const AirCode : IColumn = {
    key: "carrierCode",
    ariaLabel: "Airline Code",
    name: "Airline Code",
    fieldName: "carrierCode",
    minWidth: 30,
    maxWidth: 60,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const AgencyName : IColumn = {
    key: "travelAgencyName",
    ariaLabel: "Travel Agency Name",
    name: "Travel Agency Name",
    fieldName: "travelAgencyName",
    minWidth: 30,
    maxWidth: 225,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TradingAs : IColumn = {
    key: "tradingName",
    ariaLabel: "Trading As",
    name: "Trading As",
    fieldName: "tradingName",
    minWidth: 30,
    maxWidth: 225,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const City : IColumn = {
    key: "locationCity",
    ariaLabel: "City",
    name: "City",
    fieldName: "locationCity",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const Region : IColumn = {
    key: "locationRegion",
    ariaLabel: "Region",
    name: "Region",
    fieldName: "locationRegion",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const Country : IColumn = {
    key: "locationCountryCode",
    ariaLabel: "Country",
    name: "Country",
    fieldName: "locationCountryCode",
    minWidth: 30,
    maxWidth: 60,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TelephoneCountryCode : IColumn = {
    key: "telephoneCountryCode",
    ariaLabel: "Telephone Country Code",
    name: "Telephone Country Code",
    fieldName: "telephoneCountryCode",
    minWidth: 40,
    maxWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
};

const TelephoneAreaCode : IColumn = {
    key: "telephoneAreaCode",
    ariaLabel: "Telephone Area Code",
    name: "Telephone Area Code",
    fieldName: "telephoneAreaCode",
    minWidth: 40,
    maxWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
};

const TelephoneNumber : IColumn = {
    key: "telephoneNumber",
    ariaLabel: "Telephone Number",
    name: "Telephone Number",
    fieldName: "telephoneNumber",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
};

const Email : IColumn = {
    key: "emailAddress",
    ariaLabel: "Email",
    name: "Email",
    fieldName: "emailAddress",
    minWidth: 40,
    maxWidth: 150,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const WebAddress : IColumn = {
    key: "webAddress",
    ariaLabel: "Web Address",
    name: "Web Address",
    fieldName: "webAddress",
    minWidth: 40,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const IATAAgencyColumns : IColumn[] = [
    TravelAgencyCode,
    CheckDigit,
    AgencyType,
    AirCode,
    AgencyName,
    TradingAs,
    City,
    Region,
    Country,
    TelephoneCountryCode,
    TelephoneAreaCode,
    TelephoneNumber,
    Email,
    WebAddress
];

export {
    IATAAgencyColumns as default,
    IATAAgencyColumns,
    TravelAgencyCode,
    CheckDigit,
    AgencyType,
    AirCode,
    AgencyName,
    TradingAs,
    City,
    Region,
    Country,
    TelephoneCountryCode,
    TelephoneAreaCode,
    TelephoneNumber,
    Email,
    WebAddress
}