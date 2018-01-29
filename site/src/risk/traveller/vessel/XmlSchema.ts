import IXmlType from "xml/IXmlType";
import  { date, dateTime, string, short } from "xml/SimpleXmlType";

const namespaceURI = "http://border.gov.au/service/vessel/schedule/v1";

const VesselItineraryType : IXmlType = {
    namespaceURI : namespaceURI,
    name: "VesselItineraryType",
    props: {
        BorderPortInd : { type : string },
        RouteId : { type : string },
        LocalScheduledDate : { type : date },
        LocalPortCode : { type : string },
        DirectionCode : { type : string },
        ForeignPortCode : { type : string },
        LocalScheduledDayOfWeek : { type : string },
        FullRountingText : { type : string },
        ArrivalDateTime : { type : dateTime }, 
        ArrivalPortCode : { type : string },
        ArrivalPortName : { type : string },
        ArrivalPortCountryCode : { type : string },
        ArrivalPortCountryName : { type : string },
        DepartureDateTime : { type : dateTime }, 
        CanberraDepartureDateTime : { type : dateTime },
        CanberraArrivalDateTime : { type : dateTime },
        DeparturePortCode : { type : string },
        DeparturePortName : { type : string },
        DeparturePortCountryCode : { type : string }

    }
}

export { namespaceURI, VesselItineraryType }