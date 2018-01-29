import IPNRKey from "./IPNRKey";

interface IPNRTravelStay extends IPNRKey {
    totalLengthOfTripOutAustralia?: string;
    pnrCreationDate?: string;
    countOfCancelledSegments?: string;
    totalLengthOfStayInAustralia?: string;
    travelGroupName?: string;
    pnrTravelType?: string;
    intentToTravelDate?: string;
    mostTimeSpentIndays?: string;
    bookingCity?: string;
    intendedDaysInAustralia?: string;
    originalBdt?: string;
    mostTimeSpentPort?: string;
    numberOfMinorsInGroup?: string;
    countOfActiveSegments?: string;
    currentBdt?: string;
    mostTimeSpentCountry?: string;
    pnrTravellersQty?: string;
    intendedDaysOutAustralia?: string;
    overallLengthOfTravel?: string;
    canberraDepartureTimestamp?: string;
    tcpNumber?: string;
}

export { IPNRTravelStay as default, IPNRTravelStay }