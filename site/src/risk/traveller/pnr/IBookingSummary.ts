interface IBookingSummary {
    PNRTravelType?: string;
    BookingDate?: Date;
    BookingCity?: string;
    FormOfPayment?: string;
    IntentToTravelDate?: Date;
    TravelGroupName?: string;
    OriginalBookingDBT?: number;
    CurrentBookingDBT?: number;
    MostTimeSpentDays?: number;
    MostTimeSpentCountry?: string;
    MostTimeSpentPort?: string;
    TotalLengthOfStay?: number;
    IntendLengthOfStay?: number;
    TotalLengthOfTrip?: number;
    TotalIntendedLengthOfTrip?: number;
    TotalLengthOfTravel?: number;
    ActiveSegmentCount?: number;
    CancelledSegmentCount?: number;
    TravellerCount?: number;
    MinorsInGroupCount?: number;
    TCPNumber?: number;
    DepartureCanberraTimeStamp?: Date;
}

export { IBookingSummary as default, IBookingSummary }