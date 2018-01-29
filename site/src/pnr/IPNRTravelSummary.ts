import IPNRKey from "./IPNRKey";

interface IPNRTravelSummary extends IPNRKey {
    dateOfBirth?: string;
    allianceFrequentFlyerId?: string;
    airlineMembershipLevel?: string;
    passengerTattooAndPnrIdCombined?: string;
    travelDocExpiryDate?: string;
    travelDocDeptCountryCode?: string;
    passengerTattoo?: string;
    travelDocDeptCountryCodeNotEqualToCountryOfDepartureIndicator?: string;
    familyName?: string;
    airlineCompanyId?: string;
    givenName?: string;
    countryOfBirth?: string;
    countryOfBirthNotEqualToCountryOfDepartureIndicator?: string;
    gender?: string;
    numberOfActualMovements?: string;
    daysBtwVisaIssueAndTravel?: string;
    travelDocId?: string;
    pnrId?: string;
    daysBtwTdocIssueAndTravel?: string;
    travelDocumentFamilyName?: string;
    allianceCompanyId?: string;
    countryOfIssue?: string;
    firstTimeTraveller?: string;
    travelDocumentGivenNames?: string;
    allianceMembershipLevel?: string;
    airlineFrequentFlyerId?: string;
    travellerBookability?: string;
    bookingSystemCode?: string;
    travelDocumentNbr?: string;
}

export { IPNRTravelSummary as default, IPNRTravelSummary }