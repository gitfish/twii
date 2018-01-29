import IXmlType from "xml/IXmlType";
import { string, short, int, dateTime } from "xml/SimpleXmlType";
import { TravelDocInfoType, PersonInfoType } from "risk/traveller/iat/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/pnr/common/v1";

const PNRDataSubjectType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRDataSubjectType"
}

const PNRDataSubjectsType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRDataSubjectsType",
    props: {
        PNRDataSubject: { type: PNRDataSubjectType, array: true }
    }
};

const TravelDocType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravelDocType",
    props: {
        TravelDocInfo: { type: TravelDocInfoType },
        TravelDocDBT: { type: int }
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

const PNRTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRTravellerType",
    props: {
        PassengerTattoo: { type: short },
        TravelDoc: { type: TravelDocType },
        Biographic: { type: PersonInfoType },
        ReservationName: { type: ReservationNameType }
    }
};

const IATTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "IATTravellerType",
    props: {
        IATTravellerId: { type: string },
        TravelDoc: { type: TravelDocType },
        Biographic: { type: PersonInfoType },
        MatchedTravelDoc: { type: TravelDocType }
    }
};

const CheckInInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CheckInInfoType",
    props: {
        personInfo: { type: PersonInfoType },
        CheckinSequence: { type: string },
        checkInAgent: { type: string },
        canberraCheckInDateTime: { type: dateTime },
        checkInCountryCode: { type: string },
        checkInCountryName: { type: string },
        checkInDateTime: { type: dateTime },
        checkInPortCode: { type: string }
    }
};

export {
    namespaceURI,
    PNRDataSubjectsType,
    ReservationNameType,
    PNRTravellerType,
    IATTravellerType,
    CheckInInfoType
}