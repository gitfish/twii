interface IVesselItinerary {
    BorderPortInd? : string;
    RouteId? : string;
    LocalScheduledDate? : Date;
    LocalPortCode? : string;
    DirectionCode? : string;
    ForeignPortCode? : string;
    LocalScheduledDayOfWeek? : string;
    FullRountingText ? : string;
    ArrivalDateTime? : Date;
    ArrivalPortCode? : string;
    ArrivalPortName? : string;
    ArrivalPortCountryCode? : string;
    ArrivalPortCountryName? : string;
    DepartureDateTime? : Date;
    CanberraDepartureDateTime? : Date;
    CanberraArrivalDateTime? : Date;
    DeparturePortCode? : string;
    DeparturePortName? : string;
    DeparturePortCountryCode? : string;

}

export { IVesselItinerary as default, IVesselItinerary }