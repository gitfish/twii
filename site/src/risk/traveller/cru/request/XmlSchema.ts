import IXmlType from "xml/IXmlType";
import { string, dateTime } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";
import { CRUDataSubjectsType } from "risk/traveller/cru/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/cru/request/v1";

const GetCurrentCruBookingDataRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetCurrentCruBookingDataRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        BookingSystemCode: { type: string },
        BookingCreationTimeStamp: { type: dateTime, withTimezone: false },
        RecordLocator: { type: string },
        RequestedDataSubjects: { type: CRUDataSubjectsType }
    }
};

const GetHistoricalCruBookingDataRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetHistoricalCruBookingDataRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        BookingSystemCode: { type: string },
        BookingCreationTimeStamp: { type: dateTime, withTimezone: false },
        RecordLocator: { type: string },
    }
};


export {
    namespaceURI,
    GetCurrentCruBookingDataRequestType,
    GetHistoricalCruBookingDataRequestType
}

