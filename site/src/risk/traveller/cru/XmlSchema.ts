import IXmlType from "xml/IXmlType";
import { string, dateTime, date, decimal, int, boolean, short } from "xml/SimpleXmlType";
import {
    ContactType,
    AddressType,
    CruiseBookingItineraryType,
    ConnectionType,
    ReservationNameType,
    TravelDocInfoType,
    IATTravellerType
} from "risk/traveller/cru/common/XmlSchema";
import { PersonInfoType, VisaInfoType } from "risk/traveller/iat/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/cru/v1";

const BookingRecordInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingRecordInfoType",
    props: {
        BookingSystemCode: { type: string },
        RecordLocator: { type: string },
        CruiseCreationTimeStamp: { type: dateTime },
        CruiseSource: { type: string }
    }
};

const CruiseSummaryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CruiseSummaryType",
    props: {
        CruiseCode: { type: string },
        CruiseCompanyName: { type: string },
        CruiseDirection: { type: string },
        CruiseType: { type: string },
        CruiseEndCbrArrDateTime: { type: dateTime },
        CruiseEndCountryCode: { type: string },
        CruiseEndCountryName: { type: string },
        CruiseEndPortCode: { type: string },
        CruiseNights: { type: int },
        CruiseShipName: { type: string },
        CruiseStatus: { type: string },
        CruiseStartDepCbrDateTime: { type: dateTime },
        CruiseStartDepCountryCode: { type: string },
        CruiseStartDepCountryName: { type: string },
        CruiseStartDepPortCode: { type: string },
        NoOfSegments: { type: string }
    }
};

const ListOfContactType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfContactType",
    props: {
        Contact: { type: ContactType, array: true }
    }
};

const BookingSummaryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingSummaryType",
    props: {
        TravelType: { type: string },
        BookingDate: { type: date },
        BookingCity: { type: string },
        CurrentBookingDBT: { type: int },
        TotalLengthOfTravel: { type: int },
        InitialCountryCode: { type: string },
        InitialBoardingDate: { type: date },
        InitialBoardingPortCode: { type: string },
        LastDisembarkingDate: { type: date },
        LastDisembarkingPortCode: { type: string },
        DisembarkingCountryCode: { type: string },
        CruiseStartDate: { type: date },
        CruiseStartPort: { type: string },
        CruiseEndDate: { type: date },
        CruiseEndPort: { type: string },
        CancelledIndicator: { type: boolean },
        NoOfBorderMovements: { type: int },
        NoOfCruiseSegments: { type: int },
        NoOfMinorsInGroup: { type: int },
        NoOfTeensInGroup: { type: int },
        NoOfAdultsIngroup: { type: int },
        NoOfSeniorsInGroup: { type: int },
        MostTimeSpentCruiseRegion: { type: string }
    }
};

const ListOfAddressType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfAddressType",
    props: {
        Address: { type: AddressType, array: true }
    }
};

const TravelAgentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravelAgentType",
    props: {
        IATAAgentCode: { type: string },
        AgentName: { type: string },
        ABN: { type: string },
        AssociationCode: { type: string },
        Location: { type: string },
        ManagerName: { type: string },
        StatusCOde: { type: string }, // NOTE: typo in schema
        OwnerName: { type: string },
        ConsultantID: { type: string },
        RoleTypeCode: { type: string },
        Addresses: { type: ListOfAddressType },
        Contacts: { type: ListOfContactType }
    }
};

const ListOfTravelAgentType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTravelAgentType",
    props: {
        TravelAgent: { type: TravelAgentType, array: true }
    }
};

