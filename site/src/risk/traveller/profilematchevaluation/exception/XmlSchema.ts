import IXmlType from "xml/IXmlType";
import { ExceptionType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchevaluation/exception/v1";

const RecordActionExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "RecordActionExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const RecordActionFaultDetailType : IXmlType = {
    props: {
        RecordActionRequest: { type: RecordActionExceptionType }
    }
};

const GetProfileDismissalReasonExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileDismissalReasonExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetProfileDismissalReasonFaultDetailType : IXmlType = {
    props: {
        GetProfileDismissalReasonRequest: { type: GetProfileDismissalReasonExceptionType }
    }
};

export {
    namespaceURI,
    RecordActionFaultDetailType,
    RecordActionExceptionType,
    GetProfileDismissalReasonExceptionType,
    GetProfileDismissalReasonFaultDetailType
}