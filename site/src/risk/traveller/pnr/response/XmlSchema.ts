import { IXmlType } from "xml/IXmlType";
import { PNRRecordType, HistoricalPNRRecordType, MatchedIATTravellerType } from "risk/traveller/pnr/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/pnr/response/v1";

const GetCurrentBookingDataResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetCurrentBookingDataResponseType",
    props: {
        CurrentBookingData: { type: PNRRecordType }
    }
};

const ListOfHistoricalPNRRecordType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfHistoricalPNRRecordType",
    props: {
        PNRRecord: { type: HistoricalPNRRecordType, array: true }
    }
};

const ListOfMatchedIATTraveller : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfMatchedIATTraveller",
    props: {
        MatchedIATTraveller: { type: MatchedIATTravellerType, array: true }
    }
};

const GetHistoricalBookingDataResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetHistoricalBookingDataResponseType",
    props: {
        ListOfHistoricalPNRRecord: { type: ListOfHistoricalPNRRecordType },
        ListOfMatchedIATTraveller: { type: ListOfMatchedIATTraveller }
    }
};

export {
    namespaceURI,
    GetCurrentBookingDataResponseType,
    GetHistoricalBookingDataResponseType
}