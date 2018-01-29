import IPNRKey from "./IPNRKey";

interface IPNRCheckinBagsInfo extends IPNRKey{
    segmentTattoo?: string;
    noOfBags?: string;
    passengerTattoo?: string;
    departureTimestampUtc?: string;
    familyName?: string;
    bagTagPrintedId?: string;
    bagBoardingPoint?: string;
    averageWeight?: string;
    hOP: string;
    givenNames: string;
    departureTimestamp: string;
    clegRouteId: string;
    route: string;
    totalWeight: string;
    numberOfTravellersInPool: string;
    interlineIndicator: string;
    bagDestinationPoint: string;
    poolId: string;

}

export { IPNRCheckinBagsInfo as default, IPNRCheckinBagsInfo }