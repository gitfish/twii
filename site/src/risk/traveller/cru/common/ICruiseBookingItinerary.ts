import ICruiseBorderItinerary from "./ICruiseBorderItinerary";

interface ICruiseBookingItineraryType {
    ArrivalDateTime?: Date;
    ArrivalPortCode?: string;
    ArrivalPortName?: string;
    ArrivalPortCountryCode?: string;
    BoardingDateTime?: string;
    DepartureDateTime?: string;
    DeparturePortCode?: string;
    DeparturePortName?: string;
    DeparturePortCountryCode?: string;
    CruiseItineraryNumber?: number;
    CruiseBorderItinerary?: ICruiseBorderItinerary;
}

export { ICruiseBookingItineraryType as default, ICruiseBorderItinerary }