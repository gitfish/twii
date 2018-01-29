import IPNRKey from "./IPNRKey";

interface IPNRSearchResult extends IPNRKey {
    firstILocalPortCode?: string;
    firstILocalScheduledDate?: string;
    firstIRouteId?: string;
    firstIForeignPortCode?: string;
    intentToTravelDate?: string;
    firstOLocalScheduledDate?: string;
    firstOForeignPortCode?: string;
    firstOLocalPortCode?: string;
    firstORouteId?: string;
    passengerTattoo?: string;
    intentToEndTravelDate?: string;
    givenName?: string;
    givenNames?: string;
    familyName?: string;
    gender?: string;
    dateOfBirth?: string;
    travelDocumentNbr?: string;
    countryOfIssue?: string;
    documentFreeText?: string;
}

export { IPNRSearchResult as default, IPNRSearchResult }