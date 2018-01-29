import IXmlType from "xml/IXmlType";
import { ExceptionType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/vessel/schedule/exception/v1";

const GetVesselScheduleExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetVesselScheduleExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

export { namespaceURI, GetVesselScheduleExceptionType }