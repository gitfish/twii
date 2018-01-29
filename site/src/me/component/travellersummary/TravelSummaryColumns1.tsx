import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import ITravellerSummary from "risk/traveller/pnr/ITravellerSummary";
import {formatToNISName, defaultDOBFormat} from "entity/EntityNameUtils";
import * as DateUtils from "util/Date";

const PT : IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 40,
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller? item.PNRTraveller.PassengerTattoo: "";
    }
};

const Staff : IColumn = {
    key: "StaffInd",
    ariaLabel: "Staff",
    name: "Staff",
    fieldName: "StaffInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 40,
};

const FamilyName : IColumn = {
    key: "familyName",
    ariaLabel: "Res Surname",
    name: "Res Surname",
    fieldName: "familyName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller? item.PNRTraveller.ReservationName? item.PNRTraveller.ReservationName.familyName: "" : "";
    }
};

const GivenName : IColumn = {
    key: "givenName",
    ariaLabel: "Res Given Name",
    name: "Res Given Name",
    fieldName: "givenName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller? item.PNRTraveller.ReservationName? item.PNRTraveller.ReservationName.givenName: "" : "";
    }
};

const BioInfo : IColumn = {
    key: "bioInfo",
    ariaLabel: "Bio Information",
    name: "Bio Information",
    fieldName: "bioInfo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 200,
    maxWidth: 250,
    onRender: (item: ITravellerSummary) => {
        let bioInfo = "";
        let bioGraphicsDetails = item.IATTraveller.Biographic;
        if(bioGraphicsDetails) {
            bioInfo = formatToNISName(bioGraphicsDetails.familyName.toUpperCase(),
                bioGraphicsDetails.givenName, "",
                bioGraphicsDetails.sexCode, "");
            bioInfo = bioGraphicsDetails.birthDate ? bioInfo.concat(defaultDOBFormat(bioGraphicsDetails.birthDate)) : bioInfo;
            bioInfo = bioGraphicsDetails.countryOfCitizenship ? bioInfo+" - "+(bioGraphicsDetails.countryOfCitizenship) : bioInfo;
        }
        return bioInfo;
    }
};

const BirthCountryCode : IColumn = {
    key: "birthCountryCode",
    ariaLabel: "COB",
    name: "COB",
    fieldName: "birthCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
    onRender: (item: ITravellerSummary) => {
        return item.IATTraveller.Biographic? item.IATTraveller.Biographic.birthCountryCode: "";
    }
};

const TravelDocId : IColumn = {
    key: "travelDocId",
    ariaLabel: "PNR Travel Doc",
    name: "PNR Travel Doc",
    fieldName: "travelDocId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller.TravelDoc? item.PNRTraveller.TravelDoc.TravelDocInfo? item.PNRTraveller.TravelDoc.TravelDocInfo.travelDocId: [] : [];
    }
};

const PNRTDCOC : IColumn = {
    key: "travelDocCountryCode",
    ariaLabel: "PNR Travel Doc Country",
    name: "PNR Travel Doc Country",
    fieldName: "travelDocCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: ITravellerSummary) => {
        return  item.PNRTraveller.TravelDoc? item.PNRTraveller.TravelDoc.TravelDocInfo? item.PNRTraveller.TravelDoc.TravelDocInfo.travelDocCountryCode: [] : [];

    }
};

const TravelDocExpiryDate : IColumn = {
    key: "travelDocExpiryDate",
    ariaLabel: "PNR Travel Doc Expiry",
    name: "PNR Travel Doc Expiry",
    fieldName: "travelDocExpiryDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller.TravelDoc? item.PNRTraveller.TravelDoc.TravelDocInfo? DateUtils.dateToOutputText(item.PNRTraveller.TravelDoc.TravelDocInfo.travelDocExpiryDate): [] : [];
    }
};

const IATTravellerId : IColumn = {
    key: "IATTravellerId",
    ariaLabel: "IAT Travel Doc",
    name: "IAT Travel Doc",
    fieldName: "IATTravellerId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ITravellerSummary) => {
        return item.IATTraveller? item.IATTraveller.IATTravellerId : "";
    }
};

const IATTDCOC : IColumn = {
    key: "issueCountryCode",
    ariaLabel: "IAT Travel Doc Country",
    name: "IAT Travel Doc Country",
    fieldName: "issueCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: ITravellerSummary) => {
        let iatTdCOC = "";
        let matchedTravelDocs = item.IATTraveller.TravelDoc;
        if(matchedTravelDocs!=null) {
            iatTdCOC =  matchedTravelDocs.TravelDocInfo? matchedTravelDocs.TravelDocInfo.travelDocCountryCode: "";
        }
        return iatTdCOC;
    }
};

const TravelDocDBT : IColumn = {
    key: "TravelDocDBT",
    ariaLabel: "Travel Doc Lead Time",
    name: "Travel Doc Lead Time",
    fieldName: "TravelDocDBT",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: ITravellerSummary) => {
        return item.IATTraveller.MatchedTravelDoc? item.IATTraveller.MatchedTravelDoc.TravelDocDBT : "";
    }
};

const FirstTimeTravelInd : IColumn = {
    key: "FirstTimeTravelInd",
    ariaLabel: "First Time Travel",
    name: "First Time Travel",
    fieldName: "FirstTimeTravelInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const PreviousTripCount : IColumn = {
    key: "PreviousTripCount",
    ariaLabel: "Prev Trips",
    name: "Prev Trips",
    fieldName: "PreviousTripCount",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

// For Booking Summary - Traveller Summary
const travellerSummaryColumns1 : IColumn[] = [
    PT,
    Staff,
    FamilyName,
    GivenName,
    BioInfo,
    BirthCountryCode,
    TravelDocId,
    PNRTDCOC,
    TravelDocExpiryDate,
    TravelDocDBT,
    IATTravellerId,
    IATTDCOC,
    FirstTimeTravelInd,
    PreviousTripCount
];

export {
    travellerSummaryColumns1 as default,
    travellerSummaryColumns1,
    PT,
    Staff,
    GivenName,
    FamilyName,
    BioInfo,
    BirthCountryCode,
    TravelDocId,
    PNRTDCOC,
    TravelDocExpiryDate,
    TravelDocDBT,
    IATTravellerId,
    IATTDCOC,
    FirstTimeTravelInd,
    PreviousTripCount
};