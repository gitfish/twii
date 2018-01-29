import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import {IVisaInfo} from "../../../risk/traveller/iat/common/IVisaInfo";
import * as DateUtils from "../../../util/Date";

const PT : IColumn = {
    key: "passengerTatoo",
    ariaLabel: "Passenger Tatoo",
    name: "PT",
    fieldName: "passengerTatoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
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

const ResBio : IColumn = {
    key: "ResBio",
    ariaLabel: "Res Bio",
    name: "Res Bio",
    fieldName: "ResBio",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 200,
    maxWidth: 250,
};

const VisaGrantDate : IColumn = {
    key: "visaGrantDate",
    ariaLabel: "Visa Grant Date",
    name: "Visa Grant Date",
    fieldName: "visaGrantDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item :  IVisaInfo) => {
        return item.basicVisaInfo? DateUtils.dateToOutputText(item.basicVisaInfo.visaGrantDate): "";
    }
};

const VisaGrantNumber : IColumn = {
    key: "visaGrantNbr",
    ariaLabel: "Visa Grant Number",
    name: "Visa Grant Number",
    fieldName: "visaGrantNbr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
    onRender: (item :  IVisaInfo) => {
        return item.basicVisaInfo? item.basicVisaInfo.visaGrantNbr: "";
    }
};

const VisaIssuePost : IColumn = {
    key: "issueCountryCode",
    ariaLabel: "Visa Issue Post",
    name: "Visa Issue Post",
    fieldName: "issueCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item :  IVisaInfo) => {
        return item.travelDocInfo? item.travelDocInfo.issueCountryCode: "";
    }
};

const VisaSubClass : IColumn = {
    key: "visaSubClassCode",
    ariaLabel: "Visa Subclass",
    name: "Visa Subclass",
    fieldName: "visaSubClassCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item :  IVisaInfo) => {
        return item.basicVisaInfo? item.basicVisaInfo.visaSubClassCode: "";
    }
};

const VisaStream : IColumn = {
    key: "visaStream",
    ariaLabel: "Visa Stream/Type",
    name: "Visa Stream/Type",
    fieldName: "visaStream",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
};

const VisaStayPeriod : IColumn = {
    key: "visaStayPeriodText",
    ariaLabel: "Stay Period",
    name: "Stay Period",
    fieldName: "visaStayPeriodText",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000,
};

const TravelDocCountryCode : IColumn = {
    key: "travelDocCountryCode",
    ariaLabel: "Travel Doc Country Code",
    name: "Travel Doc Country Code",
    fieldName: "travelDocCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IVisaInfo) => {
        return item.travelDocInfo? item.travelDocInfo.travelDocCountryCode: "";
    }
};

const TravelDocID : IColumn = {
    key: "travelDocId",
    ariaLabel: "Travel Doc Id",
    name: "Travel Doc Id",
    fieldName: "travelDocId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 140,
    onRender: (item: IVisaInfo) => {
        return item.travelDocInfo? item.travelDocInfo.travelDocId: "";
    }
};

const EvidenceNumber : IColumn = {
    key: "visaEvidenceNumber",
    ariaLabel: "Evidence Nbr",
    name: "Evidence Nbr",
    fieldName: "visaEvidenceNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const VisaStatusCode : IColumn = {
    key: "visaStatusCode",
    ariaLabel: "Visa Status Code",
    name: "Visa Status Code",
    fieldName: "visaStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,

};

const VisaClassCode : IColumn = {
    key: "visaClassCode",
    ariaLabel: "visaClassCode",
    name: "Visa class Code",
    fieldName: "visaClassCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,

};

const LastUpdatedDate : IColumn = {
    key: "lastUpdatedDate",
    ariaLabel: "Last Updated Date",
    name: "Last Updated Date",
    fieldName: "lastUpdatedDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
    onRender: (item :  IVisaInfo) => {
        return item.lastUpdatedDate? DateUtils.dateToOutputText(item.lastUpdatedDate): "";
    }

};

const ImmigrationDirectiveCode : IColumn = {
    key: "visaImmigrationDirectiveCode",
    ariaLabel: "Immigration Directive Code",
    name: "Immigration Directive Code",
    fieldName: "visaImmigrationDirectiveCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,

};

const LawfulGrantNbr : IColumn = {
    key: "visaLawfulGrantNumber",
    ariaLabel: "Lawful Grant Nbr",
    name: "Lawful Grant Nbr",
    fieldName: "visaLawfulGrantNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,

};

const LawfulUntilDate : IColumn = {
    key: "visaLawfulUntilDate",
    ariaLabel: "Lawful Until Date",
    name: "Lawful Until Date",
    fieldName: "visaLawfulUntilDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item :  IVisaInfo) => {
        return item.visaLawfulUntilDate? DateUtils.dateToOutputText(item.visaLawfulUntilDate): "";
    }
};

const EntriesMadeCount : IColumn = {
    key: "visaEntriesMadeCount",
    ariaLabel: "Entries Made Count",
    name: "Entries Made Count",
    fieldName: "visaEntriesMadeCount",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,

};

const EvidenceStatusCode : IColumn = {
    key: "visaEvidenceStatusCode",
    ariaLabel: "Evidence Status Code",
    name: "Evidence Status Code",
    fieldName: "visaEvidenceStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,

};

const PhysicalEvidenceStatusCode : IColumn = {
    key: "visaPhysicalEvidenceStatusCode",
    ariaLabel: "Physical Evidence Status Code",
    name: "Physical Evidence Status Code",
    fieldName: "visaPhysicalEvidenceStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 60,

};

