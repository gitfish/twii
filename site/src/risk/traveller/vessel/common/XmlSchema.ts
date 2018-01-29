import IXmlType from "xml/IXmlType";
import  { date, dateTime, string, short } from "xml/SimpleXmlType";

const namespaceURI = "http://border.gov.au/service/vessel/common/v1";

const BookingRecordInfoType : IXmlType = {
    namespaceURI : namespaceURI,
    name: "BookingRecordInfoType",
    props: {
        BookingSystemCode : { type : string },
        RecordLocator : { type : string },
        CruiseCreationTimeStamp : { type : dateTime },
        CruiseSource : { type : string },
    }
}

const VesselMovementInfoType : IXmlType = {
    namespaceURI : namespaceURI,
    name: "VesselMovementInfoType",
    props: {
        DirectionCode : { type : string },
        LocalPortCode : { type : string },
        LocalScheduledDate : { type : date },
        VesselType : { type : string },
        RouteId : { type : string }
    }
}
export { namespaceURI, BookingRecordInfoType, VesselMovementInfoType }