import IBookingRecordInfo from "./IBookingRecordInfo";
import ICruiseBooking from "./ICruiseBooking";
import IListOfCruiseBookingItinerary from "./IListOfCruiseBookingItinerary";
import IListOfTravellerSummary from "./IListOfTravellerSummary";

interface ICruiseBookingData {
    BookingRecordInfo?: IBookingRecordInfo;
    CruiseBooking?: ICruiseBooking;
    CruiseBookingItineraries?: IListOfCruiseBookingItinerary;
    TravellerInfo?: IListOfTravellerSummary;
}

export { ICruiseBookingData as default, ICruiseBookingData }