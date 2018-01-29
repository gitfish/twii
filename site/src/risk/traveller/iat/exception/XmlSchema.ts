import IXmlType from "xml/IXmlType";
import { ExceptionType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/iat/exception/v1";

const GetTravellerHistoryExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetTravellerHistoryExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetTravellerHistoryFaultDetailType : IXmlType = {
    props: {
        GetTravellerHistory: { type: GetTravellerHistoryExceptionType }
    }
};

export {
    namespaceURI,
    GetTravellerHistoryExceptionType,
    GetTravellerHistoryFaultDetailType
}