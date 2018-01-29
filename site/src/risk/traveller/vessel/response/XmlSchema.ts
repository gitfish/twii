import IXmlType from "xml/IXmlType";
import  { dateTime, string, short } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";
import { VesselMovementInfoType } from "risk/traveller/vessel/common/XmlSchema";
import { VesselItineraryType } from "risk/traveller/vessel/XmlSchema";

const namespaceURI = "http://border.gov.au/service/vessel/schedule/response/v1";

const ListOfItineraryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfItineraryType",
    props: {
        VesselItinerary: { type: VesselItineraryType, array: true }
    }
};

const GetVesselScheduleResponseType : IXmlType = {
    namespaceURI : namespaceURI,
    name: "GetVesselScheduleResponseType",
    props: {
        VesselMovementInfo : { type : VesselMovementInfoType },
        ListOfVesselItinerary :  { type : ListOfItineraryType }

    }
}


export { namespaceURI, GetVesselScheduleResponseType, ListOfItineraryType }