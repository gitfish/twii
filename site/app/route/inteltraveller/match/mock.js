const express = require("express");

const route = express.Router();

const GetProfileMatchesSoapAction = "http://border.gov.au/service/risk/traveller/profilematchdataserviceService/v1/GetProfileMatches";
//const GetProfileMatchesByPNRSoapAction = "http://border.gov.au/risk/traveller/ProfileMatchDataService/v1/GetProfileMatchesByPNR";

const GetProfileMatchesFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/pnr/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>TME103-Invalid Service Request Input</faultstring>
         <detail>
            <exe:GetProfileMatches>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME103</com:errorCode>
                  <com:errorDescription>Invalid Service Request Input: A schema validation error has occurred while parsing the XML document**/XMLNSC/http://schemas.xmlsoap.org/soap/envelope/:Envelope/http://schemas.xmlsoap.org/soap/envelope/:Body/http://border.gov.au/service/risk/traveller/profilematchdataservice/request/v1:GetProfileMatchesRequest/IATTravellerId**cvc-datatype-valid.1.2: The value "?" is not a valid value for the "dateTime" datatype.**XML Parsing Errors have occurred**problem creating SOAP tree from bitstream**3c736f6170656e763a456e76656c6f706520786d6c6e733a736f6170656e763d22687474703a2f2f736368656d61732e786d6c736f61702e6f72672f736f61702f656e76656c6f70652f2220786d6c6e733a76313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f706e722f726571756573742f76312220786d6c6e733a7631313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f636f6d6d6f6e2f7631223e0a2020203c736f6170656e763a4865616465722f3e0a2020203c736f6170656e763a426f64793e0a2020202020203c76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020202020202020203c526571756573744865616465723e0a2020202020202020202020203c7631313a636f7272656c6174696f6e5265717565737449643e3f3c2f7631313a636f7272656c6174696f6e5265717565737449643e0a2020202020202020202020203c7631313a7573657249643e3f3c2f7631313a7573657249643e0a2020202020202020202020203c7631313a7265717565737454696d655374616d703e3f3c2f7631313a7265717565737454696d655374616d703e0a2020202020202020203c2f526571756573744865616465723e0a2020202020202020203c426f6f6b696e6753797374656d436f64653e3f3c2f426f6f6b696e6753797374656d436f64653e0a2020202020202020203c426f6f6b696e674372656174696f6e54696d655374616d703e3f3c2f426f6f6b696e674372656174696f6e54696d655374616d703e0a2020202020202020203c5265636f72644c6f6361746f723e3f3c2f5265636f72644c6f6361746f723e0a2020202020203c2f76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020203c2f736f6170656e763a426f64793e0a3c2f736f6170656e763a456e76656c6f70653e**Root**Error occurred in ImbSOAPInputHelper::validateSOAPInput()**Node throwing exception**</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetProfileMatches>
         </detail>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

