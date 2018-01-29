interface IIATVisa {
    visaIdentifyingNbr: string;
    visaID: string;
    entriesAllowedCode?: string;
    entriesMadeCount?: string;
    entryExpiryDate?: string;
    evidenceNbr?: string;
    evidenceStatusCode?: string;
    immigrationDirectiveCode?: string;
    lastUpdateDate?: string;
    lawfulUntilDate?: string;
    migrantEntryExpiryDate?: string;
    multiIssuedVisaInd?: string;
    occupationCode?: string;
    physicalEvidenceStatusCode?: string;
    residenceDeptCountryCode?: string;
    travelDocDeptCountryCode?: string;
    travelDocID?: string;
    visaApplicationID?: string;
    visaClassCode?: string;
    visaCheckCharacter?: string;
    visaGrantDate?: string;
    visaGrantNbr?: string;
    visaInformationText?: string;
    visaIssueCountryCode?: string;
    visaPersonSequenceNbr?: string;
    visaStatusCode?: string;
    visaSubClassCode?: string;
    sourceSystemCode?: string;
}

export { IIATVisa as default, IIATVisa };