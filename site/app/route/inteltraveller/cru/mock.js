const express = require("express");

const route = express.Router();

const GetCurrentCruBookingDataSoapAction = "http://border.gov.au/risk/traveller/cru/v1/GetCurrentCruBookingData";
const GetHistoricalCruBookingDataSoapAction = "http://border.gov.au/risk/traveller/cru/v1/GetHistoricalCruBookingData";

const GetCurrentCruBookingDataFault =
`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/cru/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Server</faultcode>
         <faultstring>TME107-No Current Booking Record Found</faultstring>
         <detail>
            <exe:GetCurrentCruBookingData>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME107</com:errorCode>
                  <com:errorDescription>No Current Booking Record Found:</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetCurrentCruBookingData>
         </detail>
      </soap:Fault>
   </soap:Body>
</soap:Envelope>`;

const GetCurrentCruBookingDataResponse =
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <res:GetCurrentCruBookingDataResponse xmlns:res="http://border.gov.au/service/risk/traveller/cru/response/v1" xmlns:com="http://border.gov.au/service/risk/traveller/cru/common/v1" xmlns:iat="http://border.gov.au/service/risk/traveller/iat/common/v1" xmlns:cru="http://border.gov.au/service/risk/traveller/cru/v1">
            <res:CurrentCruBookingData>
                <cru:BookingRecordInfo>
                    <cru:BookingSystemCode>PA</cru:BookingSystemCode>
                    <cru:RecordLocator>5JVPMQ</cru:RecordLocator>
                    <cru:CruiseCreationTimeStamp>2017-08-04T14:21:09.000</cru:CruiseCreationTimeStamp>
                </cru:BookingRecordInfo>
                <cru:CruiseBooking>
                    <cru:AirAmount>0.00</cru:AirAmount>
                    <cru:ApoCategoryCode>IF</cru:ApoCategoryCode>
                    <cru:BookingCategoryCode>IE</cru:BookingCategoryCode>
                    <cru:BookingPLAmount>364.00</cru:BookingPLAmount>
                    <cru:BookingStatus>B</cru:BookingStatus>
                    <cru:BrochureFareAmount>5288.00</cru:BrochureFareAmount>
                    <cru:CabinNumber>5110           </cru:CabinNumber>
                    <cru:CabinTypeDescription>Inside</cru:CabinTypeDescription>
                    <cru:CancelFeesAmount>0.00</cru:CancelFeesAmount>
                    <cru:CoachAmount>0.00</cru:CoachAmount>
                    <cru:CommissionAmount>0.00</cru:CommissionAmount>
                    <cru:CurrencyCode>AUD</cru:CurrencyCode>
                    <cru:DiscountAmount>-3812.00</cru:DiscountAmount>
                    <cru:FareCode>W33</cru:FareCode>
                    <cru:FeesAmount>120.00</cru:FeesAmount>
                    <cru:GrossAmount>1596.00</cru:GrossAmount>
                    <cru:InsuranceAmount>0.00</cru:InsuranceAmount>
                    <cru:LandTourAmount>0.00</cru:LandTourAmount>
                    <cru:MiscellaneousAmount>0.00</cru:MiscellaneousAmount>
                    <cru:NetAmount>1596.00</cru:NetAmount>
                    <cru:NumberPaxBooking>2</cru:NumberPaxBooking>
                    <cru:NumberPaxCabin>2</cru:NumberPaxCabin>
                    <cru:OnBoardCreditAmount>0.00</cru:OnBoardCreditAmount>
                    <cru:OpenDateTime>2017-08-04T14:21:09</cru:OpenDateTime>
                    <cru:OptionDateTime>2017-08-04T00:00:00</cru:OptionDateTime>
                    <cru:BookedDateTime>2017-08-04T00:00:00</cru:BookedDateTime>
                    <cru:OverrideCommissionAmount>0.00</cru:OverrideCommissionAmount>
                    <cru:PackageAmount>0.00</cru:PackageAmount>
                    <cru:ReceivedAmount>1596.00</cru:ReceivedAmount>
                    <cru:SpecialServiceAmount>0.00</cru:SpecialServiceAmount>
                    <cru:TicketedFareAmount>1476.00</cru:TicketedFareAmount>
                    <cru:TravelAgentFeesAmount>0.00</cru:TravelAgentFeesAmount>
                    <cru:VATAmount>0.00</cru:VATAmount>
                    <cru:CruiseSummaryInfo>
                        <cru:CruiseCode>W740           </cru:CruiseCode>
                        <cru:CruiseCompanyName>P&amp;O Cruises</cru:CruiseCompanyName>
                        <cru:CruiseDirection>R</cru:CruiseDirection>
                        <cru:CruiseEndCbrArrDateTime>2017-08-26T06:00:00</cru:CruiseEndCbrArrDateTime>
                        <cru:CruiseEndCountryCode>BNE  </cru:CruiseEndCountryCode>
                        <cru:CruiseNights>7</cru:CruiseNights>
                        <cru:CruiseShipName>Pacific Dawn</cru:CruiseShipName>
                        <cru:CruiseStartDepCbrDateTime>2017-08-19T14:00:00</cru:CruiseStartDepCbrDateTime>
                        <cru:NoOfSegments>4</cru:NoOfSegments>
                    </cru:CruiseSummaryInfo>
                    <cru:ContactInfo>
                        <cru:Contact>
                            <com:HomePhoneNumber>9200000001</com:HomePhoneNumber>
                            <com:FaxNumber>9200000001</com:FaxNumber>
                        </cru:Contact>
                    </cru:ContactInfo>
                    <cru:BookingSummaryInfo>
                        <cru:TravelType>RoundTrip-MultiEntry</cru:TravelType>
                        <cru:BookingDate>2017-08-04</cru:BookingDate>
                        <cru:CurrentBookingDBT>15</cru:CurrentBookingDBT>
                        <cru:TotalLengthOfTravel>7</cru:TotalLengthOfTravel>
                        <cru:InitialBoardingDate>2017-08-19</cru:InitialBoardingDate>
                        <cru:InitialBoardingPortCode>BNE </cru:InitialBoardingPortCode>
                        <cru:LastDisembarkingDate>2017-08-26</cru:LastDisembarkingDate>
                        <cru:LastDisembarkingPortCode>BNE </cru:LastDisembarkingPortCode>
                        <cru:CruiseStartDate>2017-08-19</cru:CruiseStartDate>
                        <cru:CruiseStartPort>BNE </cru:CruiseStartPort>
                        <cru:CruiseEndDate>2017-08-26</cru:CruiseEndDate>
                        <cru:CruiseEndPort>BNE </cru:CruiseEndPort>
                        <cru:NoOfBorderMovements>2</cru:NoOfBorderMovements>
                        <cru:NoOfCruiseSegments>4</cru:NoOfCruiseSegments>
                        <cru:NoOfMinorsInGroup>0</cru:NoOfMinorsInGroup>
                        <cru:NoOfTeensInGroup>0</cru:NoOfTeensInGroup>
                        <cru:NoOfAdultsIngroup>0</cru:NoOfAdultsIngroup>
                        <cru:NoOfSeniorsInGroup>2</cru:NoOfSeniorsInGroup>
                    </cru:BookingSummaryInfo>
                    <cru:TravelAgentInfo>
                        <cru:TravelAgent>
                            <cru:IATAAgentCode>PA-DIRECTAU    </cru:IATAAgentCode>
                            <cru:AgentName>DIRECT AUSTRALIA</cru:AgentName>
                            <cru:ABN>CAUINTERNAL    </cru:ABN>
                            <cru:AssociationCode>DIRT           </cru:AssociationCode>
                            <cru:StatusCOde>P</cru:StatusCOde>
                            <cru:Addresses>
                                <cru:Address>
                                    <com:ID>40394R143902120215            </com:ID>
                                    <com:Line1>DIRECTAU</com:Line1>
                                    <com:Line4>NSW</com:Line4>
                                    <com:PostCode>2000</com:PostCode>
                                </cru:Address>
                            </cru:Addresses>
                        </cru:TravelAgent>
                    </cru:TravelAgentInfo>
                </cru:CruiseBooking>
                <cru:CruiseBookingItineraries>
                    <cru:CruiseBookingItinerary>
                        <com:ArrivalDateTime>2017-08-21T15:00:00</com:ArrivalDateTime>
                        <com:ArrivalPortCode>NOU  </com:ArrivalPortCode>
                        <com:ArrivalPortName>Brisbane</com:ArrivalPortName>
                        <com:ArrivalPortCountryCode>NCL  </com:ArrivalPortCountryCode>
                        <com:BoardingDateTime>2017-08-19T10:00:00</com:BoardingDateTime>
                        <com:DepartureDateTime>2017-08-19T14:00:00</com:DepartureDateTime>
                        <com:DeparturePortCode>BNE  </com:DeparturePortCode>
                        <com:DeparturePortName>AUS  </com:DeparturePortName>
                        <com:CruiseBorderItinerary>
                            <com:CruiseEndCbrArrDateTime>2017-08-26T06:00:00</com:CruiseEndCbrArrDateTime>
                            <com:CruiseEndArrDate>2017-08-26</com:CruiseEndArrDate>
                            <com:CruiseEndArrCountryCode>AUS </com:CruiseEndArrCountryCode>
                            <com:CruiseEndArrCountryName>AUSTRALIA</com:CruiseEndArrCountryName>
                            <com:CruiseEndArrPortCode>BNE </com:CruiseEndArrPortCode>
                            <com:CruiseStartDepCbrArrDateTime>2017-08-19T14:00:00</com:CruiseStartDepCbrArrDateTime>
                            <com:CruiseStartDepCountryCode>AUS </com:CruiseStartDepCountryCode>
                            <com:CruiseStartDepCountryName>AUSTRALIA</com:CruiseStartDepCountryName>
                            <com:CruiseStartDepPortCode>BNE </com:CruiseStartDepPortCode>
                            <com:CbrArrDateTime>2017-08-21T14:00:00</com:CbrArrDateTime>
                            <com:CbrDepDateTime>2017-08-19T14:00:00</com:CbrDepDateTime>
                            <com:LocalPortCode>BNE</com:LocalPortCode>
                            <com:ForeignPortCode>NOU</com:ForeignPortCode>
                            <com:DirectionCode>O</com:DirectionCode>
                            <com:OverAllLenghtOfTravel>7</com:OverAllLenghtOfTravel>
                            <com:IntentToTravelDate>2017-08-19</com:IntentToTravelDate>
                            <com:CruiseNextArrPortCode>LIF </com:CruiseNextArrPortCode>
                            <com:CruiseNextArrPortCountryCode>NCL </com:CruiseNextArrPortCountryCode>
                            <com:CruiseNextArrCbrDateTime>2017-08-22T07:00:00</com:CruiseNextArrCbrDateTime>
                            <com:CruiseNextArrDate>2017-08-22</com:CruiseNextArrDate>
                            <com:CruiseNextArrCountryName>NEW CALEDONIA</com:CruiseNextArrCountryName>
                            <com:LocalScheduledDate>2017-08-19</com:LocalScheduledDate>
                            <com:RouteID>C0102591</com:RouteID>
                            <com:CruiseItineraryNumber>1</com:CruiseItineraryNumber>
                        </com:CruiseBorderItinerary>
                    </cru:CruiseBookingItinerary>
                    <cru:CruiseBookingItinerary>
                        <com:ArrivalDateTime>2017-08-22T08:00:00</com:ArrivalDateTime>
                        <com:ArrivalPortCode>LIF  </com:ArrivalPortCode>
                        <com:ArrivalPortName>Noumea</com:ArrivalPortName>
                        <com:ArrivalPortCountryCode>NCL  </com:ArrivalPortCountryCode>
                        <com:BoardingDateTime>2017-08-21T21:30:00</com:BoardingDateTime>
                        <com:DepartureDateTime>2017-08-21T22:00:00</com:DepartureDateTime>
                        <com:DeparturePortCode>NOU  </com:DeparturePortCode>
                        <com:DeparturePortName>NCL  </com:DeparturePortName>
                    </cru:CruiseBookingItinerary>
                    <cru:CruiseBookingItinerary>
                        <com:ArrivalDateTime>2017-08-23T08:00:00</com:ArrivalDateTime>
                        <com:ArrivalPortCode>VLI  </com:ArrivalPortCode>
                        <com:ArrivalPortName>Lifou</com:ArrivalPortName>
                        <com:ArrivalPortCountryCode>VUT  </com:ArrivalPortCountryCode>
                        <com:BoardingDateTime>2017-08-22T16:00:00</com:BoardingDateTime>
                        <com:DepartureDateTime>2017-08-22T17:00:00</com:DepartureDateTime>
                        <com:DeparturePortCode>LIF  </com:DeparturePortCode>
                        <com:DeparturePortName>NCL  </com:DeparturePortName>
                    </cru:CruiseBookingItinerary>
                    <cru:CruiseBookingItinerary>
                        <com:ArrivalDateTime>2017-08-26T06:00:00</com:ArrivalDateTime>
                        <com:ArrivalPortCode>BNE  </com:ArrivalPortCode>
                        <com:ArrivalPortName>Vila</com:ArrivalPortName>
                        <com:ArrivalPortCountryCode>AUS  </com:ArrivalPortCountryCode>
                        <com:BoardingDateTime>2017-08-23T16:30:00</com:BoardingDateTime>
                        <com:DepartureDateTime>2017-08-23T17:00:00</com:DepartureDateTime>
                        <com:DeparturePortCode>VLI  </com:DeparturePortCode>
                        <com:DeparturePortName>VUT  </com:DeparturePortName>
                        <com:CruiseBorderItinerary>
                            <com:CruiseEndCbrArrDateTime>2017-08-26T06:00:00</com:CruiseEndCbrArrDateTime>
                            <com:CruiseEndArrDate>2017-08-26</com:CruiseEndArrDate>
                            <com:CruiseEndArrCountryCode>AUS </com:CruiseEndArrCountryCode>
                            <com:CruiseEndArrCountryName>AUSTRALIA</com:CruiseEndArrCountryName>
                            <com:CruiseEndArrPortCode>BNE </com:CruiseEndArrPortCode>
                            <com:CruiseStartDepCbrArrDateTime>2017-08-19T14:00:00</com:CruiseStartDepCbrArrDateTime>
                            <com:CruiseStartDepDate>2017-08-22</com:CruiseStartDepDate>
                            <com:CruiseStartDepCountryCode>AUS </com:CruiseStartDepCountryCode>
                            <com:CruiseStartDepCountryName>AUSTRALIA</com:CruiseStartDepCountryName>
                            <com:CruiseStartDepPortCode>BNE </com:CruiseStartDepPortCode>
                            <com:CbrArrDateTime>2017-08-26T06:00:00</com:CbrArrDateTime>
                            <com:CbrDepDateTime>2017-08-23T16:00:00</com:CbrDepDateTime>
                            <com:LocalPortCode>BNE</com:LocalPortCode>
                            <com:ForeignPortCode>VLI</com:ForeignPortCode>
                            <com:DirectionCode>I</com:DirectionCode>
                            <com:OverAllLenghtOfTravel>7</com:OverAllLenghtOfTravel>
                            <com:IntentToTravelDate>2017-08-19</com:IntentToTravelDate>
                            <com:CruisePrevDepPortCode>LIF </com:CruisePrevDepPortCode>
                            <com:CruisePrevDepPortCountryCode>NCL </com:CruisePrevDepPortCountryCode>
                            <com:CruisePrevCbrDateTime>2017-08-22T16:00:00</com:CruisePrevCbrDateTime>
                            <com:CruisePrevDepCountryName>NEW CALEDONIA</com:CruisePrevDepCountryName>
                            <com:LocalScheduledDate>2017-08-26</com:LocalScheduledDate>
                            <com:RouteID>C0102591</com:RouteID>
                            <com:CruiseItineraryNumber>4</com:CruiseItineraryNumber>
                        </com:CruiseBorderItinerary>
                    </cru:CruiseBookingItinerary>
                </cru:CruiseBookingItineraries>
                <cru:TravellerInfo>
                    <cru:TravellerSummary>
                        <cru:PassengerNumber>1</cru:PassengerNumber>
                        <cru:Connections/>
                        <cru:CruiseTraveller>
                            <cru:TravelDoc>
                                <cru:TravelDocInfo>
                                    <iat:travelDocId>N3851814</iat:travelDocId>
                                    <iat:travelDocCountryCode>AU   </iat:travelDocCountryCode>
                                    <iat:issueCountryCode>               </iat:issueCountryCode>
                                    <iat:travelDocExpiryDate>2021-02-16</iat:travelDocExpiryDate>
                                    <com:ImmigrationDeptCountryCode>AUS </com:ImmigrationDeptCountryCode>
                                    <com:TravelDocPlaceOfIssue>               </com:TravelDocPlaceOfIssue>
                                    <com:TravelDocNationality>AU   </com:TravelDocNationality>
                                </cru:TravelDocInfo>
                            </cru:TravelDoc>
                            <cru:Addresses>
                                <cru:Address>
                                    <com:Line1>8 KURRAJONG CRESCENT</com:Line1>
                                    <com:PostCode>4655</com:PostCode>
                                    <com:City>POINT VERNON</com:City>
                                    <com:State>QLD</com:State>
                                </cru:Address>
                            </cru:Addresses>
                            <cru:Contacts>
                                <cru:Contact>
                                    <com:HomePhoneNumber>0743254370</com:HomePhoneNumber>
                                    <com:Email>ROSEMARY.GILBY@OUTLOOK.COM</com:Email>
                                </cru:Contact>
                            </cru:Contacts>
                            <cru:Biographic>
                                <iat:familyName>GILBY</iat:familyName>
                                <iat:givenName>ROSEMARY</iat:givenName>
                                <iat:sexCode>F </iat:sexCode>
                                <iat:birthDate>19580416</iat:birthDate>
                                <iat:placeOfBirth>AU   </iat:placeOfBirth>
                            </cru:Biographic>
                        </cru:CruiseTraveller>
                        <cru:IATTraveller>
                             <com:IATTravellerId>0012345678</com:IATTravellerId>
                             <com:TravelDoc>
                                   <com:TravelDocInfo>
                                       <iat:travelDocId>N65463522</iat:travelDocId>
                                       <iat:travelDocCountryCode>AUS</iat:travelDocCountryCode>
                                       <iat:issueCountryCode>AUS</iat:issueCountryCode>
                                       <iat:travelDocExpiryDate>2016-9-1</iat:travelDocExpiryDate>
                                   </com:TravelDocInfo>
                                   <com:TravelDocDBT>120</com:TravelDocDBT>
                               </com:TravelDoc>
                               <com:Biographic>
                                   <iat:familyName>Johnson</iat:familyName>
                                   <iat:givenName>Corina Ann</iat:givenName>
                                   <iat:sexCode>M</iat:sexCode>
                                   <iat:birthDate>1989-01-01</iat:birthDate>
                                   <iat:birthCountryCode>AUS</iat:birthCountryCode>
                                   <iat:countryOfCitizenship>AUS</iat:countryOfCitizenship>
                               </com:Biographic>
                               <com:MatchedTravelDoc>
                                   <com:TravelDocInfo>
                                       <iat:travelDocId>N65463522</iat:travelDocId>
                                       <iat:travelDocCountryCode>AUS</iat:travelDocCountryCode>
                                       <iat:issueCountryCode>AUS</iat:issueCountryCode>
                                       <iat:travelDocExpiryDate>2016-9-1</iat:travelDocExpiryDate>
                                   </com:TravelDocInfo>
                                   <com:TravelDocDBT>120</com:TravelDocDBT>
                               </com:MatchedTravelDoc>
                        </cru:IATTraveller>
                    </cru:TravellerSummary>
                    <cru:TravellerSummary>
                        <cru:PassengerNumber>2</cru:PassengerNumber>
                        <cru:Connections/>
                        <cru:CruiseTraveller>
                            <cru:TravelDoc>
                                <cru:TravelDocInfo>
                                    <iat:travelDocId>N2603229</iat:travelDocId>
                                    <iat:travelDocCountryCode>AU   </iat:travelDocCountryCode>
                                    <iat:issueCountryCode>               </iat:issueCountryCode>
                                    <iat:travelDocExpiryDate>2020-04-01</iat:travelDocExpiryDate>
                                    <com:ImmigrationDeptCountryCode>AUS </com:ImmigrationDeptCountryCode>
                                    <com:TravelDocPlaceOfIssue>               </com:TravelDocPlaceOfIssue>
                                    <com:TravelDocNationality>AU   </com:TravelDocNationality>
                                </cru:TravelDocInfo>
                            </cru:TravelDoc>
                            <cru:Addresses>
                                <cru:Address>
                                    <com:Line1>8 KURRAJONG CRESCENT</com:Line1>
                                    <com:PostCode>4655</com:PostCode>
                                    <com:City>POINT VERNON</com:City>
                                    <com:State>QLD</com:State>
                                </cru:Address>
                            </cru:Addresses>
                            <cru:Contacts>
                                <cru:Contact>
                                    <com:HomePhoneNumber>0743254370</com:HomePhoneNumber>
                                    <com:Email>ROSEMARY.GILBY@OUTLOOK.COM</com:Email>
                                </cru:Contact>
                            </cru:Contacts>
                            <cru:Biographic>
                                <iat:familyName>DAVIES</iat:familyName>
                                <iat:givenName>GEOFFREY</iat:givenName>
                                <iat:sexCode>M </iat:sexCode>
                                <iat:birthDate>19430121</iat:birthDate>
                                <iat:placeOfBirth>GB   </iat:placeOfBirth>
                            </cru:Biographic>
                        </cru:CruiseTraveller>
                    </cru:TravellerSummary>
                </cru:TravellerInfo>
            </res:CurrentCruBookingData>
        </res:GetCurrentCruBookingDataResponse>
    </soapenv:Body>
