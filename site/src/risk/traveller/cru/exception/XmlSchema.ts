import IXmlType from "xml/IXmlType";
import { ExceptionType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/cru/exception/v1";

const GetCurrentCruBookingDataExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetCurrentCruBookingDataExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetCurrentCruBookingDataFaultDetailType : IXmlType = {
    props: {
        GetCurrentCruBookingData: { type: GetCurrentCruBookingDataExceptionType }
    }
};

const GetHistoricalCruBookingDataExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetHistoricalCruBookingDataExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetHistoricalCruBookingDataFaultDetailType : IXmlType = {
    props: {
        GetHistoricalCruBookingData: { type: GetHistoricalCruBookingDataExceptionType }
    }
};

export {
    namespaceURI,
    GetCurrentCruBookingDataExceptionType,
    GetCurrentCruBookingDataFaultDetailType,
    GetHistoricalCruBookingDataExceptionType,
    GetHistoricalCruBookingDataFaultDetailType
}