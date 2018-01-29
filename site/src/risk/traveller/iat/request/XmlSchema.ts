import IXmlType from "xml/IXmlType";
import { string } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";
import { IATDataSubjectsType } from "risk/traveller/iat/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/iat/request/v1";

const ListOfIATTravellerIdType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfIATTravellerIdType",
    props: {
        IATTravellerId: { type: string }
    }
};

const GetTravellerHistoryRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetTravellerHistoryRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        ListOfIATTravellerId: { type: ListOfIATTravellerIdType },
        RequestedDataSubjects: { type: IATDataSubjectsType }
    }
};

export {
    namespaceURI,
    GetTravellerHistoryRequestType
}