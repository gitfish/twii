import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "../../../util/Date";
import * as StringUtils from "util/String";
import IBioDataInfo from "risk/traveller/iat/common/IBioDataInfo";
import {formatToNISName, defaultDOBFormat} from "entity/EntityNameUtils";

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
    minWidth: 250,
    maxWidth: 250,
    onRender: (item: IBioDataInfo) => {
        if (item.personInfo) {
            var resBio = formatToNISName(item.personInfo.familyName.toUpperCase(),
                item.personInfo.givenName, "",
                item.personInfo.sexCode, "");
            resBio = item.personInfo.birthDate ? resBio.concat(defaultDOBFormat(item.personInfo.birthDate)) : resBio;
            resBio = item.personInfo.countryOfCitizenship ? resBio+" - "+(item.personInfo.countryOfCitizenship) : resBio;
        }
        return resBio;
    }
};

const IATTravellerId : IColumn = {
    key: "iatTravellerId",
    ariaLabel: "IAT Traveller ID",
    name: "IAT Traveller ID",
    fieldName: "iatTravellerId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};


const AliasSequenceNbr : IColumn = {
    key: "aliasSequenceNbr",
    ariaLabel: "Alias Sequence Nbr",
    name: "Alias Sequence Nbr",
    fieldName: "aliasSequenceNbr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const FamilyName : IColumn = {
    key: "familyName",
    ariaLabel: "Family Name",
    name: "Family Name",
    fieldName: "familyName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: IBioDataInfo) => {
        return item.personInfo ? item.personInfo.familyName ? item.personInfo.familyName : "": "";
    }

};

const GivenName : IColumn = {
    key: "givenName",
    ariaLabel: "Given Names",
    name: "Given Names",
    fieldName: "givenName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: IBioDataInfo) => {
        return item.personInfo ? item.personInfo.givenName ? item.personInfo.givenName : "": "";
    }
};

const SexCode : IColumn = {
    key: "sexCode",
    ariaLabel: "Sex Code",
    name: "Sex Code",
    fieldName: "sexCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
    onRender: (item: IBioDataInfo) => {
        return item.personInfo ? item.personInfo.sexCode ? item.personInfo.sexCode : "": "";
    }
};

const BirthDate : IColumn = {
    key: "birthDate",
    ariaLabel: "Birth Date",
    name: "Birth Date",
    fieldName: "birthDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: IBioDataInfo) => {
        return item.personInfo ? item.personInfo.birthDate ? item.personInfo.birthDate : "": "";
    }
};

const MaritalStatusCode : IColumn = {
    key: "maritalStatusCode",
    ariaLabel: "Marital Status Code",
    name: "Marital Status Code",
    fieldName: "maritalStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
    onRender: (item: IBioDataInfo) => {
        return item.personInfo ? item.personInfo.maritalStatusCode ? item.personInfo.maritalStatusCode : "": "";
    }
};

const BirthCountryCode : IColumn = {
    key: "birthCountryCode",
    ariaLabel: "Birth Country",
    name: "Birth Country",
    fieldName: "birthCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: IBioDataInfo) => {
        return item.personInfo ? item.personInfo.birthCountryCode ? item.personInfo.birthCountryCode : "": "";
    }
};

const BirthNameInd : IColumn = {
    key: "birthNameInd",
    ariaLabel: "Birth Name Ind",
    name: "Birth Name Ind",
    fieldName: "birthNameInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IBioDataInfo) => {
        return item.birthNameInd ? StringUtils.equalsIgnoreCase(item.birthNameInd, "y") ? "True" : "False" : "";
    }
};

const CitizenshipNameInd : IColumn = {
    key: "citizenshipNameInd",
    ariaLabel: "Citizenship Name Ind",
    name: "Citizenship Name Ind",
    fieldName: "citizenshipNameInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IBioDataInfo) => {
        return item.citizenshipNameInd ? StringUtils.equalsIgnoreCase(item.citizenshipNameInd, "y") ? "True" : "False" : "";
    }
};

const CurrentNameInd : IColumn = {
    key: "currentNameInd",
    ariaLabel: "Current Name Ind",
    name: "Current Name Ind",
    fieldName: "currentNameInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IBioDataInfo) => {
        return item.currentNameInd ? StringUtils.equalsIgnoreCase(item.currentNameInd, "y") ? "True" : "False" : "";
    }
};

const LastUpdateDate : IColumn = {
    key: "lastUpdateDate",
    ariaLabel: "Last Update Date",
    name: "Last Update Date",
    fieldName: "lastUpdateDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item: IBioDataInfo) => {
        return item.lastUpdateDate ? DateUtils.dateToOutputText(item.lastUpdateDate) : "" ;
    }
};

const SourceFileCode : IColumn = {
    key: "sourceFileCode",
    ariaLabel: "Source File Code",
    name: "Source File Code",
    fieldName: "sourceFileCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100
};

const AirBioDataHistoryColumns : IColumn[] = [
    PassengerTatoo,
    ResBio,
    FamilyName, 
    GivenName, 
    BirthDate,
    SexCode,  
    AliasSequenceNbr, 
    BirthCountryCode, 
    BirthNameInd, 
    CitizenshipNameInd, 
    CurrentNameInd, 
    LastUpdateDate,
    MaritalStatusCode,
    SourceFileCode
];

const CruiseBioDataHistoryColumns : IColumn[] = [
    IATTravellerId,
    ResBio,
    FamilyName,
    GivenName,
    BirthDate,
    SexCode,
    AliasSequenceNbr,
    BirthCountryCode,
    BirthNameInd,
    CitizenshipNameInd,
    CurrentNameInd,
    LastUpdateDate,
    MaritalStatusCode,
    SourceFileCode
];

export {
    AirBioDataHistoryColumns,
    CruiseBioDataHistoryColumns,
    PassengerTatoo,
    IATTravellerId,
    ResBio,
    FamilyName, 
    GivenName, 
    BirthDate,
    SexCode,  
    AliasSequenceNbr, 
    BirthCountryCode, 
    BirthNameInd, 
    CitizenshipNameInd, 
    CurrentNameInd, 
    LastUpdateDate,
    MaritalStatusCode,
    SourceFileCode
};