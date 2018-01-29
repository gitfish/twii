const express = require("express");

const route = express.Router();

const GetCurrentBookingDataSoapAction = "http://border.gov.au/risk/traveller/pnr/v1/GetCurrentBookingData";
const GetHistoricalBookingDataSoapAction = "http://border.gov.au/risk/traveller/pnr/v1/GetHistoricalBookingData";

const GetCurrentBookingDataFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/pnr/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>TME103-Invalid Service Request Input</faultstring>
         <detail>
            <exe:GetCurrentBookingData>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME103</com:errorCode>
                  <com:errorDescription>Invalid Service Request Input: A schema validation error has occurred while parsing the XML document**/XMLNSC/http://schemas.xmlsoap.org/soap/envelope/:Envelope/http://schemas.xmlsoap.org/soap/envelope/:Body/http://border.gov.au/service/risk/traveller/pnr/request/v1:GetCurrentBookingDataRequest/BookingCreationTimeStamp**cvc-datatype-valid.1.2: The value "?" is not a valid value for the "dateTime" datatype.**XML Parsing Errors have occurred**problem creating SOAP tree from bitstream**3c736f6170656e763a456e76656c6f706520786d6c6e733a736f6170656e763d22687474703a2f2f736368656d61732e786d6c736f61702e6f72672f736f61702f656e76656c6f70652f2220786d6c6e733a76313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f706e722f726571756573742f76312220786d6c6e733a7631313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f636f6d6d6f6e2f7631223e0a2020203c736f6170656e763a4865616465722f3e0a2020203c736f6170656e763a426f64793e0a2020202020203c76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020202020202020203c526571756573744865616465723e0a2020202020202020202020203c7631313a636f7272656c6174696f6e5265717565737449643e3f3c2f7631313a636f7272656c6174696f6e5265717565737449643e0a2020202020202020202020203c7631313a7573657249643e3f3c2f7631313a7573657249643e0a2020202020202020202020203c7631313a7265717565737454696d655374616d703e3f3c2f7631313a7265717565737454696d655374616d703e0a2020202020202020203c2f526571756573744865616465723e0a2020202020202020203c426f6f6b696e6753797374656d436f64653e3f3c2f426f6f6b696e6753797374656d436f64653e0a2020202020202020203c426f6f6b696e674372656174696f6e54696d655374616d703e3f3c2f426f6f6b696e674372656174696f6e54696d655374616d703e0a2020202020202020203c5265636f72644c6f6361746f723e3f3c2f5265636f72644c6f6361746f723e0a2020202020203c2f76313a47657443757272656e74426f6f6b696e6744617461526571756573743e0a2020203c2f736f6170656e763a426f64793e0a3c2f736f6170656e763a456e76656c6f70653e**Root**Error occurred in ImbSOAPInputHelper::validateSOAPInput()**Node throwing exception**</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetCurrentBookingData>
         </detail>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

