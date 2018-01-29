const express = require("express");

const route = express.Router();

const GetVesselScheduleSoapAction = "http://border.gov.au/service/vessesl/v1/GetVesselSchedule";

const GetVesselScheduleFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/pnr/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>TME103-Invalid Service Request Input</faultstring>
         <detail>
            <exe:GetVesselSchedule>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME103</com:errorCode>
                  <com:errorDescription>Invalid Service Request Input: A schema validation error has occurred while parsing the XML document**/XMLNSC/http://schemas.xmlsoap.org/soap/envelope/:Envelope/http://schemas.xmlsoap.org/soap/envelope/:Body/http://border.gov.au/service/risk/traveller/profilematchdataservice/request/v1:GetProfileMatchesRequest/IATTravellerId**cvc-datatype-valid.1.2: The value "?" is not a valid value for the "dateTime" datatype.**XML Parsing Errors have occurred**problem creating SOAP tree from bitstream**3c736f6170656e763a456e76656c6f706520786d6c6e733a736f6170656e763d22687474703a2f2f736368656d61732e786d6c736f61702e6f72672f736f61702f656e76656c6f70652f2220786d6c6e733a76313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f706e722f726571756573742f76312220786d6c6e733a7631313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f636f6d6d6f6e2f7631223e0a2020203c736f6170656e763a4865616465722f3e0a2020203c736f6170656e763a426f64793e0a2020202020203c76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020202020202020203c526571756573744865616465723e0a2020202020202020202020203c7631313a636f7272656c6174696f6e5265717565737449643e3f3c2f7631313a636f7272656c6174696f6e5265717565737449643e0a2020202020202020202020203c7631313a7573657249643e3f3c2f7631313a7573657249643e0a2020202020202020202020203c7631313a7265717565737454696d655374616d703e3f3c2f7631313a7265717565737454696d655374616d703e0a2020202020202020203c2f526571756573744865616465723e0a2020202020202020203c426f6f6b696e6753797374656d436f64653e3f3c2f426f6f6b696e6753797374656d436f64653e0a2020202020202020203c426f6f6b696e674372656174696f6e54696d655374616d703e3f3c2f426f6f6b696e674372656174696f6e54696d655374616d703e0a2020202020202020203c5265636f72644c6f6361746f723e3f3c2f5265636f72644c6f6361746f723e0a2020202020203c2f76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020203c2f736f6170656e763a426f64793e0a3c2f736f6170656e763a456e76656c6f70653e**Root**Error occurred in ImbSOAPInputHelper::validateSOAPInput()**Node throwing exception**</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetVesselSchedule>
         </detail>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

const GetVesselScheduleResponse =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
       <soapenv:Body>
          <GetVesselScheduleResponse xmlns="http://border.gov.au/service/vessel/schedule/response/v1" xmlns:vescom="http://border.gov.au/service/vessel/common/v1" xmlns:vessch="http://border.gov.au/service/vessel/schedule/v1">
             <VesselMovementInfo>
                <vescom:DirectionCode>I</vescom:DirectionCode>
                <vescom:LocalPortCode>SYD</vescom:LocalPortCode>
                <vescom:VesselType>AIR</vescom:VesselType>
                <vescom:RouteId>SQ211</vescom:RouteId>
             </VesselMovementInfo>
             <ListOfVesselItinerary>
                <VesselItinerary>
                    <vessch:BorderPortInd>Y</vessch:BorderPortInd>
                    <vessch:RouteId>SQ211</vessch:RouteId>
                    <vessch:LocalScheduledDate>2017-06-14</vessch:LocalScheduledDate>
                    <vessch:LocalPortCode>SYD</vessch:LocalPortCode>
                    <vessch:DirectionCode>I</vessch:DirectionCode>
                    <vessch:ForeignPortCode>SIN</vessch:ForeignPortCode>
                    <vessch:LocalScheduledDayOfWeek>Wed</vessch:LocalScheduledDayOfWeek>
                    <vessch:FullRountingText>SINSYD</vessch:FullRountingText>
                    <vessch:ArrivalDateTime>2017-06-14T19:15:00</vessch:ArrivalDateTime>
                    <vessch:ArrivalPortCode>SYD</vessch:ArrivalPortCode>
                    <vessch:ArrivalPortName>Sydney Kingsford Smith Apt</vessch:ArrivalPortName>
                    <vessch:ArrivalPortCountryCode>AUS</vessch:ArrivalPortCountryCode>
                    <vessch:ArrivalPortCountryName>AUSTRALIA</vessch:ArrivalPortCountryName>
                    <vessch:DepartureDateTime>2017-06-14T09:35:00</vessch:DepartureDateTime>
                    <vessch:CanberraDepartureDateTime>2017-06-14T11:35:00</vessch:CanberraDepartureDateTime>
                    <vessch:CanberraArrivalDateTime>2017-06-14T19:15:00</vessch:CanberraArrivalDateTime>
                    <vessch:DeparturePortCode>SIN</vessch:DeparturePortCode>
                    <vessch:DeparturePortName>Singapore Changi Apt</vessch:DeparturePortName>
                    <vessch:DeparturePortCountryCode>SGP</vessch:DeparturePortCountryCode>
                </VesselItinerary>
             </ListOfVesselItinerary>
          </GetVesselScheduleResponse>
       </soapenv:Body>
    </soapenv:Envelope>`;

const NoSoapActionFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>No SOAP Action specified</faultstring>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;


route.post("/VesselDataService", (req, res) => {

    console.log("======================================================");
    console.log("mock /VesselDataService");
    console.log("======================================================");

    const timestamp = new Date().getTime();
    const faultItUp = false;  //timestamp % 2 === 0;
    const soapAction = req.get("SOAPAction");
    res.set("Content-Type", "text/xml");

    if(soapAction === GetVesselScheduleSoapAction) {
        if(faultItUp) {
            res.status(500).send(GetVesselScheduleFault);
        } else {
            res.send(GetVesselScheduleResponse);
        }
    }else {
        res.status(500).send(NoSoapActionFault);
    }
});

module.exports = route;
