import IPNRKey from "./IPNRKey";

interface IPNRCheckInAndBoarding extends IPNRKey {
    departureDate?: string;
    passengerTattoo?: string;
    familyName?: string;
    seatBoardingPoint: string;
    seatDestinationPoint: string;
    departureTimestamp: string;
    clegRouteId: string;
    boardingStatusCode: string;
    checkInAgentId: string;
    cabinClass: string;
    segmentTattoo: string;
    seatDetails: string;
    jsIndDetails: string;
    departureTimestampUtc: string;
    nosIndicator: string;
    checkInTimestamp: string;
    gosIndicator: string;
    separateSeatingInd: string;
    givenNames: string;
    checkInCityCode: string;
    route: string;
    travellerSegmentDetails: string;
}

export { IPNRCheckInAndBoarding as default, IPNRCheckInAndBoarding }