import IPNRKey from "./IPNRKey";

interface IPersonHistoricalPNR extends IPNRKey {
    passengerTattoo?: string;
    numberOfPushes?: string;
    localPortCode?: string;
    familyName?: string;
    directionCode?: string;
    localScheduledDate?: string;
    routeId?: string;
    givenName?: string;
    activeTimestamp?: string;
}

export { IPersonHistoricalPNR as default, IPersonHistoricalPNR }