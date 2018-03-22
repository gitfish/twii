import { OptionListModel } from "@twii/common/lib/model/OptionListModel";

const CredentialOptionListStore = new OptionListModel([
    { key: "ABN", text: "ABN" },
    { key: "ACN", text: "ACN" },
    { key: "TD", text: "Passport" },
    { key: "VISA", text: "Visa" },
    { key: "IATA_CD", text: "IATA Code" }

// Business doesn't want the complete list for now. This might change in future. Leaving them here for reference.
/*  { key: "ACS", text: "Customs" },
    { key: "AD", text: "Affidavit" },
    { key: "ADC", text: "Anti-Dumping Commission" },
    { key: "AGNT_ID", text: "Agent ID" },
    { key: "AQIS", text: "AQIS" },
    { key: "ATO", text: "Australian Taxation Office" },
    { key: "BA", text: "Bank Account" },
    { key: "CCID", text: "Customs Client ID" },
    { key: "CCID12", text: "Obsolete ICS generated ID" },
    { key: "CI", text: "Certificate of Identity" },
    { key: "CJV", text: "Criminal Justice Visa" },
    { key: "CM", text: "Crew Member's Certificate" },
    { key: "DC", text: "Domestic Coupon" },
    { key: "DIAC_PID", text: "DIAC PID" },
    { key: "DL", text: "Drivers Licence" },
    { key: "EDISITE", text: "EDI Site" },
    { key: "FRQFLYR", text: "Frequent Flyer Membership Number" },
    { key: "ID", text: "Identity Document" },
    { key: "LICBRKGC", text: "Corporate LIC Brokerage" },
    { key: "LICBRKGS", text: "Sole Trader LIC Brokerage" },
    { key: "LICBRKR", text: "Nominee Broker Licence" },
    { key: "MARN", text: "Migration Agent Registration Number" },
    { key: "MS", text: "Maritime Security Identification Card" },
    { key: "NA", text: "No Documents Available" },
    { key: "NI", text: "Norfolk Islander" },
    { key: "OTH", text: "Document Type Other" },
    { key: "RPTABBRV", text: "Abbreviated" },
    { key: "RPTOTHER", text: "Other" },
    { key: "RPTREMAIL", text: "Re-Mail" },
    { key: "RT", text: "Refugee Travel Document" },
    { key: "SD", text: "Seamen's Document" },
    { key: "SPV", text: "Special Purpose Visa" },
    { key: "SV", text: "Service Personnel Document" },
    { key: "TP", text: "Temporary Permit" },
    { key: "TRIPS_PID", text: "TRIPS Person Id" },
    { key: "UNK", text: "Unknown / Document Type Unidentified" },
    { key: "UNSPFD", text: "Unspecified" },
    { key: "VISA_GRNT_NBR", text: "Visa Grant Number" } */
]);

export { CredentialOptionListStore };