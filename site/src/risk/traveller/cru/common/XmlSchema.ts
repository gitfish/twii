import { IXmlType } from "xml/IXmlType";
import { string, dateTime, date, int, time } from "xml/SimpleXmlType";
import { ContactType as ContactTypeEnum } from "./ContactType";
import { TravelDocInfoType as IATTravelDocInfoType, PersonInfoType } from "risk/traveller/iat/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/cru/common/v1";

const CRUDataSubjectsType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CRUDataSubjectsType",
    props: {
        CRUDataSubject: { type: string, array: true }
    }
};

const ContactType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ContactType",
    props: {
        ID: { type: string },
        Type: {
            type: {
                restriction: { 
                    base: string
                }
            }
        },
        Text: { type: string },
        HomePhoneNumber: { type: string },
        Email: { type: string },
        FaxNumber: { type: string }
    }
};

const AddressType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "AddressType",
    props: {
        ID: { type: string },
        Type: { type: string },
        Line1: { type: string },
        Line2: { type: string },
        Line3: { type: string },
        Line4: { type: string },
        Line5: { type: string },
        PostCode: { type: string },
        City: { type: string },
        State: { type: string },
        CountryCode: { type: string }
    }
};

const CruiseBorderItineraryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CruiseBorderItineraryType",
    props: {
        CruiseEndCbrArrDateTime: { type: dateTime },
        CruiseEndArrDateTime: { type: dateTime },
        CruiseEndArrCountryCode: { type: string },
        CruiseEndArrCountryName: { type: string },
        CruiseEndArrPortCode: { type: string },
        CruiseStartDepCbrArrDateTime: { type: dateTime },
        CruiseStartDepArrDateTime: { type: dateTime },
        CruiseStartDepArrCountryCode: { type: string },
        CruiseStartDepCountryName: { type: string },
        CruiseStartDepArrPortCode: { type: string },
        CbrArrDateTime: { type: dateTime },
        CbrDepDateTime: { type: dateTime },
        LocalPortCode: { type: string },
        ForeignPortCode: { type: string },
        DirectionCode: { type: string },
        OverAllLenghtOfTravel: { type: int },
        IntentToTravelDate: { type: date },
        LastConnectionPortCode: { type: string },
        LastConnectionPortCountryCode: { type: string },
        LastConnectionCbrDateTime: { type: dateTime },
        LastConnectionDate: { type: date },
        LastConnectionPortCountryName: { type: string },
        LastConnectionRouteID: { type: string },
        FirstConnectionPortCode: { type: string },
        FirstConnectionPortCountryCode: { type: string },
        FirstConnectionCbrDateTime: { type: dateTime },
        FirstConnectionDate: { type: date },
        FirstConnectionPortCountryName: { type: string },
        FirstConnectionRouteID: { type: string },
        CruiseNextArrPortCode: { type: string },
        CruiseNextArrPortCountryCode: { type: string },
        CruiseNextArrCbrDateTime: { type: dateTime },
        CruiseNextArrDate: { type: date },
        CruiseNextArrCountryName: { type: string },
        CruisePrevDepPortCode: { type: string },
        CruisePrevDepPortCountryCode: { type: string },
        CruisePrevCbrDateTime: { type: dateTime },
        CruisePrevDepCountryName: { type: string },
        CruisePrevDate: { type: date },
        LocalScheduledDate: { type: date },
        RouteID: { type: string },
        CruiseItineraryNumber: { type: int }
    }
};

const CruiseBookingItineraryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CruiseBookingItineraryType",
    props: {
        ArrivalDateTime: { type: dateTime },
        ArrivalPortCode: { type: string },
        ArrivalPortName: { type: string },
        ArrivalPortCountryCode: { type: string },
        BoardingDateTime: { type: string },
        DepartureDateTime: { type: string },
        DeparturePortCode: { type: string },
        DeparturePortName: { type: string },
        DeparturePortCountryCode: { type: string },
        CruiseItineraryNumber: { type: int },
        CruiseBorderItinerary: { type: CruiseBorderItineraryType }
    }
};

const ConnectionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ConnectionType",
    props: {
        ArrivalPortName: { type: string },
        ArrivalDate: { type: date },
        ArrivalTime: { type: time },
        ArrivalPortCode: { type: string },
        ArrivalCountryCode: { type: string },
        BlockNumber: { type: int },
        DeparturePortName: { type: string },
        DepartureDate: { type: date },
        DepartureTime: { type: time },
        DeparturePortCode: { type: string },
        DepartureCountryCode: { type: string },
        Direction: { type: string },
        FareClass: { type: string },
        RouteId: { type: string },
        ParentRouteId: { type: string },
        inboundConxIndicator: { type: string },
        inboundConxPortCode: { type: string }
    }
};

const ReservationNameType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ReservationNameType",
    props: {
        familyName: { type: string },
        givenName: { type: string }
    }
};

const TravelDocInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravelDocInfoType",
    extension: { base: IATTravelDocInfoType },
    props: Object.assign({}, IATTravelDocInfoType.props, {
        ImmigrationDocID: { type: string },
        ImmigrationDeptCountryCode: { type: string },
        TravelDocPlaceOfIssue: { type: string },
        TravelDocIssueDbt: { type: int },
        TravelDocNationality: { type: string }
    })
};

const IATTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "IATTravellerType",
    props: {
        IATTravellerId: { type: string },
        TravelDoc: { type: TravelDocInfoType },
        Biographic: { type: PersonInfoType },
        MatchedTravelDoc: { type: TravelDocInfoType }
    }
};

export {
    namespaceURI,
    CRUDataSubjectsType,
    ContactType,
    AddressType,
    CruiseBookingItineraryType,
    ConnectionType,
    ReservationNameType,
    TravelDocInfoType,
    IATTravellerType
}