const VisaApplicationId : IColumn = {
    key: "visaApplicationId",
    ariaLabel: "Visa Application Id",
    name: "Visa Application Id",
    fieldName: "visaApplicationId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const EntryExpiryDate : IColumn = {
    key: "visaEntryExpiryDate",
    ariaLabel: "Entry Expiry Date",
    name: "Entry Expiry Date",
    fieldName: "visaEntryExpiryDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
    onRender: (item :  IVisaInfo) => {
        return item.visaEntryExpiryDate? DateUtils.dateToOutputText(item.visaEntryExpiryDate): "";
    }
};

const MigrantExpiryDate : IColumn = {
    key: "visaMigrantExpiryDate",
    ariaLabel: "Migrant Entry Expiry Date",
    name: "Migrant Entry Expiry Date",
    fieldName: "visaMigrantExpiryDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
    onRender: (item :  IVisaInfo) => {
        return item.visaMigrantExpiryDate? DateUtils.dateToOutputText(item.visaMigrantExpiryDate): "";
    }

};

const EntriesAllowedCode : IColumn = {
    key: "visaEntriesAllowedCode",
    ariaLabel: "Entries Allowed Code",
    name: "Entries Allowed Code",
    fieldName: "visaEntriesAllowedCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const StayPeriodText : IColumn = {
    key: "visaStayPeriodText",
    ariaLabel: "Stay Period Txt",
    name: "Stay Period Txt",
    fieldName: "visaStayPeriodText",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const MultiIssuedInd : IColumn = {
    key: "visaMultiIssuedIndicator",
    ariaLabel: "Multi Issued Ind",
    name: "Multi Issued Ind",
    fieldName: "visaMultiIssuedIndicator",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const ResidenceCountryCode : IColumn = {
    key: "visaResidenceCountryCode",
    ariaLabel: "Residence Country Code",
    name: "Residence Country Code",
    fieldName: "visaResidenceCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 100,

};

const VisaCheckCharacter : IColumn = {
    key: "visaCheckCharacter",
    ariaLabel: "Visa Check Character",
    name: "Visa Check Character",
    fieldName: "visaCheckCharacter",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 100,

};

const VisaGrantCheckCharacter : IColumn = {
    key: "visaGrantCheckCharacter",
    ariaLabel: "Visa Grant Check Character",
    name: "Visa Grant Check Character",
    fieldName: "visaGrantCheckCharacter",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,

};

const VisaInformationText : IColumn = {
    key: "visaInformationText",
    ariaLabel: "Visa Information Text",
    name: "Visa Information Text",
    fieldName: "visaInformationText",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,

};

const VisaIssueCountryCode : IColumn = {
    key: "",
    ariaLabel: "Visa Issue Country Code",
    name: "Visa Issue Country Code",
    fieldName: "",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const VisaPersonSeqNbr : IColumn = {
    key: "visaPersonSeqNbr",
    ariaLabel: "Visa Person Sequence Nbr",
    name: "Visa Person Sequence Nbr",
    fieldName: "visaPersonSeqNbr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const OccupationCode : IColumn = {
    key: "occupationCode",
    ariaLabel: "Occupation Code",
    name: "Occupation Code",
    fieldName: "occupationCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,

};

const AirVisaDataHistoryColumns : IColumn[] = [
    PT,
    ResBio,
    VisaGrantDate,
    VisaGrantNumber,
    VisaIssuePost,
    VisaSubClass,
    VisaStream,
    VisaStatusCode,
    VisaStayPeriod
];

const CruiseVisaDataHistoryColumns1 : IColumn[] = [
    IATTravellerId,
    VisaGrantDate,
    VisaGrantNumber,
    TravelDocCountryCode,
    TravelDocID,
    EvidenceNumber,
    VisaStatusCode,
    VisaClassCode,
    LastUpdatedDate,
    ImmigrationDirectiveCode,
    LawfulGrantNbr,
    LawfulUntilDate,
    EntriesMadeCount,
    EvidenceStatusCode,
    PhysicalEvidenceStatusCode


];

const CruiseVisaDataHistoryColumns2 : IColumn[] = [
    IATTravellerId,
    VisaGrantDate,
    VisaApplicationId,
    EntryExpiryDate,
    MigrantExpiryDate,
    EntriesAllowedCode,
    StayPeriodText,
    MultiIssuedInd,
    ResidenceCountryCode,
    VisaCheckCharacter,
    VisaGrantCheckCharacter,
    VisaInformationText,
    VisaIssueCountryCode,
    VisaPersonSeqNbr,
    OccupationCode



];
export {
    AirVisaDataHistoryColumns,
    CruiseVisaDataHistoryColumns1,
    CruiseVisaDataHistoryColumns2,
    PT,
    IATTravellerId,
    ResBio,
    VisaGrantDate,
    VisaGrantNumber,
    VisaIssuePost,
    VisaSubClass,
    VisaStream,
    VisaStatusCode,
    VisaStayPeriod,
    TravelDocCountryCode,
    TravelDocID,
    EvidenceNumber,
    VisaClassCode,
    LastUpdatedDate,
    ImmigrationDirectiveCode,
    LawfulGrantNbr,
    LawfulUntilDate,
    EntriesMadeCount,
    EvidenceStatusCode,
    PhysicalEvidenceStatusCode,
    VisaApplicationId,
    EntryExpiryDate,
    MigrantExpiryDate,
    EntriesAllowedCode,
    StayPeriodText,
    MultiIssuedInd,
    ResidenceCountryCode,
    VisaCheckCharacter,
    VisaGrantCheckCharacter,
    VisaInformationText,
    VisaIssueCountryCode,
    VisaPersonSeqNbr,
    OccupationCode
};
