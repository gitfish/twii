import IPNRKey from "./IPNRKey";

interface IPNRActiveItinerary extends IPNRKey {
    cabinClass?: string;
    segmentTattoo?: string;
    arrivalTimestampUtc?: string;
    departureDate?: string;
    departureTimestampUtc?: string;
    departureTime?: string;
    pushSegCancellationReceived?: string;
    daysAtArrivalPort?: string;
    hotelCity?: string;
    departureDay?: string;
    segmentStatus?: string;
    companyProductDetailsCombined?: string;
    arrivalTime?: string;
    hotelName?: string;
    originAndDestinationPortCodeCombined?: string;
    classOfTravel?: string;
    arrivalDate?: string;
    parentRouteId?: string;
    segmentTypeCode?: string;
}

export { IPNRActiveItinerary as default, IPNRActiveItinerary }