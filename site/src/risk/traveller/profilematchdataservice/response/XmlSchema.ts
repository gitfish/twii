import { IXmlType } from "xml/IXmlType";
import { string, date, time, dateTime, int, short, boolean } from "xml/SimpleXmlType";
import { BookingKeyType } from "risk/traveller/profilematchdataservice/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchdataservice/response/v1";

const ProfileMatchType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ProfileMatchType",
    props: {
        ResultId: { type: string },
        BiographicFamilyName: { type: string },
        BiographicGivenName: { type: string },
        BiographicBirthDate: { type: string },
        BiographicSexCode: { type: string },
        BiographicIssueCountryCode: { type: string },
        BiographicTravelDocNbr: { type: string },
        BookingRecordLocator: { type: string },
        BookingCreationTimeStamp: { type: dateTime },
        BookingSystemCode: { type: string },
        BookingPassengerNumber: { type: int },
        IATTravellerID: { type: string },
        ProfileId: { type: string },
        ProfileName: { type: string },
        ProfileVersion: { type: string },
        ResultCreationTimeStamp: { type: dateTime },
        ReasonForMatch: { type: string },
        ResultTypeCode: { type: string },
        LocalScheduleDate: { type: date },
        RouteId: { type: string },
        Direction: { type: string },
        LocalPortCode: { type: string },
        CBRScheduledDateTime: { type: dateTime },
        BioDiffInd: { type: string },
        ProfileNote: { type: string },
        ProfileTier: { type: string },
        ActionInd: { type: string },
        ActionReason: { type: string },
        AlertNumber: { type: string },
        ActionUserId: { type: string }
    }
};

const ProfileMatchListType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ProfileMatchListType",
    props: {
        ProfileMatch: { type: ProfileMatchType, array: true }
    }
};

const ListOfProfileMatchType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfProfileMatchType",
    //choice of PassengerTattoo, PassengerNumber, or IATTravellerId  
    props: {
        PassengerTattoo: { type: short},
        PassengerNumber: { type: short},  
        IATTravellerId: { type: string }, // no type in the xsd 
        ProfileMatches: { type: ProfileMatchListType } 
    }
};

const ListsOfProfileMatchType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListsOfProfileMatchType",
    props: {
        ListOfProfileMatch: { type: ListOfProfileMatchType, array: true }
    }
};

const GetProfileMatchesResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileMatchesResponseType",
    //a choice of pnrBusinessKey, CruiseBusinessKey, or IATTravellerId  
    props: { 
        pnrBusinessKey: { type: BookingKeyType }, 
        CruiseBusinessKey: { type: BookingKeyType },
        IATTravellerId: { type: string }, // no type in the xsd 
        ListsOfProfileMatch: { type: ListsOfProfileMatchType }
    }
};

export {
    namespaceURI,
    BookingKeyType, 
    ProfileMatchType, 
    ProfileMatchListType, 
    ListOfProfileMatchType,
    GetProfileMatchesResponseType
}
