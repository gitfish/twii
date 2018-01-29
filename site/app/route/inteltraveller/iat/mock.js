const express = require("express");

const route = express.Router();

const GetTravellerHistoryFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/iat/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>TME103-Invalid Service Request Input</faultstring>
         <detail>
            <exe:GetTravellerHistory>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME103</com:errorCode>
                  <com:errorDescription>Invalid Service Request Input: A schema validation error has occurred while parsing the XML document**/XMLNSC/http://schemas.xmlsoap.org/soap/envelope/:Envelope/http://schemas.xmlsoap.org/soap/envelope/:Body/http://border.gov.au/service/risk/traveller/pnr/request/v1:GetCurrentBookingDataRequest/BookingCreationTimeStamp**cvc-datatype-valid.1.2: The value "?" is not a valid value for the "dateTime" datatype.**XML Parsing Errors have occurred**problem creating SOAP tree from bitstream**3c736f6170656e763a456e76656c6f706520786d6c6e733a736f6170656e763d22687474703a2f2f736368656d61732e786d6c736f61702e6f72672f736f61702f656e76656c6f70652f2220786d6c6e733a76313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f706e722f726571756573742f76312220786d6c6e733a7631313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f636f6d6d6f6e2f7631223e0a2020203c736f6170656e763a4865616465722f3e0a2020203c736f6170656e763a426f64793e0a2020202020203c76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020202020202020203c526571756573744865616465723e0a2020202020202020202020203c7631313a636f7272656c6174696f6e5265717565737449643e3f3c2f7631313a636f7272656c6174696f6e5265717565737449643e0a2020202020202020202020203c7631313a7573657249643e3f3c2f7631313a7573657249643e0a2020202020202020202020203c7631313a7265717565737454696d655374616d703e3f3c2f7631313a7265717565737454696d655374616d703e0a2020202020202020203c2f526571756573744865616465723e0a2020202020202020203c426f6f6b696e6753797374656d436f64653e3f3c2f426f6f6b696e6753797374656d436f64653e0a2020202020202020203c426f6f6b696e674372656174696f6e54696d655374616d703e3f3c2f426f6f6b696e674372656174696f6e54696d655374616d703e0a2020202020202020203c5265636f72644c6f6361746f723e3f3c2f5265636f72644c6f6361746f723e0a2020202020203c2f76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020203c2f736f6170656e763a426f64793e0a3c2f736f6170656e763a456e76656c6f70653e**Root**Error occurred in ImbSOAPInputHelper::validateSOAPInput()**Node throwing exception**</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetTravellerHistory>
         </detail>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

