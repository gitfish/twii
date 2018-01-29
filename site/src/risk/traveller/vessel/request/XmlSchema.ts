import IXmlType from "xml/IXmlType";
import  { dateTime, string, short } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";
import { VesselMovementInfoType } from "risk/traveller/vessel/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/vessel/schedule/request/v1";

const GetVesselScheduleRequestType : IXmlType = {
    namespaceURI : namespaceURI,
    name: "GetVesselScheduleRequestType",
    props: {
        RequestHeader : { type : Object.assign({}, RequestHeaderType, { namespaceURI: "http://border.gov.au/service/vessel/common/v1" }) },
        MovementInfo :  { type : VesselMovementInfoType }
    }
}

export { namespaceURI, GetVesselScheduleRequestType }