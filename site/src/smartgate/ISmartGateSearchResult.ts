interface ISmartGateSearchResult {
    travellerId?: string;
    portCode?: string;
    location?: string;
    directionCode?: string;
    attempt?: string;
    travelDocId?: string;
    issueCountryCode?: string;
    nationalityCountryCode?: string;
    expectedDate?: string;
    familyName?: string;
    firstName?: string;
    dateOfBirth?: string;
    passportPhotoUrl?: string;
    smartGatePhotoUrl?: string;
}

export { ISmartGateSearchResult }