import IPNRService from "./IPNRService";
import IPNRServiceResponse from "./IPNRServiceResponse";
import IPNRSearchRequest from "./IPNRSearchRequest";
import IPNRSearchResult from "./IPNRSearchResult";
import IPNRKey from "./IPNRKey";
import * as DateUtils from "util/Date";
import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRTicket from "./IPNRTicket";
import IPNRCheckinBagsInfo from "./IPNRCheckinBagsInfo";
import IPersonHistoricalPNR from "./IPersonHistoricalPNR";
import IPNRAirlineArrangement from "./IPNRAirlineArrangement";
import IIATTravellerHistoricalPNR from "./IIATTravellerHistoricalPNR";
import IPNRActiveItinerary from "./IPNRActiveItinerary";
import IPNRCheckInAndBoarding from "./IPNRCheckInAndBoarding";
import IPNRPushHistory from "./IPNRPushHistory";
import IPNRTravelSummary from "./IPNRTravelSummary";
import IPNRTravelStay from "./IPNRTravelStay";
import IPNRRemarkFreeText from "./IPNRRemarkFreeText";
import IPNROtherServiceInfo from "./IPNROtherServiceInfo";
import IProfileDetailsAssociatedWithPnr from "./IProfileDetailsAssociatedWithPnr";
import IPNRSpecialServiceRequest from "./IPNRSpecialServiceRequest";
import IPNRTravelAgent from "./IPNRTravelAgent";
import ILinkedOrSplitPnr from "./ILinkedOrSplitPnr";
import IPNRContactDetails from "./IPNRContactDetails";
import IPNRHistory from "./IPNRHistory";

const createSearchResponse = (request : IPNRSearchRequest) => {
    return {
        data: [
            {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-01",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "0",
                "familyName": "Targaryen",
                "firstORouteId": "AA99",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-01",
                "intentToEndTravelDate": "2017-08-21",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys Khaleesi",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q6O",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys Khaleesi",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-07-02T12:27:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q6O",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-07-29T08:28:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q6O",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-09-29T09:29:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              }
              ,
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q61",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q63",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-21",
                "intentToEndTravelDate": "2018-01-30",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-21",
                "intentToEndTravelDate": "2018-01-30",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "2A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF24",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-02-22",
                "intentToEndTravelDate": "2018-02-22",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF24",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-11",
                "intentToEndTravelDate": "2018-01-15",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q63",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2017-08-21",
                "intentToEndTravelDate": "2017-09-13",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-21",
                "intentToEndTravelDate": "2018-01-30",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-21",
                "intentToEndTravelDate": "2018-01-30",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "2A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF24",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-02-22",
                "intentToEndTravelDate": "2018-02-22",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF24",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-11",
                "intentToEndTravelDate": "2018-01-15",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF23",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-21",
                "intentToEndTravelDate": "2018-01-30",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "2A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF24",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-02-22",
                "intentToEndTravelDate": "2018-02-22",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              },
              {
                "dateOfBirth": "19930929",
                "firstOLocalScheduledDate": "2017-08-21",
                "firstIRouteId": "QF162",
                "countryOfIssue": "KINGS LANDING",
                "documentFamilyName": "DRACARYS",
                "passengerTattoo": "2",
                "familyName": "Targaryen",
                "firstORouteId": "QF24",
                "givenName": "Daenerys",
                "intentToTravelDate": "2018-01-11",
                "intentToEndTravelDate": "2018-01-15",
                "documentFreeText": "P/NZL/LH379628/NZL/29SEP93/F/13JAN19/Targaryen/Daenerys",
                "firstILocalPortCode": "SYD",
                "recordLocator": "QC4Q65",
                "firstIForeignPortCode": "WLG",
                "givenNames": "Daenerys",
                "gender": "F",
                "firstOForeignPortCode": "BKK",
                "bookingSystemCode": "1A",
                "pnrCreationTimestamp": "2017-05-29T05:25:00.000+11:00",
                "travelDocumentNbr": "LH379628",
                "firstOLocalPortCode": "SYD",
                "firstILocalScheduledDate": "2017-08-21"
              }
        ]
    }
};

