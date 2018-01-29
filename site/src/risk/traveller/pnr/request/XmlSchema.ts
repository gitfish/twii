import IXmlType from "xml/IXmlType";
import { dateTime, string } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";
import { PNRDataSubjectsType } from "risk/traveller/pnr/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/pnr/request/v1";

const GetCurrentBookingDataRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetCurrentBookingDataRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        BookingSystemCode: { type : string },
        BookingCreationTimeStamp: { type: dateTime, withTimezone: false },
        RecordLocator: { type: string },
        RequestedDataSubjects: { type: PNRDataSubjectsType }
    }
};

const GetHistoricalBookingDataRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetHistoricalBookingDataRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        BookingSystemCode: { type : string },
        BookingCreationTimeStamp: { type: dateTime, withTimezone: false },
        RecordLocator: { type: string }
    }
};

export {
    namespaceURI,
    GetCurrentBookingDataRequestType,
    GetHistoricalBookingDataRequestType
}