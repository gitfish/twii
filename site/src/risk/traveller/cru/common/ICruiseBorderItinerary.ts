interface ICruiseBorderItinerary {
    CruiseEndCbrArrDateTime?: Date;
    CruiseEndArrDateTime?: Date;
    CruiseEndArrCountryCode?: string;
    CruiseEndArrCountryName?: string;
    CruiseEndArrPortCode?: string;
    CruiseStartDepCbrArrDateTime?: Date;
    CruiseStartDepArrDateTime?: Date;
    CruiseStartDepArrCountryCode?: string;
    CruiseStartDepCountryName?: string;
    CruiseStartDepArrPortCode?: string;
    CbrArrDateTime?: Date;
    CbrDepDateTime?: Date;
    LocalPortCode?: string;
    ForeignPortCode?: string;
    DirectionCode?: string;
    OverAllLenghtOfTravel?: number;
    IntentToTravelDate?: Date;
    LastConnectionPortCode?: string;
    LastConnectionPortCountryCode?: string;
    LastConnectionCbrDateTime?: Date;
    LastConnectionDate?: Date;
    LastConnectionPortCountryName?: string;
    LastConnectionRouteID?: string;
    FirstConnectionPortCode?: string;
    FirstConnectionPortCountryCode?: string;
    FirstConnectionCbrDateTime?: Date;
    FirstConnectionDate?: Date;
    FirstConnectionPortCountryName?: string;
    FirstConnectionRouteID?: string;
    CruiseNextArrPortCode?: string;
    CruiseNextArrPortCountryCode?: string;
    CruiseNextArrCbrDateTime?: Date;
    CruiseNextArrDate?: Date;
    CruiseNextArrCountryName?: string;
    CruisePrevDepPortCode?: string;
    CruisePrevDepPortCountryCode?: string;
    CruisePrevCbrDateTime?: Date;
    CruisePrevDepCountryName?: string;
    CruisePrevDate?: Date;
    LocalScheduledDate?: Date;
    RouteID?: string;
    CruiseItineraryNumber?: number;
}

export { ICruiseBorderItinerary as default, ICruiseBorderItinerary }