const createTicketPaymentResponse = (request : IPNRKey) => {
    return {
        data: [
            {
                "amount" : "100",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "10",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "200",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "10",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "500",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "40",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "600",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "40",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "230",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "25",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "800",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "80",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "1620",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "62",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "370",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "37",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "110",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "11",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "320",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "32",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "185",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "18.5",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "180",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "18",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "980",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "98",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "150",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "15",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "760",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "70",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "650",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "65",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              }, 
              {
                "amount" : "340",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "34",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              },
              {
                "amount" : "200",
                "recordLocator": "404719",
                "paymentModeCode" : "1",
                "currencyCode" : "1",
                "tax" : "10",
                "creditCardNbr" : "123456789",
                "paymentType" : "1",
                "creditCardName": "Visa",
                "pnrPaymentFreeText": "Paid",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
              }
        ]
    }
};

const createTicketingResponse = (request : IPNRKey) => {
    return {
        data: [
            {
                "segmentTattoo": "0",
                "recordLocator": "404719",
                "passengerTattoo": "1",
                "familyName": "KEATING",
                "ticketNbr": "0814500285583",
                "dataIndicator": "3  ",
                "givenName": "Shaun",
                "pnrCreationTimestamp": "2017-11-14 13:24:00.0",
                "bookingSystemCode": "EK"
            }
        ]
    }
};

class MockPNRService implements IPNRService {
    searchPNRResponseFactory : (request : IPNRSearchRequest) => IPNRServiceResponse<IPNRSearchResult> = createSearchResponse;
    getPNRTicketPaymentDetailsResponseFactory : (key : IPNRKey) => IPNRServiceResponse<IPNRTicketPayment> = createTicketPaymentResponse;
    getPNRTicketingDetailsResponseFactory : (key : IPNRKey) => IPNRServiceResponse<IPNRTicket> = createTicketingResponse;

    searchPNR(request : IPNRSearchRequest) : Promise<IPNRServiceResponse<IPNRSearchResult>> {
        return Promise.resolve(this.searchPNRResponseFactory(request));
    }
    getPNRTicketPaymentDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicketPayment>> {
        return Promise.resolve(this.getPNRTicketPaymentDetailsResponseFactory(key));
    }
    getPNRTicketingDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicket>> {
        return Promise.resolve(this.getPNRTicketingDetailsResponseFactory(key));
    }
    getPNRCheckinBagsInfo(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRCheckinBagsInfo>> {
        return null;
    }
    getPersonHistoricalPNR(key : IPNRKey) : Promise<IPNRServiceResponse<IPersonHistoricalPNR>> {
        return null;
    }
    getPNRAirlineArrangement(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRAirlineArrangement>> {
        return null;
    }
    getIATTravellerHistoricalPNR(key : IPNRKey) : Promise<IPNRServiceResponse<IIATTravellerHistoricalPNR>> {
        return null;
    }
    getPNRActiveItenaryDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRActiveItinerary>> {
        return null;
    }
    getPNRCheckInAndBoardingDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRCheckInAndBoarding>> {
        return null;
    }
    getPNRPushHistory(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRPushHistory>> {
        return null;
    }
    getPNRTravelSummaryDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelSummary>> {
        return null;
    }
    getPNRTravelStayDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelStay>> {
        return null;
    }
    getPNRRemarksFreeText(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRRemarkFreeText>> {
        return null;
    }
    getPNROtherServiceInformation(key : IPNRKey) : Promise<IPNRServiceResponse<IPNROtherServiceInfo>> {
        return null;
    }
    getProfileDetailsAssociatedWithPnr(key : IPNRKey) : Promise<IPNRServiceResponse<IProfileDetailsAssociatedWithPnr>> {
        return null;
    }
    getPNRSpecialServiceRequest(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRSpecialServiceRequest>> {
        return null;
    }
    getPnrTravelAgentDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRTravelAgent>> {
        return null;
    }
    getLinkedOrSplitPnrDetails(key : IPNRKey) : Promise<IPNRServiceResponse<ILinkedOrSplitPnr>> {
        return null;
    }
    getPnrContactsDetails(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRContactDetails>> {
        return null;
    }
    getPNRHistory(key : IPNRKey) : Promise<IPNRServiceResponse<IPNRHistory>> {
        return null;
    }
}

export { MockPNRService as default, MockPNRService }