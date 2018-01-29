import IXmlType from "xml/IXmlType";
import { ExceptionType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/pnr/exception/v1";

const GetCurrentBookingDataExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetCurrentBookingDataExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetCurrentBookingDataFaultDetailType : IXmlType = {
    props: {
        GetCurrentBookingData: { type: GetCurrentBookingDataExceptionType }
    }
};

const GetHistoricalBookingDataExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetHistoricalBookingDataExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetHistoricalBookingDataFaultDetailType : IXmlType = {
    props: {
        GetHistoricalBookingData: { type: GetHistoricalBookingDataExceptionType }
    }
};

export {
    namespaceURI,
    GetCurrentBookingDataExceptionType,
    GetCurrentBookingDataFaultDetailType,
    GetHistoricalBookingDataExceptionType,
    GetHistoricalBookingDataFaultDetailType
}