const GetProfileMatchesResponse =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <GetProfileMatchesResponse xmlns="http://border.gov.au/service/risk/traveller/profilematchdataservice/response/v1" xmlns:com="http://border.gov.au/service/risk/traveller/pnr/common/v1" xmlns:iat="http://border.gov.au/service/risk/traveller/iat/common/v1">
         <IATTravellerId>0000577559</IATTravellerId>
         <ListsOfProfileMatch>
            <ListOfProfileMatch>
               <IATTravellerId>0012345678</IATTravellerId>
			   <PassengerTattoo>4</PassengerTattoo> 	
			   <PassengerNumber>41</PassengerNumber> 
               <ProfileMatches>
                  <ProfileMatch>
                     <ResultId>O201702122159041680</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>John</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-73231</ProfileId>
                     <ProfileName>JK MR41 TEST</ProfileName>
                     <ResultCreationTimeStamp>2017-12-12T21:54:40.180</ResultCreationTimeStamp>
                     <ReasonForMatch>Matched Profile JK MR41 Test</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-08-17T11:48:00</LocalScheduleDate>
                     <RouteId>QF</RouteId>
                     <Direction>I</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2016-12-26T09:55:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>1</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
                  <ProfileMatch>
                     <ResultId>O201702122159041681</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>John</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-732</ProfileId>
                     <ProfileName>jktest2</ProfileName>
                     <ResultCreationTimeStamp>2017-02-12T21:54:40.180</ResultCreationTimeStamp>
                     <ReasonForMatch>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-02-12T21:54:40</LocalScheduleDate>
                     <RouteId>JQ43</RouteId>
                     <Direction>O</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2016-12-26T09:55:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>1</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
                  <ProfileMatch>
                     <ResultId>O201705241405264</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>Johny</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-733</ProfileId>
                     <ProfileName>ZIPLINE</ProfileName>
                     <ResultCreationTimeStamp>2017-05-24T14:04:57.050</ResultCreationTimeStamp>
                     <ReasonForMatch>Age of Traveller = 71 ; Gender = M</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-08-17T11:48:00</LocalScheduleDate>
                     <RouteId>QF</RouteId>
                     <Direction>I</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2017-03-26T10:10:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>3</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
               </ProfileMatches>
            </ListOfProfileMatch>
			<ListOfProfileMatch>
               <IATTravellerId>0012345678</IATTravellerId>
			   <PassengerTattoo>2</PassengerTattoo> 	
			   <PassengerNumber>21</PassengerNumber> 
               <ProfileMatches>
                  <ProfileMatch>
                     <ResultId>O201702122159041680</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>John</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-7321</ProfileId>
                     <ProfileName>JK MR41 TEST</ProfileName>
                     <ResultCreationTimeStamp>2017-02-12T21:54:40.180</ResultCreationTimeStamp>
                     <ReasonForMatch>Matched Profile JK MR41 Test</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-02-12T21:54:40</LocalScheduleDate>
                     <RouteId>JQ43</RouteId>
                     <Direction>O</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2016-12-26T09:55:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>1</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
                  <ProfileMatch>
                     <ResultId>O201702122159041681</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>John</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-732</ProfileId>
                     <ProfileName>jktest2</ProfileName>
                     <ResultCreationTimeStamp>2017-02-12T21:54:40.180</ResultCreationTimeStamp>
                     <ReasonForMatch>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-02-12T21:54:40</LocalScheduleDate>
                     <RouteId>JQ43</RouteId>
                     <Direction>O</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2016-12-26T09:55:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>1</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
                  <ProfileMatch>
                     <ResultId>O201705241405264</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>Johny</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-733</ProfileId>
                     <ProfileName>ZIPLINE</ProfileName>
                     <ResultCreationTimeStamp>2017-05-24T14:04:57.050</ResultCreationTimeStamp>
                     <ReasonForMatch>Age of Traveller = 71 ; Gender = M</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-02-12T21:54:40</LocalScheduleDate>
                     <RouteId>GA719</RouteId>
                     <Direction>O</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2017-03-26T10:10:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>3</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
               </ProfileMatches>
            </ListOfProfileMatch>
			<ListOfProfileMatch>
               <IATTravellerId>0087654321</IATTravellerId>
			   <PassengerTattoo>1</PassengerTattoo> 	
			   <PassengerNumber>11</PassengerNumber> 
               <ProfileMatches>
                  <ProfileMatch>
                     <ResultId>O201702122159041680</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>John</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-731</ProfileId>
                     <ProfileName>JK MR41 TEST</ProfileName>
                     <ResultCreationTimeStamp>2017-02-12T21:54:40.180</ResultCreationTimeStamp>
                     <ReasonForMatch>Matched Profile JK MR41 Test</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-08-17T11:48:00</LocalScheduleDate>
                     <RouteId>QF</RouteId>
                     <Direction>I</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2016-12-26T09:55:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>1</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
                  <ProfileMatch>
                     <ResultId>O201702122159041681</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>John</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-732</ProfileId>
                     <ProfileName>jktest2</ProfileName>
                     <ResultCreationTimeStamp>2017-02-12T21:54:40.180</ResultCreationTimeStamp>
                     <ReasonForMatch>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-02-12T21:54:40</LocalScheduleDate>
                     <RouteId>JQ43</RouteId>
                     <Direction>O</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2016-12-26T09:55:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>1</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
                  <ProfileMatch>
                     <ResultId>O201705241405264</ResultId>
                     <BiographicFamilyName>Smith</BiographicFamilyName>
                     <BiographicGivenName>Johny</BiographicGivenName>
                     <BiographicBirthDate>19450818</BiographicBirthDate>
                     <BiographicSexCode>M</BiographicSexCode>
                     <BiographicIssueCountryCode>AUS</BiographicIssueCountryCode>
                     <BiographicTravelDocNbr>EDOC1L0055</BiographicTravelDocNbr>
                     <BookingPassengerNumber>0</BookingPassengerNumber>
                     <IATTravellerID>0000577559</IATTravellerID>
                     <ProfileId>-733</ProfileId>
                     <ProfileName>ZIPLINE</ProfileName>
                     <ResultCreationTimeStamp>2017-05-24T14:04:57.050</ResultCreationTimeStamp>
                     <ReasonForMatch>Age of Traveller = 71 ; Gender = M</ReasonForMatch>
                     <ResultTypeCode>A</ResultTypeCode>
                     <LocalScheduleDate>2017-02-12T21:54:40</LocalScheduleDate>
                     <RouteId>GA719</RouteId>
                     <Direction>O</Direction>
                     <LocalPortCode>MEL</LocalPortCode>
                     <CBRScheduledDateTime>2017-03-26T10:10:00</CBRScheduledDateTime>
                     <ProfileNote>This is a test profile with very relax rules</ProfileNote>
                     <ProfileTier>3</ProfileTier>
                     <ActionInd>U</ActionInd>
                  </ProfileMatch>
               </ProfileMatches>
            </ListOfProfileMatch>
         </ListsOfProfileMatch>
      </GetProfileMatchesResponse>
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


route.post("/ProfileMatchDataService", (req, res) => {

    console.log("======================================================");
    console.log("mock /ProfileMatchDataService");
    console.log("======================================================");

    const timestamp = new Date().getTime();
    const faultItUp = false;  //timestamp % 2 === 0;
    const soapAction = req.get("SOAPAction");
    res.set("Content-Type", "text/xml");

    if(soapAction === GetProfileMatchesSoapAction) {
        if(faultItUp) {
            res.status(500).send(GetProfileMatchesFault);
        } else {
            res.send(GetProfileMatchesResponse);
        }
    } /*else if(soapAction === GetProfileMatchesByPNRSoapAction) {
     if(faultItUp) {
     res.status(500).send(GetProfileMatchesByPNRFault);
     } else {
     res.send(GetProfileMatchesByPNRResponse);
     }
     }*/ else {
        res.status(500).send(NoSoapActionFault);
    }
});

module.exports = route;