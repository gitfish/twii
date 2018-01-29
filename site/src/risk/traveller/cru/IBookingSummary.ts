interface IBookingSummary {
    TravelType?: string;
    BookingDate?: Date;
    BookingCity?: string;
    CurrentBookingDBT?: number;
    TotalLengthOfTravel?: number;
    InitialCountryCode?: string;
    InitialBoardingDate?: Date;
    InitialBoardingPortCode?: string;
    LastDisembarkingDate?: Date;
    LastDisembarkingPortCode?: string;
    DisembarkingCountryCode?: string;
    CruiseStartDate?: Date;
    CruiseStartPort?: string;
    CruiseEndDate?: Date;
    CruiseEndPort?: string;
    CancelledIndicator?: boolean;
    NoOfBorderMovements?: number;
    NoOfCruiseSegments?: number;
    NoOfMinorsInGroup?: number;
    NoOfTeensInGroup?: number;
    NoOfAdultsIngroup?: number;
    NoOfSeniorsInGroup?: number;
    MostTimeSpentCruiseRegion?: string;
}

export { IBookingSummary as default, IBookingSummary }