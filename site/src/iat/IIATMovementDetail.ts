interface IIATMovementDetail {
    iatTravellerIdentifier: string;
    aliasSequenceNbr?: string;
    birthDate?: string;
    sexCode?: string;
    familyName?: string;
    givenNames?: string;
    routeId: string;
    fullRoutingText?: string;
    localPortCode?: string;
    localScheduledDate: string;
    directionCode: string;
    checkInPortCode?: string;
    movementDate?: string;
    movementStatusCode?: string;
    movementTime?: string;
    movementHistoryInd?: string;
    visaIdentifyingNBR?: string;
    passengerCrewCode?: string;
    postMovementInd?: string;
    bagsExamReferralReasonCode?: string;
    travelDocSequenceNbr?: string;
    travellerMovementTypeCode?: string;
    expectedOrActualTripCode?: string;
    noOfAliasForTheTraveller?: string;
    birthDeptCountryCode?: string;
    birthNameInd?: string;
    citizenshipNameInd?: string;
    currentNameInd?: string;
    deptPersonIDInd?: string;
    additionalAliasInd?: string;
    dimiaAliasInd?: string;
    maritalStatusCode?: string;
    visaID?: string;
    entriesAllowedCode?: string;
    entriesMadeCount?: string;
    entryExpiryDate?: string;
    evidenceNbr?: string;
    evidenceStatusCode?: string;
    immigrationDirectiveCode?: string;
    lawfulUntilDate?: string;
    migrantEntryExpiryDate?: string;
    multiIssuedVisaInd?: string;
    occupationCode?: string;
    physicalEvidenceStatusCode?: string;
    residenceDeptCountryCode?: string;
    travelDocDeptCountryCode?: string;
    travelDocID?: string;
    visaClassCode?: string;
    visaCheckCharacter?: string;
    visaGrantDate?: string;
    visaGrantNbr?: string;
    visaIssueCountryCode?: string;
    visaPersonSequenceNbr?: string;
    visaStatusCode?: string;
    visaSubClassCode?: string;
    documentImpoundInd?: string;
    issueCountryCode?: string;
    issueOfficeCode?: string;
    passportExpiryDate?: string;
    passportIssueDate?: string;
    passportStatusCode?: string;
    passportTypeCode?: string;
    checkInDate?: string;
    checkInRouteId?: string;
    checkInTime?: string;
    childInd?: string;
    professionCode?: string;
    transborderDate?: string;
    transborderTime?: string;
    visaIssueDate?: string;
    bidStatusCode?: string;
    biometricsResultsCode?: string;
    cancelOriginCode?: string;
    chargesExemptCode?: string;
    fidStatusCode?: string;
    immigrationAliasSequenceNbr?: string;
    immigrationPersonID?: string;
    movementRaceID?: string;
    referralStatusCode?: string;
    relatedVisaID?: string;
    alertInd?: string;
    confidentialAlertInd?: string;
    movementMessageTypeCode?: string;
    referralTypeCode?: string;
    travelDocIssueCountryCode?: string;
    travelDocTypeCode?: string;
    travelTypeCode?: string;
    examinationForTravellerForMovementInd?: string;
    positiveFindForTravellerForMovementInd?: string;
    examinationForTravellerInd?: string;
    numberOfExamsForTheTraveller?: string;
    positiveFindForTravellerInd?: string;
    positiveFindCountForTraveller?: string;
}

export { IIATMovementDetail as default, IIATMovementDetail };