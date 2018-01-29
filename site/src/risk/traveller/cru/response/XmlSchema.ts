import IXmlType from "xml/IXmlType";
import { CruiseBookingDataType, HistoricalRecordType, MatchedIATTravellerType } from "risk/traveller/cru/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/cru/response/v1";

const GetCurrentCruBookingDataResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetCurrentCruBookingDataResponseType",
    props: {
        CurrentCruBookingData: { type: CruiseBookingDataType }
    }
};

const ListOfHistoricalCruiseRecordType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfHistoricalCruiseRecordType",
    props: {
        Record: { type: HistoricalRecordType, array: true }
    }
};

const ListOfMatchedIATTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfMatchedIATTravellerType",
    props: {
        MatchedIATTraveller: { type: MatchedIATTravellerType, array: true }
    }
};

const GetHistoricalCruBookingDataResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetHistoricalCruBookingDataResponseType",
    props: {
        ListOfHistoricalCruiseRecord: { type: ListOfHistoricalCruiseRecordType },
        ListOfMatchedIATTraveller: { type: ListOfMatchedIATTravellerType }
    }
};

export {
    namespaceURI,
    GetCurrentCruBookingDataResponseType,
    GetHistoricalCruBookingDataResponseType
}