const CruiseBooking : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CruiseBooking",
    props: {
        AirAmount: { type: decimal },
        ApoCategoryCode: { type: string },
        BookingCategoryCode: { type: string },
        BookingComment: { type: string },
        BookingDate: { type: date },
        BookingPLAmount: { type: decimal },
        BookingStatus: { type: string },
        BrochureCode: { type: string },
        BrochureFareAmount: { type: decimal },
        CabinNumber: { type: string },
        CabinTypeDescription: { type: string },
        CancelFeesAmount: { type: decimal },
        CoachAmount: { type: decimal },
        CommissionAmount: { type: decimal },
        CurrencyCode: { type: string },
        DiscountAmount: { type: decimal },
        FareCode: { type: string },
        FeesAmount: { type: decimal },
        GrossAmount: { type: decimal },
        GroupName: { type: string },
        InsuranceAmount: { type: decimal },
        LandTourAmount: { type: decimal },
        MiscellaneousAmount: { type: decimal },
        NetAmount: { type: decimal },
        NumberPaxBooking: { type: int },
        NumberPaxCabin: { type: int },
        OnBoardCreditAmount: { type: decimal },
        OpenDateTime: { type: dateTime },
        OptionDateTime: { type: dateTime },
        BookedDateTime: { type: dateTime },
        OverrideCommissionAmount: { type: decimal },
        PackageAmount: { type: decimal },
        PID: { type: string },
        PromoCode: { type: string },
        ReceivedAmount: { type: decimal },
        SpecialServiceAmount: { type: decimal },
        TicketedFareAmount: { type: decimal },
        TravelAgentFeesAmount: { type: decimal },
        TWID: { type: string },
        VATAmount: { type: decimal },
        CruiseSummaryInfo: { type: CruiseSummaryType },
        ContactInfo: { type: ListOfContactType },
        BookingSummaryInfo: { type: BookingSummaryType },
        TravelAgentInfo: { type: ListOfTravelAgentType }
    }
};

const ListOfCruiseBookingItineraryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfCruiseBookingItineraryType",
    props: {
        CruiseBookingItinerary: { type: CruiseBookingItineraryType, array: true }
    }
};

const ListOfConnectionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfConnectionType",
    props: {
        Connection: { type: ConnectionType, array: true }
    }
};

const ListOfTravelDocInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTravelDocInfoType",
    props: {
        TravelDocInfo: { type: TravelDocInfoType, array: true }
    }
};

const CruiseTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CruiseTravellerType",
    props: {
        PassengerNumber: { type: short },
        TravelDoc: { type: ListOfTravelDocInfoType },
        Addresses: { type: ListOfAddressType },
        Contacts: { type: ListOfContactType },
        Biographic: { type: PersonInfoType },
        ReservationName: { type: ReservationNameType }
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
        PassengerNumber: { type: short },
        LoyaltyId: { type: string },
        LoyaltyLevel: { type: string },
        NoOfCruises: { type: int },
        BerthCode: { type: string },
        MedicalCode: { type: string },
        DietCode: { type: string },
        ConcessionCode: { type: string },
        InsuranceInd: { type: string },
        CurrentCruiseFlag: { type: string },
        PassengerStatus: { type: string },
        CompleteCruiseItinerary: { type: string },
        Connections: { type: ListOfConnectionType },
        CruiseTraveller: { type: CruiseTravellerType },
        IATTraveller: { type: IATTravellerType },
        BookingVisaInfo: { type: BookingVisaType }
    }
};

const ListOfTravellerSummaryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTravellerSummaryType",
    props: {
        TravellerSummary: { type: TravellerSummaryType, array: true }
    }
};

const CruiseBookingDataType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "CruiseBookingDataType",
    props: {
        BookingRecordInfo: { type: BookingRecordInfoType },
        CruiseBooking: { type: CruiseBooking },
        CruiseBookingItineraries: { type: ListOfCruiseBookingItineraryType },
        TravellerInfo: { type: ListOfTravellerSummaryType }
    }
};

const DirectionCodeType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "DirectionCodeType",
    restriction: { base: string }
};

const HistoricalRecordType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "HistoricalRecordType",
    props: {
        RecordLocator: { type: string },
        CreationTimeStamp: { type: dateTime },
        LocalScheduledDate: { type: date },
        LocalPortCode: { type: string },
        DirectionCode: { type: DirectionCodeType },
        RouteId: { type: string },
        LastReceivedTimeStamp: { type: dateTime },
        Carrier: { type: string },
        Traveller: { type: CruiseTravellerType }
    }
};

const MatchedIATTravellerType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "MatchedIATTravellerType",
    props: {
        CruiseTraveller: { type: CruiseTravellerType },
        IATTraveller: { type: IATTravellerType }
    }
};

export {
    namespaceURI,
    CruiseBookingDataType,
    HistoricalRecordType,
    MatchedIATTravellerType
}