const GetTravellerHistoryDataResponse =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <GetTravellerHistoryResponse xmlns="http://border.gov.au/service/risk/traveller/iat/response/v1" xmlns:iatcom="http://border.gov.au/service/risk/traveller/iat/common/v1" xmlns:iat="http://border.gov.au/service/risk/traveller/iat/v1">
         <ListOfTravellerHistory>
		 
		 <TravellerHistory>
               <IATTravellerID>0087654321</IATTravellerID>
               <ListOfPassportInfo>
                 <PassportInfo>
                   <iatcom:travelDocInfo>
                    <iatcom:travelDocId>P0087654321</iatcom:travelDocId>
                    <iatcom:travelDocCountryCode>PZE</iatcom:travelDocCountryCode>
                    <iatcom:travelDocTypeCode>PASSPORT</iatcom:travelDocTypeCode>
                    <iatcom:travelDocSequenceNbr>12547955</iatcom:travelDocSequenceNbr>
                    <iatcom:issueCountryCode>PNR</iatcom:issueCountryCode>
                    <iatcom:travelDocExpiryDate>2017-01-11</iatcom:travelDocExpiryDate>
                   </iatcom:travelDocInfo>
                   <iatcom:departmentRunNbr>21</iatcom:departmentRunNbr>
                   <iatcom:documentImpoundIndicator>N</iatcom:documentImpoundIndicator>
                   <iatcom:immigrationDirectiveCode>O</iatcom:immigrationDirectiveCode>
                   <iatcom:lastUpdateDate>2011-09-25</iatcom:lastUpdateDate>
                   <iatcom:passportIssueDate>2012-10-05</iatcom:passportIssueDate>
                   <iatcom:passportIssueOfficeCode>571</iatcom:passportIssueOfficeCode>
                   <iatcom:passportStatusCode>INACTIVE</iatcom:passportStatusCode>
                   <iatcom:passportTypeCode>GENERAL</iatcom:passportTypeCode>
                   <iatcom:sourceSystemCode>IAT</iatcom:sourceSystemCode>
                 </PassportInfo>
               </ListOfPassportInfo>
               <ListOfVisaInfo>
                  <VisaInfo>
                     <iatcom:travelDocInfo>
                        <iatcom:travelDocId>P0087654321</iatcom:travelDocId>
                        <iatcom:travelDocCountryCode>RUS</iatcom:travelDocCountryCode>
                        <iatcom:issueCountryCode>RUS</iatcom:issueCountryCode>
                     </iatcom:travelDocInfo>
                     <iatcom:lastUpdatedDate>2011-12-11</iatcom:lastUpdatedDate>
                     <iatcom:occupationCode>1458</iatcom:occupationCode>
                     <iatcom:SourceSystemCode>SDF</iatcom:SourceSystemCode>
                     <iatcom:visaEntriesAllowedCode>23</iatcom:visaEntriesAllowedCode>
                     <iatcom:visaEntriesMadeCount>012</iatcom:visaEntriesMadeCount>
                     <iatcom:visaEvidenceNumber>1245874</iatcom:visaEvidenceNumber>
                     <iatcom:visaImmigrationDirectiveCode>X</iatcom:visaImmigrationDirectiveCode>
                     <iatcom:visaLawfulGrantNumber>365478521</iatcom:visaLawfulGrantNumber>
                     <iatcom:visaLawfulUntilDate>2012-03-11</iatcom:visaLawfulUntilDate>
                     <iatcom:visaMigrantExpiryDate>2007-04-11</iatcom:visaMigrantExpiryDate>
                     <iatcom:visaPersonSeqNbr>A</iatcom:visaPersonSeqNbr>
                     <iatcom:visaPhysicalEvidenceStatusCode>P</iatcom:visaPhysicalEvidenceStatusCode>
                     <iatcom:visaResidenceCountryCode>-</iatcom:visaResidenceCountryCode>
                     <iatcom:visaStatusCode>SA</iatcom:visaStatusCode>
                     <iatcom:visaStayPeriodText>147852</iatcom:visaStayPeriodText>
                  </VisaInfo>
               </ListOfVisaInfo>
               <ListOfBioDataInfo>
                  <BioDataInfo>
                     <iatcom:aliasSequenceNbr>12</iatcom:aliasSequenceNbr>
                     <iatcom:personInfo>
                        <iatcom:familyName>DUCK</iatcom:familyName>
                        <iatcom:givenName>Mann</iatcom:givenName>
                        <iatcom:sexCode>M</iatcom:sexCode>
                        <iatcom:birthDate>12452514</iatcom:birthDate>
                     </iatcom:personInfo>
                     <iatcom:birthNameInd>Y</iatcom:birthNameInd>
                     <iatcom:currentNameInd>Y</iatcom:currentNameInd>
                     <iatcom:lastUpdateDate>1978-12-21</iatcom:lastUpdateDate>
                  </BioDataInfo>
               </ListOfBioDataInfo>
               <ListOfMovementInfo>
                  <MovementInfo>
                     <iat:travelDocInfo>
                        <iatcom:travelDocId>G31245781</iatcom:travelDocId>
                        <iatcom:travelDocCountryCode>PEQ</iatcom:travelDocCountryCode>
                     </iat:travelDocInfo>
                     <iat:checkInPortCode>KEP</iat:checkInPortCode>
                     <iat:directionCode>O</iat:directionCode>
                     <iat:localPortCode>CNS</iat:localPortCode>
                     <iat:localScheduledDate>1974-03-05</iat:localScheduledDate>
                     <iat:routeId>AB145</iat:routeId>
                     <iat:visaSubClassCode>754</iat:visaSubClassCode>
                     <iat:passengerCrewCode>O</iat:passengerCrewCode>
                     <iat:movementDate>2017-03-05</iat:movementDate>
                     <iat:movementTime>07:28:21</iat:movementTime>
                     <iat:movementStatusCode>X</iat:movementStatusCode>
                  </MovementInfo>
                  <MovementInfo>
                     <iat:travelDocInfo>
                        <iatcom:travelDocId>G34121151</iatcom:travelDocId>
                        <iatcom:travelDocCountryCode>CHN</iatcom:travelDocCountryCode>
                     </iat:travelDocInfo>
                     <iat:checkInPortCode>MEL</iat:checkInPortCode>
                     <iat:directionCode>O</iat:directionCode>
                     <iat:localPortCode>MEL</iat:localPortCode>
                     <iat:localScheduledDate>2017-03-12</iat:localScheduledDate>
                     <iat:routeId>CX178</iat:routeId>
                     <iat:visaSubClassCode>600</iat:visaSubClassCode>
                     <iat:passengerCrewCode>P</iat:passengerCrewCode>
                     <iat:movementDate>2017-03-11</iat:movementDate>
                     <iat:movementTime>22:17:13</iat:movementTime>
                     <iat:movementStatusCode>A</iat:movementStatusCode>
                  </MovementInfo>
               </ListOfMovementInfo>
               <ListOfAlertInfo>
                 <AlertInfo>
                     <iat:alertNumber>457898</iat:alertNumber>
                     <iat:alertStatusCode>6547</iat:alertStatusCode>
                     <iat:accessCategoryCode>SDFS</iat:accessCategoryCode>
                     <iat:issueDate>2017-03-12</iat:issueDate>
                     <iat:departmentCode>12</iat:departmentCode>
                     <iat:FIDInAction>S343</iat:FIDInAction>
                     <iat:FIDOutAction>SDFSE</iat:FIDOutAction>
                     <iat:BIDInAction>SEE</iat:BIDInAction>
                     <iat:BIDOutAction>ACT</iat:BIDOutAction>
                     <iat:suspectType>D</iat:suspectType>
                     <iat:FIDInNarrative>NOR</iat:FIDInNarrative>
                     <iat:FIDOutNarrative>ESP</iat:FIDOutNarrative>
                     <iat:FIDBothNarrative>WWS</iat:FIDBothNarrative>
                 </AlertInfo>
               </ListOfAlertInfo>
               <ListOfAlertMovementInfo>
                   <AlertMovementInfo>
                       <iat:alertNumber>S457</iat:alertNumber>
                       <iat:localScheduledDate>2017-03-12</iat:localScheduledDate>
                       <iat:localPortCode>ADL</iat:localPortCode>
                       <iat:matchCategoryCode>CBR</iat:matchCategoryCode>
                       <iat:BIDSelectStatus>HIGH</iat:BIDSelectStatus>
                       <iat:FIDSelectStatus>LOW</iat:FIDSelectStatus>
                       <iat:ExpectedMovementIndicator>Y</iat:ExpectedMovementIndicator>
                   </AlertMovementInfo>
               </ListOfAlertMovementInfo>
               <ListOfBagsExamResultInfo>
                   <BagsExamResultInfo>
                       <iat:localScheduledDate>2017-03-12</iat:localScheduledDate>
                       <iat:routeId>XS145</iat:routeId>
                       <iat:examinationNbr>EXCB</iat:examinationNbr>
                       <iat:targettingMethod>CL</iat:targettingMethod>
                       <iat:alertNumber>12345</iat:alertNumber>
                       <iat:highestResultsType>TECH</iat:highestResultsType>
                       <iat:examinationResultType>U</iat:examinationResultType>
                       <iat:findMethod>S</iat:findMethod>
                       <iat:baggageLocation>UNI</iat:baggageLocation>
                       <iat:notes>result notes</iat:notes>
                       <iat:outcomeType>DANGER</iat:outcomeType>
                       <iat:quantityValue>13</iat:quantityValue>
                       <iat:quantityUnit>CA</iat:quantityUnit>
                   </BagsExamResultInfo>
               </ListOfBagsExamResultInfo>

            </TravellerHistory>

            <TravellerHistory>
               <IATTravellerID>0012345678</IATTravellerID>
               <ListOfPassportInfo>
                 <PassportInfo>
                   <iatcom:travelDocInfo>
                    <iatcom:travelDocId>G34121151</iatcom:travelDocId>
                    <iatcom:travelDocCountryCode>AUS</iatcom:travelDocCountryCode>
                    <iatcom:travelDocTypeCode>PASSPORT</iatcom:travelDocTypeCode>
                    <iatcom:travelDocSequenceNbr>-1</iatcom:travelDocSequenceNbr>
                    <iatcom:issueCountryCode>AUS</iatcom:issueCountryCode>
                    <iatcom:travelDocExpiryDate>2015-09-10</iatcom:travelDocExpiryDate>
                   </iatcom:travelDocInfo>
                   <iatcom:departmentRunNbr>1</iatcom:departmentRunNbr>
                   <iatcom:documentImpoundIndicator>N</iatcom:documentImpoundIndicator>
                   <iatcom:immigrationDirectiveCode>E</iatcom:immigrationDirectiveCode>
                   <iatcom:lastUpdateDate>2017-09-05</iatcom:lastUpdateDate>
                   <iatcom:passportIssueDate>2017-09-05</iatcom:passportIssueDate>
                   <iatcom:passportIssueOfficeCode>175</iatcom:passportIssueOfficeCode>
                   <iatcom:passportStatusCode>ACTIVE</iatcom:passportStatusCode>
                   <iatcom:passportTypeCode>DIPLOMATIC</iatcom:passportTypeCode>
                   <iatcom:sourceSystemCode>IAT</iatcom:sourceSystemCode>
                 </PassportInfo>
               </ListOfPassportInfo>
               <ListOfVisaInfo>
                  <VisaInfo>
                     <iatcom:travelDocInfo>
                        <iatcom:travelDocId>G34121151</iatcom:travelDocId>
                        <iatcom:travelDocCountryCode>CHN</iatcom:travelDocCountryCode>
                        <iatcom:issueCountryCode>CHN</iatcom:issueCountryCode>
                     </iatcom:travelDocInfo>
                     <iatcom:lastUpdatedDate>2017-03-11</iatcom:lastUpdatedDate>
                     <iatcom:occupationCode>0000</iatcom:occupationCode>
                     <iatcom:SourceSystemCode>MBV</iatcom:SourceSystemCode>
                     <iatcom:visaEntriesAllowedCode>1</iatcom:visaEntriesAllowedCode>
                     <iatcom:visaEntriesMadeCount>001</iatcom:visaEntriesMadeCount>
                     <iatcom:visaEvidenceNumber>0000000000</iatcom:visaEvidenceNumber>
                     <iatcom:visaImmigrationDirectiveCode>E</iatcom:visaImmigrationDirectiveCode>
                     <iatcom:visaLawfulGrantNumber>7579584760523</iatcom:visaLawfulGrantNumber>
                     <iatcom:visaLawfulUntilDate>2017-03-11</iatcom:visaLawfulUntilDate>
                     <iatcom:visaMigrantExpiryDate>2017-03-11</iatcom:visaMigrantExpiryDate>
                     <iatcom:visaPersonSeqNbr>0</iatcom:visaPersonSeqNbr>
                     <iatcom:visaPhysicalEvidenceStatusCode></iatcom:visaPhysicalEvidenceStatusCode>
                     <iatcom:visaResidenceCountryCode>-</iatcom:visaResidenceCountryCode>
                     <iatcom:visaStatusCode>S</iatcom:visaStatusCode>
                     <iatcom:visaStayPeriodText>20170319</iatcom:visaStayPeriodText>
                  </VisaInfo>
               </ListOfVisaInfo>
               <ListOfBioDataInfo>
                  <BioDataInfo>
                     <iatcom:aliasSequenceNbr>1</iatcom:aliasSequenceNbr>
                     <iatcom:personInfo>
                        <iatcom:familyName>BLACK</iatcom:familyName>
                        <iatcom:givenName>Sue</iatcom:givenName>
                        <iatcom:sexCode>F</iatcom:sexCode>
                        <iatcom:birthDate>19660704</iatcom:birthDate>
                     </iatcom:personInfo>
                     <iatcom:birthNameInd>N</iatcom:birthNameInd>
                     <iatcom:currentNameInd>N</iatcom:currentNameInd>
                     <iatcom:lastUpdateDate>2017-02-21</iatcom:lastUpdateDate>
                  </BioDataInfo>
               </ListOfBioDataInfo>
               <ListOfMovementInfo>
                  <MovementInfo>
                     <iat:travelDocInfo>
                        <iatcom:travelDocId>G34121151</iatcom:travelDocId>
                        <iatcom:travelDocCountryCode>CHN</iatcom:travelDocCountryCode>
                     </iat:travelDocInfo>
                     <iat:checkInPortCode>PEK</iat:checkInPortCode>
                     <iat:directionCode>I</iat:directionCode>
                     <iat:localPortCode>CNS</iat:localPortCode>
                     <iat:localScheduledDate>2017-03-05</iat:localScheduledDate>
                     <iat:routeId>CX103</iat:routeId>
                     <iat:visaSubClassCode>600</iat:visaSubClassCode>
                     <iat:passengerCrewCode>P</iat:passengerCrewCode>
                     <iat:movementDate>2017-03-05</iat:movementDate>
                     <iat:movementTime>07:28:21</iat:movementTime>
                     <iat:movementStatusCode>A</iat:movementStatusCode>
                  </MovementInfo>
                  <MovementInfo>
                     <iat:travelDocInfo>
                        <iatcom:travelDocId>G34121151</iatcom:travelDocId>
                        <iatcom:travelDocCountryCode>CHN</iatcom:travelDocCountryCode>
                     </iat:travelDocInfo>
                     <iat:checkInPortCode>MEL</iat:checkInPortCode>
                     <iat:directionCode>O</iat:directionCode>
                     <iat:localPortCode>MEL</iat:localPortCode>
                     <iat:localScheduledDate>2017-03-12</iat:localScheduledDate>
                     <iat:routeId>CX178</iat:routeId>
                     <iat:visaSubClassCode>600</iat:visaSubClassCode>
                     <iat:passengerCrewCode>P</iat:passengerCrewCode>
                     <iat:movementDate>2017-03-11</iat:movementDate>
                     <iat:movementTime>22:17:13</iat:movementTime>
                     <iat:movementStatusCode>A</iat:movementStatusCode>
                  </MovementInfo>
               </ListOfMovementInfo>
               <ListOfAlertInfo>
                 <AlertInfo>
                     <iat:alertNumber>12345</iat:alertNumber>
                     <iat:alertStatusCode>123</iat:alertStatusCode>
                     <iat:accessCategoryCode>abc</iat:accessCategoryCode>
                     <iat:issueDate>2017-03-12</iat:issueDate>
                     <iat:departmentCode>12</iat:departmentCode>
                     <iat:FIDInAction>Act</iat:FIDInAction>
                     <iat:FIDOutAction>Act</iat:FIDOutAction>
                     <iat:BIDInAction>Act</iat:BIDInAction>
                     <iat:BIDOutAction>Act</iat:BIDOutAction>
                     <iat:suspectType>A</iat:suspectType>
                     <iat:FIDInNarrative>abc</iat:FIDInNarrative>
                     <iat:FIDOutNarrative>def</iat:FIDOutNarrative>
                     <iat:FIDBothNarrative>xyz</iat:FIDBothNarrative>
                 </AlertInfo>
               </ListOfAlertInfo>
               <ListOfAlertMovementInfo>
                   <AlertMovementInfo>
                       <iat:alertNumber>12345</iat:alertNumber>
                       <iat:localScheduledDate>2017-03-12</iat:localScheduledDate>
                       <iat:localPortCode>MEL</iat:localPortCode>
                       <iat:matchCategoryCode>ABC</iat:matchCategoryCode>
                       <iat:BIDSelectStatus>ABC</iat:BIDSelectStatus>
                       <iat:FIDSelectStatus>AAA</iat:FIDSelectStatus>
                       <iat:ExpectedMovementIndicator>Y</iat:ExpectedMovementIndicator>
                   </AlertMovementInfo>
               </ListOfAlertMovementInfo>
               <ListOfBagsExamResultInfo>
                   <BagsExamResultInfo>
                       <iat:localScheduledDate>2017-03-12</iat:localScheduledDate>
                       <iat:routeId>CX178</iat:routeId>
                       <iat:examinationNbr>123</iat:examinationNbr>
                       <iat:targettingMethod>TECH</iat:targettingMethod>
                       <iat:alertNumber>12345</iat:alertNumber>
                       <iat:highestResultsType>BBB</iat:highestResultsType>
                       <iat:examinationResultType>jdfdjf</iat:examinationResultType>
                       <iat:findMethod>S</iat:findMethod>
                       <iat:baggageLocation>CABIN</iat:baggageLocation>
                       <iat:notes>result notes</iat:notes>
                       <iat:outcomeType>POSITIVE</iat:outcomeType>
                       <iat:quantityValue>1</iat:quantityValue>
                       <iat:quantityUnit>C</iat:quantityUnit>
                   </BagsExamResultInfo>
               </ListOfBagsExamResultInfo>

            </TravellerHistory>
         </ListOfTravellerHistory>
      </GetTravellerHistoryResponse>
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

route.post("/IATTravellerDataService", (req, res) => {
    const timestamp = new Date().getTime();
    const faultItUp = false;  //timestamp % 2 === 0;
    const soapAction = req.get("SOAPAction");
    res.set("Content-Type", "text/xml");

    if (faultItUp) {
        res.status(500).send(GetTravellerHistoryDataFault);
    } else {
        res.send(GetTravellerHistoryDataResponse);
    }
});


module.exports = route;
