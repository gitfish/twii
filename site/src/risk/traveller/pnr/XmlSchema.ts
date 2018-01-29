import IXmlType from "xml/IXmlType";
import { string, date, time, dateTime, int, short, boolean } from "xml/SimpleXmlType";
import { PNRTravellerType, IATTravellerType , CheckInInfoType} from "risk/traveller/pnr/common/XmlSchema";
import { VisaInfoType } from "risk/traveller/iat/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/pnr/v1";

const PNRSourceType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRSourceType"
};

const BookingRecordInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingRecordInfoType",
    props: {
        BookingSystemCode: { type: string},
        RecordLocator: { type: string },
        PNRCreationTimeStamp: { type: dateTime },
        PNRSource: { type: PNRSourceType }
    }
};

const BookingSummaryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingSummaryType",
    props: {
        PNRTravelType: { type: string},
        BookingDate: { type: date },
        BookingCity: { type: string },
        FormOfPayment: { type: string },
        IntentToTravelDate: { type: date },
        TravelGroupName: { type: string },
        OriginalBookingDBT: { type: int },
        CurrentBookingDBT: { type: int },
        MostTimeSpentDays: { type: int },
        MostTimeSpentCountry: { type: string },
        MostTimeSpentPort: { type: string },
        TotalLengthOfStay: { type: int },
        IntendLengthOfStay: { type: int },
        TotalLengthOfTrip: { type: int },
        TotalIntendedLengthOfTrip: { type: int },
        TotalLengthOfTravel: { type: int },
        ActiveSegmentCount: { type: int },
        CancelledSegmentCount: { type: int },
        TravellerCount: { type: int },
        MinorsInGroupCount: { type: int },
        TCPNumber: { type: int },
        DepartureCanberraTimeStamp: { type: dateTime }
    }
};

const PNRRecordKeyType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRRecordKeyType",
    props: {
        RecordLocator: { type: string },
        BookingSystemCode: { type : string },
        PNRCreationTimeStamp: { type: dateTime }
    }
};

const ListOfLinkedPNRType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfLinkedPNRType",
    props: {
        PNRRecordKey: { type: PNRRecordKeyType, array: true }
    }
};

const ListOfSplitPNRType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfSplitPNRType",
    props: {
        PNRRecordKey: { type: PNRRecordKeyType, array: true }
    }
};

const BookingVisaType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingVisaType",
    props: {
        Visa: { type: VisaInfoType },
        VisaDBT: { type: int }
    }
};

const TravellerSummaryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravellerSummaryType",
    props: {
        StaffInd: { type: string },
        PNRTraveller: { type: PNRTravellerType },
        IATTraveller: { type: IATTravellerType },
        FirstTimeTravelInd: { type: string },
        PreviousTripCount: { type: int },
        BookingVisaInfo: { type: BookingVisaType },
        TravelDocDeptCntyCodeInd: { type: string },
        CntyOfOrgDeptInd: { type: string },
        AirlineCompanyId: { type: string },
        AirlineFrequentFlyerNum: { type: string },
        AirlineMembershipLevel: { type: string },
        AllianceCompanyId: { type: string },
        AllianceFrequentFlyerNum: { type: string },
        AllianceMembershipLevel: { type: string }
    }
};

const ListOfTravellerSummaryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTravellerSummaryType",
    props: {
        TravellerSummary: { type: TravellerSummaryType, array: true }
    }
};

const BaggageType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BaggageType",
    props: {
        PassengerTattoo: { type: string },
        BagsCount: { type: string },
        TotalWeight: { type: string },
        AvgWeight: { type: string },
        Tags: { type: string },
        BoardingPort: { type: string },
        DestinationPort: { type: string },
        InterlineInd: { type: string },
        PoolId: { type: string },
        TravellerInPoolCount: { type: int },
        HOPInd: { type: string }
    }
};

const CheckinBoardingType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CheckinBoardingType",
    props: {
        PassengerTattoo: { type: short },
        Route: { type: string },
        RouteId: { type: string },
        DepartureTimeStamp: { type: dateTime },
        CheckInInfo: { type: CheckInInfoType },
        AllocatedSeat: { type: string },
        RequestedSeat: { type: string },
        CabinClass: { type: string },
        SeparateSeatInd: { type: string },
        SeatBoardingPort: { type: string },
        SeatDestinationPort: { type: string },
        BoardingStatus: { type: string },
        GoShowInd: { type: string },
        NoShowInd: { type: string },
        BaggageInfo: { type: BaggageType }
    }
};

const ListOfCheckinBoardingType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfCheckinBoardingType",
    props: {
        CheckingBoarding: { type: CheckinBoardingType, array: true } // NOTE: typo from definition
    }
};

const TicketingType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TicketingType",
    props: {
        PassengerTattoo: { type: short },
        TicketType: { type: string },
        TicketNumber: { type: string }
    }
};

const ListOfTicketingType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTicketingType",
    props: {
        Ticketing: { type: TicketingType, array: true }
    }
};

const ContactType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ContactType",
    props: {
        PassengerTattoo: { type: short },
        Type: { type: string },
        FreeTextValue: { type: string }
    }
};

const ListOfContactType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfContactType",
    props: {
        Contact: { type: ContactType, array: true }
    }
};

const ItineraryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ItineraryType",
    props: {
        SegmentTattoo: { type: int },
        CancellationInd: { type: string },
        TransportType: { type: string },
        CraftId: { type: string },
        CodeShare: { type: string },
        CabinClass: { type: string },
        FareClass: { type: string },
        Route: { type: string },
        DepartureDate: { type: date },
        DepartureTime: { type: time },
        ArrivalDate: { type: date },
        ArrivalTime: { type: time },
        DepatureDay: { type: string },
        Status: { type: string },
        DaysAtArrivalPort: { type: int },
        HotelName: { type: string },
        HotelAddress: { type: string },
        CheckinBoardingInfo: { type: ListOfCheckinBoardingType },
        TicketingInfo: { type: ListOfTicketingType },
        ContactInfo: { type: ListOfContactType }
    }
};

const ListOfItineraryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfItineraryType",
    props: {
        Itinerary: { type: ItineraryType, array: true }
    }
};

const DirectionCodeType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "DirectionCodeType"
};

const PNRPushHistoryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRPushHistoryType",
    props: {
        DirectionCode: { type: DirectionCodeType },
        RouteId: { type: string },
        LocalPort: { type: string },
        ScheduledDate: { type: date },
        PushTypeCode: { type: string },
        PushNumber: { type: short },
        PNRReceivedTimeStamp: { type: dateTime }
    }
};

const ListOfPNRPushHistoryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfPNRPushHistoryType",
    props: {
        PNRPushHistory: { type: PNRPushHistoryType, array: true }
    }
};

const TravelAgentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravelAgentType",
    props: {
        AgentName: { type: string },
        Location: { type: string },
        AgentContactName: { type: string },
        IATAAgentCode: { type: string },
        RoleTypeCode: { type: string }
    }
};

const ListOfTravelAgentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTravelAgentType",
    props: {
        TravelAgent: { type: TravelAgentType, array: true }
    }
};

const PaymentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PaymentType",
    props: {
        FormOfPayment: { type: string },
        Type: { type: string },
        Amount: { type: int },
        Tax: { type: int },
        CreditCardNumber: { type: string },
        CreditCardName: { type: string },
        Currency: { type: string },
        FreeTextValue: { type: string }
    }
};

const ListOfPaymentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfPaymentType",
    props: {
        Payment: { type: PaymentType, array: true }
    }
};

const SpecialServiceRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "SpecialServiceRequestType",
    props: {
        SegmentTattoo: { type: short },
        PassengerTattoo: { type: short },
        SSRCode: { type: string },
        FreeTextValue: { type: string }
    }
};

const ListOfSpecialServiceRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfSpecialServiceRequestType",
    props: {
        SpecialServiceRequest: { type: SpecialServiceRequestType, array: true }
    }
};

const OtherServiceType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "OtherServiceType",
    props: {
        PassengerTattoo: { type: short },
        SegmentTattoo: { type: short },
        OSICode: { type: string },
        FreeTextValue: { type: string }
    }
};

const ListOfOtherServiceType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfOtherServiceType",
    props: {
        OtherService: { type: OtherServiceType, array: true }
    }
};

const SKOtherCommentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "SKOtherCommentType",
    props: {
        PassengerTattoo: { type: short },
        SegmentTattoo: { type: short },
        Type: { type: string },
        Code: { type: string },
        FreeTextValue: { type: string }
    }
};

const ListOfSKOtherCommentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfSKOtherCommentType",
    props: {
        SKOtherComment: { type: SKOtherCommentType, array: true }
    }
};

const PNRHistoryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRHistoryType",
    props: {
        PrevPNREnvelopeNum: { type: short },
        NewPNREnvelopeNum: { type: short },
        Action: { type: string },
        Element: { type: string },
        HistoryData: { type: string },
        CreatorIATACode: { type: string },
        CreatorId: { type: string },
        CreatorCityCode: { type: string },
        CreatorCompanyId: { type: string },
        CreationTimeStamp: { type: dateTime }
    }
};

const ListOfPNRHistoryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfPNRHistoryType",
    props: {
        PNRHistory: { type: PNRHistoryType, array: true }
    }
};

const PNRRecordType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PNRRecordType",
    props: {
        BookingRecordInfo: { type: BookingRecordInfoType },
        BookingSummaryInfo: { type: BookingSummaryType },
        LinkedPNRInfo: { type: ListOfLinkedPNRType },
        SplitPNRInfo: { type: ListOfSplitPNRType },
        TravellerInfo: { type: ListOfTravellerSummaryType },
        ItineraryInfo: { type: ListOfItineraryType },
        PNRPushHistoryInfo: { type: ListOfPNRPushHistoryType },
        TravelAgentInfo: { type: ListOfTravelAgentType },
        PaymentInfo: { type: ListOfPaymentType },
        ContactInfo: { type: ListOfContactType },
        SpecialServiceRequestInfo: { type: ListOfSpecialServiceRequestType },
        OtherServiceInfo: { type: ListOfOtherServiceType },
        PNRSKOtherCommentInfo: { type: ListOfSKOtherCommentType },
        PNRHistoryInfo: { type: ListOfPNRHistoryType }
    }
};

const HistoricalPNRRecordType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "HistoricalPNRRecordType",
    props: {
        RecordLocator: { type: string },
        CreationTimeStamp: { type: dateTime },
        LocalScheduledDate: { type: date },
        LocalPortCode: { type: string },
        DirectionCode: { type: DirectionCodeType },
        RouteId: { type: string },
        LastReceivedTimeStamp: { type: dateTime },
        PNRPushCount: { type: int },
        Carrier: { type: string },
        PNRTraveller: { type: PNRTravellerType }
    }
};

const MatchedIATTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "MatchedIATTravellerType",
    props: {
        PNRTraveller: { type: PNRTravellerType },
        IATTraveller: { type: IATTravellerType }
    }
};

export {
    namespaceURI,
    PNRRecordType,
    HistoricalPNRRecordType,
    MatchedIATTravellerType
}
