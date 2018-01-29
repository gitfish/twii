interface IIATPassport {
    travelDocID?: string;
    travelDocDeptCountryCode?: string;
    travelDocTypeCode?: string;
    deptRunNbr?: string;
    documentImpoundInd?: string;
    immigrationDirectiveCode?: string;
    issueCountryCode?: string;
    issueOfficeCode?: string;
    lastUpdateDate?: string;
    passportExpiryDate?: string;
    passportIssueDate?: string;
    passportStatusCode?: string;
    passportTypeCode?: string;
    sourceSystemCode?: string;
    Aliases?: IIATPassportAlias[];
}

interface IIATPassportAlias {
    travelDocID?: string;
    travelDocDeptCountryCode?: string;
    iatTravellerID?: string;
    aliasSequenceNbr?: string;
    birthDate?: string;
    birthDeptCountryCode?: string;
    sexCode?: string;
    maritalStatusCode?: string;
    familyName?: string;
    givenNames?: string;
}

export { IIATPassport as default, IIATPassport, IIATPassportAlias };