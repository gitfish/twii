import IPNRKey from "./IPNRKey";

interface IProfileDetailsAssociatedWithPnr extends IPNRKey {
    //dateOfBirth: DateOfBirth object;???
    dateOfBirth: string;
    countryOfIssue: string;
    resultCreationTimestampHms: string;
    passengerTattoo: string;
    localPortCode: string;
    familyName: string;
    localScheduledDate: string;
    routeId: string;
    givenName: string;
    resultId: string;
    reasonForMatch: string;
    profileId: string;
    gender: string;
    resultTypeCode: string;
    resultCreationTimestamp: string;
    pnrCreationTimestampHms: string;
    profileName: string;
    actionIndicator: string;
}

export { IProfileDetailsAssociatedWithPnr as default, IProfileDetailsAssociatedWithPnr }

