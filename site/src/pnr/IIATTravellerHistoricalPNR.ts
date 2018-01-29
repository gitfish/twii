import IPNRKey from "./IPNRKey";

interface IIATTravellerHistoricalPNR extends IPNRKey {
    iatTravellerId?: string;
    sexCode?: string;
    givenNames?: string;
    passengerTattoo?: string;
    familyName?: string;
    birthDate?: string;
    givenName?: string;
    birthDeptCountryCode?: string;
}

export { IIATTravellerHistoricalPNR as default, IIATTravellerHistoricalPNR }