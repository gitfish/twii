import IXmlType from "xml/IXmlType";
import { string } from "xml/SimpleXmlType";
const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchevaluation/response/v1";

const ResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ResponseType",
    restriction: { base: string }
};

const DismissalReasonType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "DismissalReasonType",
    props: {
        ProfileName: { type: string },
        DismissalReason: { type: string },
        ProfileVersion: { type: string }
    }
};

const ListOfDismissalReasonType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfDismissalReasonType",
    props: {
        DismissalReason: { type: DismissalReasonType, array: true }
    }
};

const GetProfileDismissalReasonResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileDismissalReasonResponseType",
    props: {
        ListOfDismissalReason: { type: ListOfDismissalReasonType }
    }
};

const RecordActionResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "RecordActionResponseType",
    props: {
        Response: { type: ResponseType },
        ErrorMessage: { type: string }
    }
};

export {
    namespaceURI,
    GetProfileDismissalReasonResponseType,
    RecordActionResponseType
}