</soapenv:Envelope>`;

const GetHistoricalCruBookingDataResponse =
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <GetHistoricalCruBookingDataResponse xmlns="http://border.gov.au/service/risk/traveller/cru/response/v1" xmlns:com="http://border.gov.au/service/risk/traveller/cru/common/v1" xmlns:cru="http://border.gov.au/service/risk/traveller/cru/v1" xmlns:iat="http://border.gov.au/service/risk/traveller/iat/common/v1">
         <ListOfHistoricalCruiseRecord>
            <Record>
               <cru:RecordLocator>5JVPMQ</cru:RecordLocator>
               <cru:CreationTimeStamp>2017-08-04T14:21:09</cru:CreationTimeStamp>
               <cru:LocalScheduledDate>2017-08-19</cru:LocalScheduledDate>
               <cru:LocalPortCode>BNE</cru:LocalPortCode>
               <cru:DirectionCode>O</cru:DirectionCode>
               <cru:RouteId>C0102591</cru:RouteId>
               <cru:LastReceivedTimeStamp>2017-08-25T14:30:02.510</cru:LastReceivedTimeStamp>
               <cru:Carrier>P&amp;O Cruises</cru:Carrier>
               <cru:Traveller>
                  <cru:Biographic>
                     <iat:familyName>DAVIES</iat:familyName>
                     <iat:givenName>GEOFFREY</iat:givenName>
                     <iat:sexCode>M</iat:sexCode>
                     <iat:birthDate>19430121</iat:birthDate>
                     <iat:birthCountryCode>GB</iat:birthCountryCode>
                  </cru:Biographic>
               </cru:Traveller>
            </Record>
         </ListOfHistoricalCruiseRecord>
         <ListOfMatchedIATTraveller>
            <MatchedIATTraveller>
               <cru:CruiseTraveller>
                  <cru:PassengerNumber>1</cru:PassengerNumber>
                  <cru:Biographic>
                     <iat:familyName>ROSEMARY</iat:familyName>
                  </cru:Biographic>
               </cru:CruiseTraveller>
               <cru:IATTraveller>
                  <com:IATTravellerId>0008845653</com:IATTravellerId>
                  <com:Biographic>
                     <iat:familyName>GILBY</iat:familyName>
                     <iat:givenName>ROSEMARY FLORENCE</iat:givenName>
                     <iat:sexCode>F</iat:sexCode>
                     <iat:birthCountryCode>AUS</iat:birthCountryCode>
                  </com:Biographic>
               </cru:IATTraveller>
            </MatchedIATTraveller>
            <MatchedIATTraveller>
               <cru:CruiseTraveller>
                  <cru:PassengerNumber>1</cru:PassengerNumber>
                  <cru:Biographic>
                     <iat:familyName>ROSEMARY</iat:familyName>
                  </cru:Biographic>
               </cru:CruiseTraveller>
               <cru:IATTraveller>
                  <com:IATTravellerId>0001673235</com:IATTravellerId>
                  <com:Biographic>
                     <iat:familyName>GILBY</iat:familyName>
                     <iat:givenName>ROSEMARY FLORENCE</iat:givenName>
                     <iat:sexCode>F</iat:sexCode>
                     <iat:birthCountryCode>AUS</iat:birthCountryCode>
                  </com:Biographic>
               </cru:IATTraveller>
            </MatchedIATTraveller>
            <MatchedIATTraveller>
               <cru:CruiseTraveller>
                  <cru:PassengerNumber>2</cru:PassengerNumber>
                  <cru:Biographic>
                     <iat:familyName>GEOFFREY</iat:familyName>
                  </cru:Biographic>
               </cru:CruiseTraveller>
               <cru:IATTraveller>
                  <com:IATTravellerId>0052620638</com:IATTravellerId>
                  <com:Biographic>
                     <iat:familyName>DAVIES</iat:familyName>
                     <iat:givenName>GEOFFREY BRITTEN</iat:givenName>
                     <iat:sexCode>M</iat:sexCode>
                     <iat:birthCountryCode>GBR</iat:birthCountryCode>
                  </com:Biographic>
               </cru:IATTraveller>
            </MatchedIATTraveller>
         </ListOfMatchedIATTraveller>
      </GetHistoricalCruBookingDataResponse>
   </soapenv:Body>
</soapenv:Envelope>`;

