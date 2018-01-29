import IXmlType from "xml/IXmlType";
import { ExceptionType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchdataservice/exception/v1";

const GetProfileMatchesByTravellerIdExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesByTravellerIdExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetProfileMatchesByTravellerIdFaultDetailType : IXmlType = {
    props: {
        GetProfileMatches: { type: GetProfileMatchesByTravellerIdExceptionType }
    }
};

const GetProfileMatchesByBookingExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesByBookingExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetProfileMatchesByBookingFaultDetailType : IXmlType = {
    props: {
        GetProfileMatchesByBooking: { type: GetProfileMatchesByBookingExceptionType }
    }
};

const GetPNRProfileMatchesExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetPNRProfileMatchesExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetPNRProfileMatchesFaultDetailType : IXmlType = {
    props: {
        GetPNRProfileMatches: { type: GetPNRProfileMatchesExceptionType }
    }
};


const GetProfileMatchesByPNRExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesByPNRExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetProfileMatchesByPNRFaultDetailType : IXmlType = {
    props: {
        GetProfileMatchesByPNR: { type: GetProfileMatchesByPNRExceptionType }
    }
};

const GetProfileMatchesExceptionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesExceptionType",
    props: {
        exception: { type: ExceptionType }
    }
};

const GetProfileMatchesFaultDetailType : IXmlType = {
    props: {
        GetProfileMatches: { type: GetProfileMatchesExceptionType }
    }
};

export {GetProfileMatchesByTravellerIdFaultDetailType, 
    GetProfileMatchesByBookingFaultDetailType,
    GetPNRProfileMatchesFaultDetailType, 
    GetProfileMatchesByPNRFaultDetailType, 
    GetProfileMatchesFaultDetailType };