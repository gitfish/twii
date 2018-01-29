import IPNRKey from "./IPNRKey";

interface IPNRMasterSearchRequest extends IPNRKey {
    familyName?: string;
    givenName?: string;
    dateOfBirth?: string;
    ageFrom?: number;
    ageTo?: number;
    pnrCreationTimestampFrom?: string;
    pnrCreationTimestampTo?: string;
    travelDocId?: string;
    travelDocCountryCode?: string;
    arrivalDateFrom?: string;
    arrivalDateTo?: string;
    arrivalCarrier?: string;
    departureDateFrom?: string;
    departureDateTo?: string;
    departureCarrier?: string;
    originCityPort?: string;
    originRouteId?: string;
    destinationPort?: string;
    destinationRouteId?: string;
    limit?: number;
}

export { IPNRMasterSearchRequest as default, IPNRMasterSearchRequest }