import IXmlType from "xml/IXmlType";
import { string, dateTime } from "xml/SimpleXmlType";
const namespaceURI = "http://border.gov.au/service/risk/traveller/common/v1";

const YesNoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "YesNoType"
};

const RequestHeaderType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "RequestHeaderType",
    props: {
        correlationRequestId: { type: string },
        userId: { type: string },
        userRole: { type: string },
        sourceSystemId: { type : string },
        requestTimeStamp: { type: dateTime }
    }
};

const ExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ExceptionType",
    props: {
        status: { type: string },
        errorCode: { type: string },
        errorDescription: { type: string },
        sourceSystem: { type: string }
    }
};

export {
    namespaceURI,
    RequestHeaderType,
    YesNoType,
    ExceptionType
}