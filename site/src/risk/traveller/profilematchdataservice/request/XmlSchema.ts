import IXmlType from "xml/IXmlType";
import { dateTime, string, short } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";
//import { BookingKeyType } from "risk/traveller/profilematchdataservice/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchdataservice/request/v1";


const BookingKeyType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingKeyType",
    props: {
        BookingSystemCode: { type: string },
        BookingCreationTimeStamp: { type: dateTime, withTimezone: false },
        RecordLocator: { type: string }
    }
};

const GetProfileMatchesRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        pnrBusinessKey: { type : BookingKeyType },
        CruiseBusinessKey: { type: BookingKeyType },
        IATTravellerId: { type: string } /* no type in the xsd */
    }
};

const ListOfPassengerTattooType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfPassengerTattooType",
    props: {
        PassengerTattoo: { type: short }
    }
};

const GetProfileMatchesByPNRRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesByPNRRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        pnrBusinesBookingSystemCodesKey: { type : string },
        BookingCreationTimeStamp: { type : dateTime },
        RecordLocator: { type : string },
    }
};

export {
    namespaceURI,
    GetProfileMatchesRequestType, 
    ListOfPassengerTattooType, 
    GetProfileMatchesByPNRRequestType

}