const GetCurrentBookingDataResponse =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://border.gov.au/service/risk/traveller/pnr/response/v1" xmlns:v11="http://border.gov.au/service/risk/traveller/pnr/v1" xmlns:v12="http://border.gov.au/service/risk/traveller/pnr/common/v1" xmlns:v13="http://border.gov.au/service/risk/traveller/iat/common/v1">
   <soapenv:Header/>
   <soapenv:Body>
      <v1:GetCurrentBookingDataResponse>
         <v1:CurrentBookingData>
            <v11:BookingRecordInfo>
               <v11:BookingSystemCode>1A</v11:BookingSystemCode>
               <v11:RecordLocator>26WT55</v11:RecordLocator>
               <v11:PNRSource>EU Hosted PNR</v11:PNRSource>
            </v11:BookingRecordInfo>
            <v11:BookingSummaryInfo>
               <v11:PNRTravelType>Travel i nmy local - Round Trip</v11:PNRTravelType>
                <v11:BookingDate>2014-09-09</v11:BookingDate>
                <v11:BookingCity>CAN</v11:BookingCity>
                <v11:FormOfPayment>CC</v11:FormOfPayment>
                <v11:IntentToTravelDate>2015-02-01</v11:IntentToTravelDate>
                <v11:TravelGroupName>NICETRIP</v11:TravelGroupName>
                <v11:OriginalBookingDBT>145</v11:OriginalBookingDBT>
                <v11:CurrentBookingDBT>145</v11:CurrentBookingDBT>
                <v11:MostTimeSpentDays>23</v11:MostTimeSpentDays>
               <v11:MostTimeSpentCountry>AUS</v11:MostTimeSpentCountry>
                <v11:MostTimeSpentPort>CAN</v11:MostTimeSpentPort>
                <v11:TotalLengthOfStay>13</v11:TotalLengthOfStay>
                <v11:IntendLengthOfStay>13</v11:IntendLengthOfStay>
                <v11:TotalLengthOfTrip>54</v11:TotalLengthOfTrip>
                <v11:TotalIntendedLengthOfTrip>54</v11:TotalIntendedLengthOfTrip>
                <v11:TotalLengthOfTravel>54</v11:TotalLengthOfTravel>
                <v11:ActiveSegmentCount>54</v11:ActiveSegmentCount>
                <v11:CancelledSegmentCount>0</v11:CancelledSegmentCount>
                <v11:TravellerCount>29</v11:TravellerCount>
                <v11:MinorsInGroupCount/>
                <v11:TCPNumber>30</v11:TCPNumber>
                <v11:DepartureCanberraTimeStamp>2015-02-15T11:25:00</v11:DepartureCanberraTimeStamp>
            </v11:BookingSummaryInfo>
            <!--Optional:-->
            <v11:LinkedPNRInfo>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>A9384232</v11:RecordLocator>
                    <v11:BookingSystemCode>A2</v11:BookingSystemCode>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>B9232</v11:RecordLocator>
                    <v11:PNRCreationTimeStamp>2016-10-10T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>G2345</v11:RecordLocator>
                    <v11:BookingSystemCode>GH9</v11:BookingSystemCode>
                    <v11:PNRCreationTimeStamp>2010-11-12T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>O345</v11:RecordLocator>
                    <v11:BookingSystemCode>II9</v11:BookingSystemCode>
                    <v11:PNRCreationTimeStamp>2011-12-12T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>P345</v11:RecordLocator>
                    <v11:BookingSystemCode>IP9</v11:BookingSystemCode>
                    <v11:PNRCreationTimeStamp>2012-12-12T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:BookingSystemCode>U45</v11:BookingSystemCode>
                    <v11:PNRCreationTimeStamp>2016-10-10T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>Q345</v11:RecordLocator>
                    <v11:BookingSystemCode>QQ9</v11:BookingSystemCode>
                    <v11:PNRCreationTimeStamp>1990-12-12T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
            </v11:LinkedPNRInfo>
            <!--Optional:-->
            <v11:SplitPNRInfo>
            <v11:PNRRecordKey>
                    <v11:RecordLocator>C9232</v11:RecordLocator>
                    <v11:BookingSystemCode>C2</v11:BookingSystemCode>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>D9</v11:RecordLocator>
                    <v11:PNRCreationTimeStamp>1995-10-10T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
                <v11:PNRRecordKey>
                    <v11:RecordLocator>E45785</v11:RecordLocator>
                    <v11:BookingSystemCode>E9</v11:BookingSystemCode>
                    <v11:PNRCreationTimeStamp>2011-10-11T09:54:00</v11:PNRCreationTimeStamp>
                </v11:PNRRecordKey>
            </v11:SplitPNRInfo>
            <v11:TravellerInfo>
               <!--1 or more repetitions:-->
               <v11:TravellerSummary>
                  <!--Optional:-->
                  <v11:StaffInd>N</v11:StaffInd>
                  <!--Optional:-->
                  <v11:PNRTraveller>
                   <v12:PassengerTattoo>4</v12:PassengerTattoo>
                       <v12:TravelDoc>
                           <v12:TravelDocInfo>
                               <v13:travelDocId>N65463522</v13:travelDocId>
                               <v13:issueCountryCode>AUS</v13:issueCountryCode>
                               <v13:travelDocExpiryDate>2016-9-1</v13:travelDocExpiryDate>
                           </v12:TravelDocInfo>
                           <v12:TravelDocDBT>12-</v12:TravelDocDBT>
                       </v12:TravelDoc>
                       <v12:Biographic>
                           <v13:familyName>Johnson</v13:familyName>
                           <v13:givenName>Caorina Ann</v13:givenName>
                           <v13:sexCode>M</v13:sexCode>
                           <v13:birthDate>1989-01-01</v13:birthDate>
                           <v13:birthCountryCode>AUS</v13:birthCountryCode>
                       </v12:Biographic>
                  </v11:PNRTraveller>
                  <!--Optional:-->
                  <v11:IATTraveller>
                     <v12:IATTravellerId>0012345678</v12:IATTravellerId>
                     <v12:TravelDoc>
                           <v12:TravelDocInfo>
                               <v13:travelDocId>N65463522</v13:travelDocId>
                               <v13:travelDocCountryCode>AUS</v13:travelDocCountryCode>
                               <v13:issueCountryCode>AUS</v13:issueCountryCode>
                               <v13:travelDocExpiryDate>2016-9-1</v13:travelDocExpiryDate>
                           </v12:TravelDocInfo>
                           <v12:TravelDocDBT>120</v12:TravelDocDBT>
                       </v12:TravelDoc>
                       <v12:Biographic>
                           <v13:familyName>Johnson</v13:familyName>
                           <v13:givenName>Corina Ann</v13:givenName>
                           <v13:sexCode>M</v13:sexCode>
                           <v13:birthDate>1989-01-01</v13:birthDate>
                           <v13:birthCountryCode>AUS</v13:birthCountryCode>
                           <v13:countryOfCitizenship>AUS</v13:countryOfCitizenship>
                       </v12:Biographic>
                       <v12:MatchedTravelDoc>
                           <v12:TravelDocInfo>
                               <v13:travelDocId>N65463522</v13:travelDocId>
                               <v13:travelDocCountryCode>AUS</v13:travelDocCountryCode>
                               <v13:issueCountryCode>AUS</v13:issueCountryCode>
                               <v13:travelDocExpiryDate>2016-9-1</v13:travelDocExpiryDate>
                           </v12:TravelDocInfo>
                           <v12:TravelDocDBT>120</v12:TravelDocDBT>
                       </v12:MatchedTravelDoc>
                  </v11:IATTraveller>
                  <v11:FirstTimeTravelInd>N</v11:FirstTimeTravelInd>
                  <v11:PreviousTripCount>6</v11:PreviousTripCount>
                  <v11:TravelDocDeptCntyCodeInd>Y</v11:TravelDocDeptCntyCodeInd>
                  <v11:CntyOfOrgDeptInd>Y</v11:CntyOfOrgDeptInd>
                  <v11:AirlineCompanyId>QF</v11:AirlineCompanyId>
                  <v11:AirlineFrequentFlyerNum>9842346</v11:AirlineFrequentFlyerNum>
                  <v11:AirlineMembershipLevel>CLPO</v11:AirlineMembershipLevel>
                  <v11:AllianceCompanyId>QF</v11:AllianceCompanyId>
                  <v11:AllianceFrequentFlyerNum>9842346</v11:AllianceFrequentFlyerNum>
                  <v11:AllianceMembershipLevel>GOLD</v11:AllianceMembershipLevel>
               </v11:TravellerSummary>
                <v11:TravellerSummary>
                        <v11:StaffInd/>
                        <v11:PNRTraveller>
                            <v12:PassengerTattoo>2</v12:PassengerTattoo>
                            <v12:TravelDoc>
                                <v12:TravelDocInfo>
                                    <v13:travelDocId>A123456</v13:travelDocId>
                                    <v13:issueCountryCode>USA</v13:issueCountryCode>
                                    <v13:travelDocExpiryDate>2018-10-11</v13:travelDocExpiryDate>
                                </v12:TravelDocInfo>
                                <v12:TravelDocDBT>90</v12:TravelDocDBT>
                            </v12:TravelDoc>
                            <v12:Biographic>
                                <v13:familyName>Clark</v13:familyName>
                                <v13:givenName>Michelle</v13:givenName>
                                <v13:sexCode>F</v13:sexCode>
                                <v13:birthDate>1990-01-01</v13:birthDate>
                                <v13:birthCountryCode>USA</v13:birthCountryCode>
                            </v12:Biographic>
                        </v11:PNRTraveller>
                        <v11:IATTraveller>
                              <v12:IATTravellerId>0087654321</v12:IATTravellerId>
                            <v12:TravelDoc>
                                <v12:TravelDocInfo>
                                    <v13:travelDocId>A123456</v13:travelDocId>
                                    <v13:travelDocCountryCode>USA</v13:travelDocCountryCode>
                                    <v13:issueCountryCode>USA</v13:issueCountryCode>
                                    <v13:travelDocExpiryDate>2018-10-11</v13:travelDocExpiryDate>
                                </v12:TravelDocInfo>
                                <v12:TravelDocDBT>90</v12:TravelDocDBT>
                            </v12:TravelDoc>
                            <v12:Biographic>
                                <v13:familyName>Clark</v13:familyName>
                                <v13:givenName>Michelle</v13:givenName>
                                <v13:sexCode>F</v13:sexCode>
                                <v13:birthDate>1990-01-01</v13:birthDate>
                                <v13:birthCountryCode>USA</v13:birthCountryCode>
                                <v13:countryOfCitizenship>USA</v13:countryOfCitizenship>
                            </v12:Biographic>
                            <v12:MatchedTravelDoc>
                                <v12:TravelDocInfo>
                                    <v13:travelDocId>A123456</v13:travelDocId>
                                    <v13:travelDocCountryCode>USA</v13:travelDocCountryCode>
                                    <v13:issueCountryCode>USA</v13:issueCountryCode>
                                    <v13:travelDocExpiryDate>2018-10-11</v13:travelDocExpiryDate>
                                </v12:TravelDocInfo>
                                <v12:TravelDocDBT>?</v12:TravelDocDBT>
                            </v12:MatchedTravelDoc>
                        </v11:IATTraveller>
                        <v11:FirstTimeTravelInd>N</v11:FirstTimeTravelInd>
                        <v11:PreviousTripCount>12</v11:PreviousTripCount>
                        <v11:BookingVisaInfo>
                            <v11:Visa>
                                <v13:basicVisaInfo>
                                    <v13:visaGrantDate>2013-4-8</v13:visaGrantDate>
                                    <v13:visaClassCode>676</v13:visaClassCode>
                                </v13:basicVisaInfo>
                            </v11:Visa>
                            <v11:VisaDBT>127</v11:VisaDBT>
                        </v11:BookingVisaInfo>
                        <v11:TravelDocDeptCntyCodeInd>Y</v11:TravelDocDeptCntyCodeInd>
                        <v11:CntyOfOrgDeptInd>Y</v11:CntyOfOrgDeptInd>
                    </v11:TravellerSummary>
            </v11:TravellerInfo>
            <v11:ItineraryInfo>
                <v11:Itinerary>
                        <v11:SegmentTattoo>1</v11:SegmentTattoo>
                        <v11:TransportType>AIR</v11:TransportType>
                        <v11:CraftId>CZ783</v11:CraftId>
                        <v11:CodeShare>AF107</v11:CodeShare>
                        <v11:CabinClass>Miscellaneous</v11:CabinClass>
                        <v11:FareClass>G</v11:FareClass>
                        <v11:Route>CAN CDG</v11:Route>
                        <v11:DepartureDate>2015-08-20</v11:DepartureDate>
                        <v11:DepartureTime>23:00</v11:DepartureTime>
                        <v11:ArrivalDate>2015-08-21</v11:ArrivalDate>
                        <v11:ArrivalTime>05:04</v11:ArrivalTime>
                        <v11:DepatureDay>Wed</v11:DepatureDay>
                        <v11:Status>HK</v11:Status>
                        <v11:DaysAtArrivalPort>0</v11:DaysAtArrivalPort>
                        <v11:CheckinBoardingInfo></v11:CheckinBoardingInfo>
                        <v11:BaggageInfo></v11:BaggageInfo>    
                        <v11:SpecialServiceRequestInfo></v11:SpecialServiceRequestInfo>
                        <v11:TicketingInfo></v11:TicketingInfo>
                        <v11:SKOtherCommentInfo></v11:SKOtherCommentInfo>
               </v11:Itinerary>
               <v11:Itinerary>
                   <v11:SegmentTattoo>2</v11:SegmentTattoo>
                   <v11:TransportType>AIR</v11:TransportType>
                   <v11:CraftId>CZ382</v11:CraftId>
                   <v11:CodeShare>QF333 KL4408 AF9737</v11:CodeShare>
                   <v11:CabinClass>Miscellaneous</v11:CabinClass>
                   <v11:FareClass>E</v11:FareClass>
                   <v11:Route>BNE CAN</v11:Route>
                   <v11:DepartureDate>2015-08-20</v11:DepartureDate>
                   <v11:DepartureTime>09:55</v11:DepartureTime>
                   <v11:ArrivalDate>2015-08-20</v11:ArrivalDate>
                   <v11:ArrivalTime>16:55</v11:ArrivalTime>
                   <v11:DepatureDay>Wed</v11:DepatureDay>
                   <v11:Status>HK</v11:Status>
                   <v11:DaysAtArrivalPort>0</v11:DaysAtArrivalPort>
                  <v11:CheckinBoardingInfo>
                     <!--Zero or more repetitions:-->
                     <v11:CheckingBoarding>
                        <v11:PassengerTattoo>4</v11:PassengerTattoo>
                        <v11:Route>BNE CAN</v11:Route>
                        <v11:RouteId>CZ382</v11:RouteId>
                        <v11:DepartureTimeStamp>2015-08-20T:09:55</v11:DepartureTimeStamp>
                        <v11:CheckInInfo>
                          <v12:personInfo>
                              <v13:familyName>Johnson</v13:familyName>
                              <v13:givenName>Caorina Ann</v13:givenName>
                          </v12:personInfo>
                          <v12:CheckinSequence>95</v12:CheckinSequence>
                          <v12:checkInAgent>56644</v12:checkInAgent>
                          <v12:canberraCheckInDateTime>2015-08-19T21:03:00</v12:canberraCheckInDateTime>
                          <v12:checkInPortCode>BNE</v12:checkInPortCode>
                        </v11:CheckInInfo>
                        <v11:AllocatedSeat>37C</v11:AllocatedSeat>
                        <v11:RequestedSeat></v11:RequestedSeat>
                        <v11:SeparateSeatInd>N</v11:SeparateSeatInd>
                        <v11:SeatBoardingPort>BNE</v11:SeatBoardingPort>
                        <v11:SeatDestinationPort>CAN</v11:SeatDestinationPort>
                        <v11:BoardingStatus>CHK</v11:BoardingStatus>
                        <v11:GoShowInd>Y</v11:GoShowInd>
                        <v11:NoShowInd></v11:NoShowInd>
                        <v11:BaggageInfo>
                              <v11:PassengerTattoo>4</v11:PassengerTattoo>
                              <v11:BagsCount>1</v11:BagsCount>
                              <v11:TotalWeight>15</v11:TotalWeight>
                              <v11:AvgWeight>15</v11:AvgWeight>
                              <v11:Tags>CZ-654321</v11:Tags>
                              <v11:BoardingPort>BNE</v11:BoardingPort>
                              <v11:DestinationPort>CAN</v11:DestinationPort>
                              <v11:InterlineInd>N</v11:InterlineInd>
                              <v11:PoolId></v11:PoolId>
                              <v11:TravellerInPoolCount></v11:TravellerInPoolCount>
                              <v11:HOPInd></v11:HOPInd>
                        </v11:BaggageInfo>
                     </v11:CheckingBoarding>
                      <v11:CheckingBoarding>
                           <v11:PassengerTattoo>5</v11:PassengerTattoo>
                           <v11:Route>BNE CAN</v11:Route>
                           <v11:RouteId>CZ382</v11:RouteId>
                           <v11:DepartureTimeStamp>2015-08-20T:09:55</v11:DepartureTimeStamp>
                           <v11:CheckInInfo>
                           <v12:personInfo>
                              <v13:familyName>Clark</v13:familyName>
                              <v13:givenName>Michelle</v13:givenName>
                            </v12:personInfo>
                            <v12:CheckinSequence>97</v12:CheckinSequence>
                            <v12:checkInAgent>56644</v12:checkInAgent>
                            <v12:canberraCheckInDateTime>2015-08-19T21:08:00</v12:canberraCheckInDateTime>
                            <v12:checkInPortCode>BNE</v12:checkInPortCode>
                           </v11:CheckInInfo>
                           <v11:AllocatedSeat>37B</v11:AllocatedSeat>
                           <v11:RequestedSeat></v11:RequestedSeat>
                           <v11:SeparateSeatInd>N</v11:SeparateSeatInd>
                           <v11:SeatBoardingPort>BNE</v11:SeatBoardingPort>
                           <v11:SeatDestinationPort>CAN</v11:SeatDestinationPort>
                           <v11:BoardingStatus>CHK</v11:BoardingStatus>
                           <v11:GoShowInd>Y</v11:GoShowInd>
                           <v11:NoShowInd></v11:NoShowInd>
                          <v11:BaggageInfo>
                                 <v11:PassengerTattoo>5</v11:PassengerTattoo>
                                <v11:BagsCount>2</v11:BagsCount>
                                <v11:TotalWeight>28</v11:TotalWeight>
                                <v11:AvgWeight>14</v11:AvgWeight>
                                <v11:Tags>CZ-765432, CZ-765433</v11:Tags>
                                <v11:BoardingPort>BNE</v11:BoardingPort>
                                <v11:DestinationPort>CAN</v11:DestinationPort>
                                <v11:InterlineInd>N</v11:InterlineInd>
                                <v11:PoolId></v11:PoolId>
                                <v11:TravellerInPoolCount></v11:TravellerInPoolCount>
                                <v11:HOPInd></v11:HOPInd>
                           </v11:BaggageInfo>
                       </v11:CheckingBoarding>
                  </v11:CheckinBoardingInfo>
                 <v11:TicketingInfo>
                       <v11:Ticketing>
                           <v11:PassengerTattoo>4</v11:PassengerTattoo>
                           <v11:TicketType>E</v11:TicketType>
                           <v11:TicketNumber>7843123156272</v11:TicketNumber>
                       </v11:Ticketing>
                       <v11:Ticketing>
                           <v11:PassengerTattoo>5</v11:PassengerTattoo>
                           <v11:TicketType>E</v11:TicketType>
                           <v11:TicketNumber>7843123156273</v11:TicketNumber>
                       </v11:Ticketing>
                   </v11:TicketingInfo>
               </v11:Itinerary>
               <v11:Itinerary>
                   <v11:SegmentTattoo>3</v11:SegmentTattoo>
                   <v11:TransportType>AIR</v11:TransportType>
                   <v11:CraftId>CZ7017</v11:CraftId>
                   <v11:CodeShare>AF1609 AZ2663 DL8491</v11:CodeShare>
                   <v11:CabinClass>Economy</v11:CabinClass>
                   <v11:FareClass>E</v11:FareClass>
                   <v11:Route>CDG LHR</v11:Route>
                   <v11:DepartureDate>2015-08-21</v11:DepartureDate>
                   <v11:DepartureTime>07:30</v11:DepartureTime>
                   <v11:ArrivalDate>2015-08-21</v11:ArrivalDate>
                   <v11:ArrivalTime>07:50</v11:ArrivalTime>
                   <v11:DepatureDay>Thu</v11:DepatureDay>
                   <v11:Status>HK</v11:Status>
                   <v11:DaysAtArrivalPort>22</v11:DaysAtArrivalPort>
                   <v11:CheckinBoardingInfo></v11:CheckinBoardingInfo> 
                   <v11:SpecialServiceRequestInfo>
                       <v11:SpecialServiceRequest>
                           <v11:PassengerTattoo>4</v11:PassengerTattoo>
                           <v11:SSRCode>FQTU</v11:SSRCode>
                           <v11:FreeTextValue>HK 1 CZ CDG LHR CDGLHR 7017 E21AUG CZ080001234567</v11:FreeTextValue>
                       </v11:SpecialServiceRequest>
                       <v11:SpecialServiceRequest>
                           <v11:PassengerTattoo>5</v11:PassengerTattoo>
                           <v11:SSRCode>FQTU</v11:SSRCode>
                           <v11:FreeTextValue>HK 1 CZ CDG LHR CDGLHR 7017 E21AUG CZ080001234567</v11:FreeTextValue>
                       </v11:SpecialServiceRequest>
                   </v11:SpecialServiceRequestInfo>
                   <v11:TicketingInfo></v11:TicketingInfo>
               </v11:Itinerary>
               <v11:Itinerary>
                   <v11:SegmentTattoo>5</v11:SegmentTattoo>
                   <v11:TransportType>AIR</v11:TransportType>
                   <v11:CraftId>CZ304</v11:CraftId>
                   <v11:CodeShare></v11:CodeShare>
                   <v11:CabinClass>Economy</v11:CabinClass>
                   <v11:FareClass>B</v11:FareClass>
                   <v11:Route>LHR CAN</v11:Route>
                   <v11:DepartureDate>2015-09-12</v11:DepartureDate>
                   <v11:DepartureTime>23:35</v11:DepartureTime>
                   <v11:ArrivalDate>2015-09-13</v11:ArrivalDate>
                   <v11:ArrivalTime>17:10</v11:ArrivalTime>
                   <v11:DepatureDay>Fri</v11:DepatureDay>
                   <v11:Status>HK</v11:Status>
                   <v11:DaysAtArrivalPort>0</v11:DaysAtArrivalPort>
                   <v11:CheckinBoardingInfo>
                       <v11:CheckingBoarding>
                           <v11:PassengerTattoo>4</v11:PassengerTattoo>
                           <v11:Route>LHR CAN</v11:Route>
                           <v11:RouteId>CZ304</v11:RouteId>
                           <v11:DepartureTimeStamp>2015-09-12T23:35:00</v11:DepartureTimeStamp>
                           <v11:CheckInInfo>
                               <v12:personInfo>
                                   <v13:familyName>Clark</v13:familyName>
                                   <v13:givenName>Michelle</v13:givenName>
                               </v12:personInfo>
                               <v12:CheckinSequence>58</v12:CheckinSequence>
                               <v12:checkInAgent>49896</v12:checkInAgent>
                               <v12:canberraCheckInDateTime>2015-09-12T02:10:00</v12:canberraCheckInDateTime>
                               <v12:checkInPortCode>LHR</v12:checkInPortCode>
                           </v11:CheckInInfo>
                           <v11:AllocatedSeat>45C</v11:AllocatedSeat>
                           <v11:RequestedSeat></v11:RequestedSeat>
                           <v11:SeparateSeatInd>N</v11:SeparateSeatInd>
                           <v11:SeatBoardingPort>LHR</v11:SeatBoardingPort>
                           <v11:SeatDestinationPort>CAN</v11:SeatDestinationPort>
                           <v11:BoardingStatus>CHK</v11:BoardingStatus>
                           <v11:GoShowInd>Y</v11:GoShowInd>
                           <v11:NoShowInd></v11:NoShowInd>
                           <v11:BaggageInfo>
                              <v11:PassengerTattoo>4</v11:PassengerTattoo>
                              <v11:BagsCount>1</v11:BagsCount>
                              <v11:TotalWeight>19</v11:TotalWeight>
                              <v11:AvgWeight>19</v11:AvgWeight>
                              <v11:Tags>CZ-123456</v11:Tags>
                              <v11:BoardingPort>LHR</v11:BoardingPort>
                              <v11:DestinationPort>CAN</v11:DestinationPort>
                              <v11:InterlineInd>N</v11:InterlineInd>
                              <v11:PoolId></v11:PoolId>
                              <v11:TravellerInPoolCount></v11:TravellerInPoolCount>
                              <v11:HOPInd></v11:HOPInd>
                           </v11:BaggageInfo>
                       </v11:CheckingBoarding>
                       <v11:CheckingBoarding>
                           <v11:PassengerTattoo>5</v11:PassengerTattoo>
                           <v11:Route>LHR CAN</v11:Route>
                           <v11:RouteId>CZ304</v11:RouteId>
                           <v11:DepartureTimeStamp>2015-09-12T23:35:00</v11:DepartureTimeStamp>
                           <v11:CheckInInfo>
                               <v12:personInfo>
                                   <v13:familyName>Clark</v13:familyName>
                                   <v13:givenName>Michelle</v13:givenName>
                               </v12:personInfo>
                               <v12:CheckinSequence>59</v12:CheckinSequence>
                               <v12:checkInAgent>49896</v12:checkInAgent>
                               <v12:canberraCheckInDateTime>2015-09-12T02:14:00</v12:canberraCheckInDateTime>
                               <v12:checkInPortCode>LHR</v12:checkInPortCode>
                           </v11:CheckInInfo>
                           <v11:AllocatedSeat>45B</v11:AllocatedSeat>
                           <v11:RequestedSeat></v11:RequestedSeat>
                           <v11:SeparateSeatInd>N</v11:SeparateSeatInd>
                           <v11:SeatBoardingPort>LHR</v11:SeatBoardingPort>
                           <v11:SeatDestinationPort>CAN</v11:SeatDestinationPort>
                           <v11:BoardingStatus>CHK</v11:BoardingStatus>
                           <v11:GoShowInd>Y</v11:GoShowInd>
                           <v11:NoShowInd></v11:NoShowInd>
                           <v11:BaggageInfo>
                              <v11:PassengerTattoo>5</v11:PassengerTattoo>
                              <v11:BagsCount>2</v11:BagsCount>
                              <v11:TotalWeight>32</v11:TotalWeight>
                              <v11:AvgWeight>16</v11:AvgWeight>
                              <v11:Tags>CZ-234567, CZ-234568</v11:Tags>
                              <v11:BoardingPort>LHR</v11:BoardingPort>
                              <v11:DestinationPort>CAN</v11:DestinationPort>
                              <v11:InterlineInd>N</v11:InterlineInd>
                              <v11:PoolId></v11:PoolId>
                              <v11:TravellerInPoolCount></v11:TravellerInPoolCount>
                              <v11:HOPInd></v11:HOPInd>
                       </v11:BaggageInfo>
                       </v11:CheckingBoarding>
                   </v11:CheckinBoardingInfo>  
                   <v11:TicketingInfo>
                        <v11:Ticketing>
                            <v11:PassengerTattoo>4</v11:PassengerTattoo>
                            <v11:TicketType>E</v11:TicketType>
                            <v11:TicketNumber>7843965432198</v11:TicketNumber>
                        </v11:Ticketing>
                        <v11:Ticketing>
                            <v11:PassengerTattoo>5</v11:PassengerTattoo>
                            <v11:TicketType>E</v11:TicketType>
                            <v11:TicketNumber>7843965432199</v11:TicketNumber>
                        </v11:Ticketing>
                   </v11:TicketingInfo>
               </v11:Itinerary>
                 <v11:Itinerary>
                        <v11:SegmentTattoo>6</v11:SegmentTattoo>
                        <v11:TransportType>AIR</v11:TransportType>
                        <v11:CraftId>CZ381</v11:CraftId>
                        <v11:CodeShare>AF4418 QF334 KL4409</v11:CodeShare>
                        <v11:CabinClass>Economy</v11:CabinClass>
                        <v11:FareClass>V</v11:FareClass>
                        <v11:Route>CAN BNE</v11:Route>
                        <v11:DepartureDate>2015-09-13</v11:DepartureDate>
                        <v11:DepartureTime>21:15</v11:DepartureTime>
                        <v11:ArrivalDate>2015-09-14</v11:ArrivalDate>
                        <v11:ArrivalTime>08:25</v11:ArrivalTime>
                        <v11:DepatureDay>Sat</v11:DepatureDay>
                        <v11:Status>HK</v11:Status>
                        <v11:DaysAtArrivalPort></v11:DaysAtArrivalPort>
                        <v11:HotelName>Mantra</v11:HotelName>
                        <v11:HotelAddress>BNE</v11:HotelAddress>
                        <v11:CheckinBoardingInfo>
                            <v11:CheckingBoarding>
                                <v11:PassengerTattoo>4</v11:PassengerTattoo>
                                <v11:Route>CAN BNE</v11:Route>
                                <v11:RouteId>CZ381</v11:RouteId>
                                <v11:DepartureTimeStamp>2015-09-13T21:15:00</v11:DepartureTimeStamp>
                                <v11:CheckInInfo>
                                    <v12:personInfo>
                                        <v13:familyName>Johnson</v13:familyName>
                                        <v13:givenName>Caorina Ann</v13:givenName>
                                    </v12:personInfo>
                                    <v12:CheckinSequence>13</v12:CheckinSequence>
                                    <v12:checkInAgent>49896</v12:checkInAgent>
                                    <v12:canberraCheckInDateTime>2015-09-13T02:10:00</v12:canberraCheckInDateTime>
                                    <v12:checkInCountryName>LHR</v12:checkInCountryName>
                                </v11:CheckInInfo>
                                <v11:AllocatedSeat>47D</v11:AllocatedSeat>
                                <v11:RequestedSeat></v11:RequestedSeat>
                                <v11:SeparateSeatInd>N</v11:SeparateSeatInd>
                                <v11:SeatBoardingPort>CAN</v11:SeatBoardingPort>
                                <v11:SeatDestinationPort>BNE</v11:SeatDestinationPort>
                                <v11:BoardingStatus>CHK</v11:BoardingStatus>
                                <v11:GoShowInd>Y</v11:GoShowInd>
                                <v11:NoShowInd></v11:NoShowInd>
                                <v11:BaggageInfo>
                                   <v11:PassengerTattoo>4</v11:PassengerTattoo>
                                   <v11:BagsCount>1</v11:BagsCount>
                                   <v11:TotalWeight>22</v11:TotalWeight>
                                   <v11:AvgWeight>11</v11:AvgWeight>
                                   <v11:Tags>CZ-123456</v11:Tags>
                                   <v11:BoardingPort>CAN</v11:BoardingPort>
                                   <v11:DestinationPort>BNE</v11:DestinationPort>
                                   <v11:InterlineInd>N</v11:InterlineInd>
                                   <v11:PoolId></v11:PoolId>
                                   <v11:TravellerInPoolCount></v11:TravellerInPoolCount>
                                   <v11:HOPInd></v11:HOPInd>
                               </v11:BaggageInfo>
                            </v11:CheckingBoarding>
                            <v11:CheckingBoarding>
                                <v11:PassengerTattoo>5</v11:PassengerTattoo>
                                <v11:Route>CAN BNE</v11:Route>
                                <v11:RouteId>CZ381</v11:RouteId>
                                <v11:DepartureTimeStamp>2015-09-13T21:15:00</v11:DepartureTimeStamp>
                                <v11:CheckInInfo>
                                    <v12:personInfo>
                                        <v13:familyName>Clark</v13:familyName>
                                        <v13:givenName>Michelle</v13:givenName>
                                    </v12:personInfo>
                                    <v12:CheckinSequence>14</v12:CheckinSequence>
                                    <v12:checkInAgent>49896</v12:checkInAgent>
                                    <v12:canberraCheckInDateTime>2015-09-13T02:14:00</v12:canberraCheckInDateTime>
                                    <v12:checkInCountryName>LHR</v12:checkInCountryName>
                                </v11:CheckInInfo>
                                <v11:AllocatedSeat>47E</v11:AllocatedSeat>
                                <v11:RequestedSeat></v11:RequestedSeat>
                                <v11:SeparateSeatInd>N</v11:SeparateSeatInd>
                                <v11:SeatBoardingPort>CAN</v11:SeatBoardingPort>
                                <v11:SeatDestinationPort>BNE</v11:SeatDestinationPort>
                                <v11:BoardingStatus>CHK</v11:BoardingStatus>
                                <v11:GoShowInd>Y</v11:GoShowInd>
                                <v11:NoShowInd></v11:NoShowInd>
                                <v11:BaggageInfo>
                                   <v11:PassengerTattoo>5</v11:PassengerTattoo>
                                   <v11:BagsCount>2</v11:BagsCount>
                                   <v11:TotalWeight>32</v11:TotalWeight>
                                   <v11:AvgWeight>16</v11:AvgWeight>
                                   <v11:Tags>CZ-234567, CZ-234568</v11:Tags>
                                   <v11:BoardingPort>CAN</v11:BoardingPort>
                                   <v11:DestinationPort>BNE</v11:DestinationPort>
                                   <v11:InterlineInd>N</v11:InterlineInd>
                                   <v11:PoolId></v11:PoolId>
                                   <v11:TravellerInPoolCount></v11:TravellerInPoolCount>
                                   <v11:HOPInd></v11:HOPInd>
                            </v11:BaggageInfo>
                            </v11:CheckingBoarding>
                        </v11:CheckinBoardingInfo>  
                    </v11:Itinerary>
            </v11:ItineraryInfo>
             <v11:PNRPushHistoryInfo>
                    <!--Zero or more repetitions:-->
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>I</v11:DirectionCode>
                        <v11:RouteId>CZ381</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2015-09-14T08:25:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>5</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-09-13T23:43:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>I</v11:DirectionCode>
                        <v11:RouteId>CZ381</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2015-09-14T08:25:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>4</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-09-13T22:19:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>I</v11:DirectionCode>
                        <v11:RouteId>CZ381</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2015-09-14T08:25:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>3</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-09-13T21:20:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>I</v11:DirectionCode>
                        <v11:RouteId>CZ381</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2015-09-14T08:25:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>2</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-09-12T23:17:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>I</v11:DirectionCode>
                        <v11:RouteId>CZ381</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2015-09-14T08:25:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>1</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-09-10T23:19:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>O</v11:DirectionCode>
                        <v11:RouteId>CZ382</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2013-08-20T09:55:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>5</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-08-20T10:07:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>O</v11:DirectionCode>
                        <v11:RouteId>CZ382</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2013-08-20T09:55:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>4</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-08-20T08:57:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>O</v11:DirectionCode>
                        <v11:RouteId>CZ382</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2013-08-20T09:55:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>3</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-08-20T07:57:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>O</v11:DirectionCode>
                        <v11:RouteId>CZ382</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2013-08-20T09:55:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>2</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-08-19T09:57:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                    <v11:PNRPushHistory>
                        <v11:DirectionCode>O</v11:DirectionCode>
                        <v11:RouteId>CZ382</v11:RouteId>
                        <v11:LocalPort>BNE</v11:LocalPort>
                        <v11:ScheduledDate>2013-08-20T09:55:00</v11:ScheduledDate>
                        <v11:PushTypeCode>POC</v11:PushTypeCode>
                        <v11:PushNumber>1</v11:PushNumber>
                        <v11:PNRReceivedTimeStamp>2013-08-17T09:45:00</v11:PNRReceivedTimeStamp>
                    </v11:PNRPushHistory>
                </v11:PNRPushHistoryInfo>
            <!--Optional:-->
            <v11:TravelAgentInfo>
                <!--Zero or more repetitions:-->
                    <v11:TravelAgent>
                        <v11:AgentName>ANJALI TRAVEL TOURS</v11:AgentName>
                        <v11:Location>SYD</v11:Location>
                        <v11:AgentContactName>Rick S.A.</v11:AgentContactName>
                        <v11:IATAAgentCode>9983</v11:IATAAgentCode>
                        <v11:RoleTypeCode>CREATOR</v11:RoleTypeCode>
                    </v11:TravelAgent>
                </v11:TravelAgentInfo>
             <v11:PaymentInfo>
                    <!--Zero or more repetitions:-->
                    <v11:Payment>
                        <v11:FormOfPayment></v11:FormOfPayment>
                        <v11:Type>Tax</v11:Type>
                        <v11:Amount></v11:Amount>
                        <v11:Tax>301</v11:Tax>
                        <v11:CreditCardNumber></v11:CreditCardNumber>
                        <v11:CreditCardName></v11:CreditCardName>
                        <v11:Currency>CNY</v11:Currency>
                        <v11:FreeTextValue></v11:FreeTextValue>
                    </v11:Payment>
                    <v11:Payment>
                        <v11:FormOfPayment></v11:FormOfPayment>
                        <v11:Type>Tax</v11:Type>
                        <v11:Amount></v11:Amount>
                        <v11:Tax>1878</v11:Tax>
                        <v11:CreditCardNumber></v11:CreditCardNumber>
                        <v11:CreditCardName></v11:CreditCardName>
                        <v11:Currency>CNY</v11:Currency>
                        <v11:FreeTextValue></v11:FreeTextValue>
                    </v11:Payment>
                    <v11:Payment>
                        <v11:FormOfPayment></v11:FormOfPayment>
                        <v11:Type>Tax</v11:Type>
                        <v11:Amount></v11:Amount>
                        <v11:Tax>190</v11:Tax>
                        <v11:CreditCardNumber></v11:CreditCardNumber>
                        <v11:CreditCardName></v11:CreditCardName>
                        <v11:Currency>CNY</v11:Currency>
                        <v11:FreeTextValue></v11:FreeTextValue>
                    </v11:Payment>
                    <v11:Payment>
                        <v11:FormOfPayment></v11:FormOfPayment>
                        <v11:Type>Total</v11:Type>
                        <v11:Amount>5730</v11:Amount>
                        <v11:Tax></v11:Tax>
                        <v11:CreditCardNumber></v11:CreditCardNumber>
                        <v11:CreditCardName></v11:CreditCardName>
                        <v11:Currency>CNY</v11:Currency>
                        <v11:FreeTextValue></v11:FreeTextValue>
                    </v11:Payment>
                    <v11:Payment>
                        <v11:FormOfPayment>CA</v11:FormOfPayment>
                        <v11:Type></v11:Type>
                        <v11:Amount>0</v11:Amount>
                        <v11:Tax></v11:Tax>
                        <v11:CreditCardNumber></v11:CreditCardNumber>
                        <v11:CreditCardName></v11:CreditCardName>
                        <v11:Currency>CNY</v11:Currency>
                        <v11:FreeTextValue></v11:FreeTextValue>
                    </v11:Payment>
                </v11:PaymentInfo>
            <v11:ContactInfo>
                    <!--Zero or more repetitions:-->
                    <v11:Contact>
                        <v11:PassengerTattoo>4</v11:PassengerTattoo>
                        <v11:Type>Address (Home or Hotel)</v11:Type>
                        <v11:FreeTextValue>702 SI P 3TRAVELUP TEL 0871 250 2510 REF 123456#</v11:FreeTextValue>
                    </v11:Contact>
                    <v11:Contact>
                        <v11:PassengerTattoo>4</v11:PassengerTattoo>
                        <v11:Type>Address (Home or Hotel)</v11:Type>
                        <v11:FreeTextValue>P TRA/VELUP TEL 0871 250 2510 REF 123456#</v11:FreeTextValue>
                    </v11:Contact>
                    <v11:Contact>
                        <v11:PassengerTattoo>4</v11:PassengerTattoo>
                        <v11:Type>Address (Home or Hotel)</v11:Type>
                        <v11:FreeTextValue>TRA JP P VELUP TEL 0871 250 2510 REF OWAIS#</v11:FreeTextValue>
                    </v11:Contact>
                    <v11:Contact>
                        <v11:PassengerTattoo>5</v11:PassengerTattoo>
                        <v11:Type>Address (Home or Hotel</v11:Type>
                        <v11:FreeTextValue>SI P 3TRAVELUP TEL 0871 250 2510 REF 123456#</v11:FreeTextValue>
                    </v11:Contact>
                    <v11:Contact>
                        <v11:PassengerTattoo>5</v11:PassengerTattoo>
                        <v11:Type>Address (Home or Hotel)</v11:Type>
                        <v11:FreeTextValue>702 P TRA/VELUP TEL 0871 250 2510 REF 123456#</v11:FreeTextValue>
                    </v11:Contact>
                    <v11:Contact>
                        <v11:PassengerTattoo>5</v11:PassengerTattoo>
                        <v11:Type>Address (Home or Hotel)</v11:Type>
                        <v11:FreeTextValue>702 TRA JP P VELUP TEL 0871 250 2510 REF OWAIS#</v11:FreeTextValue>
                    </v11:Contact>
                </v11:ContactInfo>
            <v11:SpecialServiceRequestInfo>
              <v11:SpecialServiceRequest>
                    <v11:SegmentTattoo>2</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>SEAT</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ BNE CAN BNECAN 382 E20AUG 43DN 43D</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>2</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>SEAT</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ BNE CAN BNECAN 382 E20AUG 43EN 43E</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>2</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>TKNE</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ BNE CAN BNECAN 382 E20AUG 7843123156272/1</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>2</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>TKNE</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ BNE CAN BNECAN 382 E20AUG 7843965432198/1</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                     <v11:SegmentTattoo>3</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>FQTU</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ CDG LHR CDGLHR 7017 E21AUG CZ080001234567</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                     <v11:SegmentTattoo>3</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>FQTU</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ CDG LHR CDGLHR 7017 E21AUG CZ080001234567</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                     <v11:SegmentTattoo>4</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>SEAT</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ LHR CAN LHRCAN 304 B12SEP 45AN 45A</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>4</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>SEAT</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ LHR CAN LHRCAN 304 B12SEP 45BN 45B</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>4</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>TKNE</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ LHR CAN LHRCAN 304 B12SEP 7843123156272/4</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>4</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>TKNE</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ LHR CAN LHRCAN 304 B12SEP 7843965432198/4</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>5</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>SEAT</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ CAN BNE CANBNE 381 V13SEP 43AN 43A</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>5</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>SEAT</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ CAN BNE CANBNE 381 V13SEP 43AN 43A</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>5</v11:SegmentTattoo>
                      <v11:PassengerTattoo>4</v11:PassengerTattoo>
                      <v11:SSRCode>TKNE</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ CAN BNE CANBNE 381 V13SEP 7843123156273/1</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
                  <v11:SpecialServiceRequest>
                      <v11:SegmentTattoo>5</v11:SegmentTattoo>
                      <v11:PassengerTattoo>5</v11:PassengerTattoo>
                      <v11:SSRCode>TKNE</v11:SSRCode>
                      <v11:FreeTextValue>HK 1 CZ CAN BNE CANBNE 381 V13SEP 7843965432199/1</v11:FreeTextValue>
                  </v11:SpecialServiceRequest>
            </v11:SpecialServiceRequestInfo>
            <v11:OtherServiceInfo>
               <v11:OtherService>
                   <v11:OSICode>OSI</v11:OSICode>
                   <v11:FreeTextValue>4 YY PAX CONTACT 61555299053</v11:FreeTextValue>
               </v11:OtherService>
               <v11:OtherService>
                   <v11:OSICode>OSI</v11:OSICode>
                   <v11:FreeTextValue>4 YY CTCP PLS REISSUE TKT AND ADD IN END BOX REISSUE FOC DUE TO</v11:FreeTextValue>
               </v11:OtherService>
               <v11:OtherService>
                   <v11:OSICode>OSI</v11:OSICode>
                   <v11:FreeTextValue>4 YY CZ SC ON CZ382</v11:FreeTextValue>
               </v11:OtherService>
               <v11:OtherService>
                   <v11:OSICode>OSI</v11:OSICode>
                   <v11:FreeTextValue>4 YY CTCT SYD 02 9410 3059 JETABROAD</v11:FreeTextValue>
               </v11:OtherService>
               <v11:OtherService>
                   <v11:OSICode>OSI</v11:OSICode>
                   <v11:FreeTextValue>4 YY CTCP SC EMAIL TCZ-441615 SMS SENT 06/6 X GC</v11:FreeTextValue>
               </v11:OtherService>
               <v11:OtherService>
                   <v11:OSICode>OSI</v11:OSICode>
                   <v11:FreeTextValue>4 YY CTCP REISSUE DONE DUE TO CZ SCD CHG//EMAIL//IEPJ DONE</v11:FreeTextValue>
              </v11:OtherService>
            </v11:OtherServiceInfo>
            <!--Optional:-->
            <v11:PNRSKOtherCommentInfo>
               <!--Zero or more repetitions:-->
               <v11:SKOtherComment>
                  <v11:PassengerTattoo>4</v11:PassengerTattoo>
                  <v11:SegmentTattoo>4</v11:SegmentTattoo>
                   <v11:Type>MIR</v11:Type>
                  <v11:Code>RX</v11:Code>
                  <v11:FreeTextValue>NOTE AUTO-CANCEL TTL SET BY SYSTEM ON 07 JULY</v11:FreeTextValue>
               </v11:SKOtherComment>
               <v11:SKOtherComment>
                  <v11:PassengerTattoo>5</v11:PassengerTattoo>
                  <v11:SegmentTattoo>5</v11:SegmentTattoo>
                   <v11:Type>MIR</v11:Type>
                  <v11:Code>RM</v11:Code>
                  <v11:FreeTextValue>PRICING ENTRY FXP/R,UP,SIN</v11:FreeTextValue>
               </v11:SKOtherComment>
         <v11:SKOtherComment>
                  <v11:PassengerTattoo>4</v11:PassengerTattoo>
                  <v11:SegmentTattoo>4</v11:SegmentTattoo>
                   <v11:Type>LFT</v11:Type>
                  <v11:Code>P18</v11:Code>
                  <v11:FreeTextValue>PAX LH</v11:FreeTextValue>
               </v11:SKOtherComment>
         <v11:SKOtherComment>
                  <v11:PassengerTattoo>5</v11:PassengerTattoo>
                  <v11:SegmentTattoo>5</v11:SegmentTattoo>
                   <v11:Type>LFT</v11:Type>
                  <v11:Code>10</v11:Code>
                  <v11:FreeTextValue>PAX RESTRICTIONS APPLY/NONEND PENALTIES APPLY</v11:FreeTextValue>
               </v11:SKOtherComment>
            </v11:PNRSKOtherCommentInfo>
            <v11:PNRHistoryInfo>
               <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>SEAT UC 1 CZ CDG LHR CDGLHR 7017 E22AUG 1 NW/ASR NOT AVAIL</v11:HistoryData>
                        <v11:CreatorIATACode>9983</v11:CreatorIATACode>
                        <v11:CreatorId>001</v11:CreatorId>
                        <v11:CreatorCityCode>SYD</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-05-02T06:36:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>2 SEAT UC 1 CZ CAN CDG CANCDG 783 L21AUG NW/ASR NOT AVAIL</v11:HistoryData>
                        <v11:CreatorIATACode>9983</v11:CreatorIATACode>
                        <v11:CreatorId>001</v11:CreatorId>
                        <v11:CreatorCityCode>SYD</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-05-02T06:36:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>ADTK1A BY SYD09MAY13/1636 OR CXL CZ 382 E21AUG</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-05-02T10:05:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>Itinerary Segment</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>CZ 382 E CAN 21-8-2013 17:00:00 BNE 21-08-2013 09:55:00 1 UN</v11:HistoryData>
                        <v11:CreatorIATACode>9996</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>CZ</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-05-02T10:05:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>SEAT UN 1 CZ BNE CAN BNECAN 382 E21AUG 40AN /SMITH/MARY LOUISE MS 40A</v11:HistoryData>
                        <v11:CreatorIATACode>9990</v11:CreatorIATACode>
                        <v11:CreatorId>099</v11:CreatorId>
                        <v11:CreatorCityCode>PEK</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>CA</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-05T06:58:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>SEAT UN 1 CZ BNE CAN BNECAN 382 E21AUG 40AN /SMITH/MARY LOUISE MS 40A 1</v11:HistoryData>
                        <v11:CreatorIATACode>9990</v11:CreatorIATACode>
                        <v11:CreatorId>099</v11:CreatorId>
                        <v11:CreatorCityCode>PEK</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>CA</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-05T06:58:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ BNE CAN BNECAN 382 E21AUG 7843511019680/1 1</v11:HistoryData>
                        <v11:CreatorIATACode>9990</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-06T03:50:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>Itinerary Segment</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>CZ 783 CZ G CDG 21-8-2013 05:40:00 CAN 20-08-2013 23:00:00 1 XX</v11:HistoryData>
                        <v11:CreatorIATACode>9983</v11:CreatorIATACode>
                        <v11:CreatorId>001</v11:CreatorId>
                        <v11:CreatorCityCode>SYD</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T03:48:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>Itinerary Segment</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>CZ 382 U CAN 20-8-2013 16:55:00 BNE 20-08-2013 09:55:00 1 XX</v11:HistoryData>
                        <v11:CreatorIATACode>9983</v11:CreatorIATACode>
                        <v11:CreatorId>001</v11:CreatorId>
                        <v11:CreatorCityCode>SYD</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T03:48:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>Itinerary Segment</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>CZ 783 AF G CDG 21-8-2013 05:40:00 CAN 20-08-2013 23:00:00 1 XX</v11:HistoryData>
                        <v11:CreatorIATACode>9983</v11:CreatorIATACode>
                        <v11:CreatorId>001</v11:CreatorId>
                        <v11:CreatorCityCode>SYD</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T03:48:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>SEAT XX 1 CZ BNE CAN BNECAN 382 E22AUG 44AN 44A</v11:HistoryData>
                        <v11:CreatorIATACode>60783</v11:CreatorIATACode>
                        <v11:CreatorId>201</v11:CreatorId>
                        <v11:CreatorCityCode>BNE</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>CZ</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T04:27:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>SEAT XX 1 CZ BNE CAN BNECAN 382 E22AUG 44AN 44A 1</v11:HistoryData>
                        <v11:CreatorIATACode>60783</v11:CreatorIATACode>
                        <v11:CreatorId>201</v11:CreatorId>
                        <v11:CreatorCityCode>BNE</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>CZ</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T04:27:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ BNE CAN BNECAN 382 E22AUG 7843511019680/1 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>60783</v11:CreatorIATACode>
                        <v11:CreatorId>201</v11:CreatorId>
                        <v11:CreatorCityCode>BNE</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>CZ</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T04:27:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ LHR CAN LHRCAN 304 B12SEP 7843511019680/4 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T16:00:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ CDG LHR CDGLHR 7017 E22AUG 7843511019680/3 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T16:00:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                       <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ CDG LHR CDGLHR 7017 E22AUG 7843511019680/2 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T16:00:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ CDG LHR CDGLHR 7017 E22AUG 7843511019680/1 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-18T16:00:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ CDG LHR CDGLHR 7017 E22AUG 7843511019123/3 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-21T01:04:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>SSR</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>TKNEXX 1 CZ CAN CDG CANCDG 783 L21AUG 7843511019123/2 /SMITH/MARY LOUISE MS</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-21T01:04:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
                    <v11:PNRHistory>
                        <v11:PrevPNREnvelopeNum></v11:PrevPNREnvelopeNum>
                        <v11:NewPNREnvelopeNum></v11:NewPNREnvelopeNum>
                        <v11:Action>Cancel</v11:Action>
                        <v11:Element>Itinerary Segment</v11:Element>
                        <v11:ElementTypeDesc></v11:ElementTypeDesc>
                        <v11:HistoryData>CZ 783 CZ L CDG 22-8-2013 05:40:00 CAN 21-08-2013 23:00:00 1 XX</v11:HistoryData>
                        <v11:CreatorIATACode>9999</v11:CreatorIATACode>
                        <v11:CreatorId></v11:CreatorId>
                        <v11:CreatorCityCode>MUC</v11:CreatorCityCode>
                        <v11:CreatorCompanyId>1A</v11:CreatorCompanyId>
                        <v11:CreationTimeStamp>2015-06-21T01:04:00</v11:CreationTimeStamp>
                    </v11:PNRHistory>
            </v11:PNRHistoryInfo>
         </v1:CurrentBookingData>
      </v1:GetCurrentBookingDataResponse>
   </soapenv:Body>
</soapenv:Envelope>`;

const GetHistoricalBookingDataResponse =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://border.gov.au/service/risk/traveller/pnr/response/v1" xmlns:v11="http://border.gov.au/service/risk/traveller/pnr/v1" xmlns:v12="http://border.gov.au/service/risk/traveller/pnr/common/v1" xmlns:v13="http://border.gov.au/service/risk/traveller/iat/common/v1">
   <soapenv:Header/>
   <soapenv:Body>
      <v1:GetHistoricalBookingDataResponse>
         <!--Optional:-->
         <v1:ListOfHistoricalPNRRecord>
            <!--Zero or more repetitions:-->
            <v1:PNRRecord>
               <v11:RecordLocator>ABC123</v11:RecordLocator>
               <v11:CreationTimeStamp>2012-01-09T09:30:00</v11:CreationTimeStamp>
               <v11:LocalScheduledDate>2012-01-09</v11:LocalScheduledDate>
               <v11:LocalPortCode>SYD</v11:LocalPortCode>
               <v11:DirectionCode>O</v11:DirectionCode>
               <v11:RouteId>QF45</v11:RouteId>
               <v11:LastReceivedTimeStamp>2012-01-09T06:30:00</v11:LastReceivedTimeStamp>
               <v11:PNRPushCount>3</v11:PNRPushCount>
               <!--Optional:-->
               <v11:Carrier>1A</v11:Carrier>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>4</v12:PassengerTattoo>
                  <v12:Biographic>
                     <v13:familyName>Johnson</v13:familyName>
                     <v13:givenName>Caorina Ann</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
            </v1:PNRRecord>
            <v1:PNRRecord>
               <v11:RecordLocator>BCD456</v11:RecordLocator>
               <v11:CreationTimeStamp>2012-01-10T10:30:00</v11:CreationTimeStamp>
               <v11:LocalScheduledDate>2012-01-10</v11:LocalScheduledDate>
               <v11:LocalPortCode>SYD</v11:LocalPortCode>
               <v11:DirectionCode>O</v11:DirectionCode>
               <v11:RouteId>QF45</v11:RouteId>
               <v11:LastReceivedTimeStamp>2012-01-10T17:30:00</v11:LastReceivedTimeStamp>
               <v11:PNRPushCount>2</v11:PNRPushCount>
               <!--Optional:-->
               <v11:Carrier>NZ</v11:Carrier>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>4</v12:PassengerTattoo>
                  <v12:Biographic>
                     <v13:familyName>Johnson</v13:familyName>
                     <v13:givenName>>Corina Ann</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
            </v1:PNRRecord>
            <v1:PNRRecord>
               <v11:RecordLocator>XYZ432</v11:RecordLocator>
               <v11:CreationTimeStamp>2013-03-18T12:30:00</v11:CreationTimeStamp>
               <v11:LocalScheduledDate>2013-03-18</v11:LocalScheduledDate>
               <v11:LocalPortCode>SYD</v11:LocalPortCode>
               <v11:DirectionCode>I</v11:DirectionCode>
               <v11:RouteId>DL417</v11:RouteId>
               <v11:LastReceivedTimeStamp>2013-03-18T12:30:00</v11:LastReceivedTimeStamp>
               <v11:PNRPushCount>5</v11:PNRPushCount>
               <!--Optional:-->
               <v11:Carrier>DL</v11:Carrier>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>5</v12:PassengerTattoo>
                  <v12:Biographic>
                     <v13:familyName>Clark</v13:familyName>
                     <v13:givenName>Michelle</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
            </v1:PNRRecord>
            <v1:PNRRecord>
               <v11:RecordLocator>ABC123</v11:RecordLocator>
               <v11:CreationTimeStamp>2012-01-09T09:30:00</v11:CreationTimeStamp>
               <v11:LocalScheduledDate>2012-01-09</v11:LocalScheduledDate>
               <v11:LocalPortCode>SYD</v11:LocalPortCode>
               <v11:DirectionCode>O</v11:DirectionCode>
               <v11:RouteId>QF45</v11:RouteId>
               <v11:LastReceivedTimeStamp>2012-01-09T06:30:00</v11:LastReceivedTimeStamp>
               <v11:PNRPushCount>3</v11:PNRPushCount>
               <!--Optional:-->
               <v11:Carrier>1A</v11:Carrier>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>4</v12:PassengerTattoo>
                  <v12:Biographic>
                     <v13:familyName>Clark</v13:familyName>
                     <v13:givenName>MaMichellery</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
            </v1:PNRRecord>
         </v1:ListOfHistoricalPNRRecord>
         <!--Optional:-->
         <v1:ListOfMatchedIATTraveller>
            <!--Zero or more repetitions:-->
            <v1:MatchedIATTraveller>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>4</v12:PassengerTattoo>
                  <v12:TravelDoc>
                     <v12:TravelDocInfo>
               <v13:issueCountryCode>AUS</v13:issueCountryCode>
                     </v12:TravelDocInfo>
                     <v12:TravelDocDBT>90</v12:TravelDocDBT>
                  </v12:TravelDoc>
                  <v12:Biographic>
                     <v13:familyName>Johnson</v13:familyName>
                     <v13:givenName>Corina Ann</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
               <v11:IATTraveller>
                  <v12:IATTravellerId>0012345678</v12:IATTravellerId>
                  <v12:TravelDoc>
                     <v12:TravelDocInfo>
                        <v13:issueCountryCode>AUS</v13:issueCountryCode>
                     </v12:TravelDocInfo>
                  </v12:TravelDoc>
                  <v12:Biographic>
                     <v13:familyName>Johnson</v13:familyName>
                     <v13:givenName>Ann</v13:givenName>
                     <v13:sexCode>M</v13:sexCode>
                     <v13:birthDate>1989-01-01</v13:birthDate>
                  </v12:Biographic>
               </v11:IATTraveller>
            </v1:MatchedIATTraveller>
            <v1:MatchedIATTraveller>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>4</v12:PassengerTattoo>
                  <v12:TravelDoc>
                     <v12:TravelDocInfo>
               <v13:issueCountryCode>AUS</v13:issueCountryCode>
                     </v12:TravelDocInfo>
                     <v12:TravelDocDBT>78</v12:TravelDocDBT>
                  </v12:TravelDoc>
                  <v12:Biographic>
                     <v13:familyName>Johnson</v13:familyName>
                     <v13:givenName>Ann</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
               <v11:IATTraveller>
                  <v12:IATTravellerId>IATX123456789</v12:IATTravellerId>
                  <v12:TravelDoc>
                     <v12:TravelDocInfo>
                        <v13:issueCountryCode>AUS</v13:issueCountryCode>
                     </v12:TravelDocInfo>
                  </v12:TravelDoc>
                  <v12:Biographic>
                     <v13:familyName>Johnson</v13:familyName>
                     <v13:givenName>Ann</v13:givenName>
                     <v13:sexCode>M</v13:sexCode>
                     <v13:birthDate>1989-01-01</v13:birthDate>
                  </v12:Biographic>
               </v11:IATTraveller>
            </v1:MatchedIATTraveller>
            <v1:MatchedIATTraveller>
               <v11:PNRTraveller>
                  <v12:PassengerTattoo>5</v12:PassengerTattoo>
                  <v12:TravelDoc>
                     <v12:TravelDocInfo>
               <v13:issueCountryCode>USA</v13:issueCountryCode>
                     </v12:TravelDocInfo>
                  </v12:TravelDoc>
                  <v12:Biographic>
                     <v13:familyName>Clark</v13:familyName>
                     <v13:givenName>Michellen</v13:givenName>
                  </v12:Biographic>
               </v11:PNRTraveller>
               <v11:IATTraveller>
                  <v12:IATTravellerId>0056789123</v12:IATTravellerId>
                  <v12:TravelDoc>
                     <v12:TravelDocInfo>
                        <v13:issueCountryCode>USA</v13:issueCountryCode>
                     </v12:TravelDocInfo>
                  </v12:TravelDoc>
                  <v12:Biographic>
                     <v13:familyName>Clark</v13:familyName>
                     <v13:givenName>Barry Michellen</v13:givenName>
                     <v13:sexCode>F</v13:sexCode>
                     <v13:birthDate>1990-01-01</v13:birthDate>
                  </v12:Biographic>
               </v11:IATTraveller>
            </v1:MatchedIATTraveller>
         </v1:ListOfMatchedIATTraveller>
      </v1:GetHistoricalBookingDataResponse>
   </soapenv:Body>
</soapenv:Envelope>`;

const GetHistoricalBookingDataFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/pnr/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>TME103-Invalid Service Request Input</faultstring>
         <detail>
            <exe:GetHistoricalBookingData>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME103</com:errorCode>
                  <com:errorDescription>Invalid Service Request Input: A schema validation error has occurred while parsing the XML document**/XMLNSC/http://schemas.xmlsoap.org/soap/envelope/:Envelope/http://schemas.xmlsoap.org/soap/envelope/:Body/http://border.gov.au/service/risk/traveller/pnr/request/v1:GetHistoricalBookingDataRequest**cvc-complex-type.2.4.a: Expecting element with local name "BookingSystemCode" but saw "ListOfIATTravellerId".**XML Parsing Errors have occurred**problem creating SOAP tree from bitstream**3c736f6170656e763a456e76656c6f706520786d6c6e733a736f6170656e763d22687474703a2f2f736368656d61732e786d6c736f61702e6f72672f736f61702f656e76656c6f70652f2220786d6c6e733a76313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f706e722f726571756573742f76312220786d6c6e733a7631313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f636f6d6d6f6e2f7631223e0a2020203c736f6170656e763a4865616465722f3e0a2020203c736f6170656e763a426f64793e0a2020202020203c76313a476574486973746f726963616c426f6f6b696e6744617461526571756573743e0a2020202020202020203c526571756573744865616465723e0a2020202020202020202020203c7631313a636f7272656c6174696f6e5265717565737449643e3f3c2f7631313a636f7272656c6174696f6e5265717565737449643e0a2020202020202020202020203c7631313a7573657249643e3f3c2f7631313a7573657249643e0a2020202020202020202020203c7631313a7265717565737454696d655374616d703e3f3c2f7631313a7265717565737454696d655374616d703e0a2020202020202020203c2f526571756573744865616465723e0a2020202020202020203c4c6973744f6649415454726176656c6c657249643e0a2020202020202020202020203c2f4c6973744f6649415454726176656c6c657249643e0a2020202020203c2f76313a476574486973746f726963616c426f6f6b696e6744617461526571756573743e0a2020203c2f736f6170656e763a426f64793e0a3c2f736f6170656e763a456e76656c6f70653e**Root**Error occurred in ImbSOAPInputHelper::validateSOAPInput()**Node throwing exception**</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetHistoricalBookingData>
         </detail>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

const NoSoapActionFault =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>No SOAP Action specified</faultstring>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

route.post("/PNRDataService", (req, res) => {

    console.log("=============================================================================");
    console.log("mock /PNRDataService called");
    console.log("=============================================================================");

    const timestamp = new Date().getTime();
    const faultItUp = false;  //timestamp % 2 === 0;
    const soapAction = req.get("SOAPAction");
    res.set("Content-Type", "text/xml");

    if(soapAction === GetCurrentBookingDataSoapAction) {
        if(faultItUp) {
            res.status(500).send(GetCurrentBookingDataFault);
        } else {
            res.send(GetCurrentBookingDataResponse);
        }
    } else if(soapAction === GetHistoricalBookingDataSoapAction) {
        if(faultItUp) {
            res.status(500).send(GetHistoricalBookingDataFault);
        } else {
            res.send(GetHistoricalBookingDataResponse);
        }
    } else {
        res.status(500).send(NoSoapActionFault);
    }
});

module.exports = route;