const GetHistoricalCruBookingDataFault =
`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://border.gov.au/service/risk/traveller/common/v1" xmlns:exe="http://border.gov.au/service/risk/traveller/cru/exception/v1">
   <soap:Body>
      <soap:Fault>
         <faultcode>soap:Client</faultcode>
         <faultstring>TME103-Invalid Service Request Input</faultstring>
         <detail>
            <exe:GetHistoricalCruBookingData>
               <exe:exception>
                  <com:status>ERROR</com:status>
                  <com:errorCode>TME103</com:errorCode>
                  <com:errorDescription>Invalid Service Request Input: A schema validation error has occurred while parsing the XML document**/XMLNSC/http://schemas.xmlsoap.org/soap/envelope/:Envelope/http://schemas.xmlsoap.org/soap/envelope/:Body/http://border.gov.au/service/risk/traveller/cru/request/v1:GetHistoricalCruBookingDataRequest/BookingCreationTimeStamp**cvc-datatype-valid.1.2: The value "2017-08-04Tx14:21:09.000000" is not a valid value for the "dateTime" datatype.**XML Parsing Errors have occurred**problem creating SOAP tree from bitstream**3c736f6170656e763a456e76656c6f706520786d6c6e733a736f6170656e763d22687474703a2f2f736368656d61732e786d6c736f61702e6f72672f736f61702f656e76656c6f70652f2220786d6c6e733a76313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f6372752f726571756573742f76312220786d6c6e733a7631313d22687474703a2f2f626f726465722e676f762e61752f736572766963652f7269736b2f74726176656c6c65722f636f6d6d6f6e2f7631223e0d0a2020203c736f6170656e763a4865616465722f3e0d0a2020203c736f6170656e763a426f64793e0d0a2020202020203c76313a476574486973746f726963616c437275426f6f6b696e6744617461526571756573743e0d0a2020202020202020203c526571756573744865616465723e0a2020202020202020202020203c7631313a636f7272656c6174696f6e5265717565737449643e3835323439383539343c2f7631313a636f7272656c6174696f6e5265717565737449643e0a2020202020202020202020203c7631313a7573657249643e585858583c2f7631313a7573657249643e0a2020202020202020202020203c7631313a7265717565737454696d655374616d703e323031372d30382d32385430373a35383a31372e3937315a3c2f7631313a7265717565737454696d655374616d703e0a2020202020202020203c2f526571756573744865616465723e0a2020202020202020203c426f6f6b696e6753797374656d436f64653e50413c2f426f6f6b696e6753797374656d436f64653e0a2020202020202020203c426f6f6b696e674372656174696f6e54696d655374616d703e323031372d30382d3034547831343a32313a30392e3030303030303c2f426f6f6b696e674372656174696f6e54696d655374616d703e0a2020202020202020203c5265636f72644c6f6361746f723e354a56504d513c2f5265636f72644c6f6361746f723e0a2020202020203c2f76313a476574486973746f726963616c437275426f6f6b696e6744617461526571756573743e0d0a2020203c2f736f6170656e763a426f64793e0d0a3c2f736f6170656e763a456e76656c6f70653e**Root**Error occurred in ImbSOAPInputHelper::validateSOAPInput()**Node throwing exception**</com:errorDescription>
                  <com:sourceSystem>IIB</com:sourceSystem>
               </exe:exception>
            </exe:GetHistoricalCruBookingData>
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

route.post("/CRUDataService", (req, res) => {
    const timestamp = new Date().getTime();
    const faultItUp = false;  //timestamp % 2 === 0;
    const soapAction = req.get("SOAPAction");
    res.set("Content-Type", "text/xml");

    if(soapAction === GetCurrentCruBookingDataSoapAction) {
        if(faultItUp) {
            res.status(500).send(GetCurrentCruBookingDataFault);
        } else {
            res.send(GetCurrentCruBookingDataResponse);
        }
    } else if(soapAction === GetHistoricalCruBookingDataSoapAction) {
        if(faultItUp) {
            res.status(500).send(GetHistoricalCruBookingDataFault);
        } else {
            res.send(GetHistoricalCruBookingDataResponse);
        }
    } else {
        res.status(500).send(NoSoapActionFault);
    }
});

module.exports = route;