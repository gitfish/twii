import IXmlType from "xml/IXmlType";
import { string, dateTime, date, short } from "xml/SimpleXmlType";
import { RequestHeaderType } from "risk/traveller/common/XmlSchema";

const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchevaluation/request/v1";

const DirectionCodeType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "DirectionCodeType",
    restriction: { base: string }
};

const POIActionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "POIActionType",
    props: {
        ETVInstanceId: { type: string },
        ProfileName: { type: string },
        ProfileVersion: { type: string },
        ProfileTier: { type: string },
        ActionInd: { type: string },
        ActionUserId: { type: string },
        ActionTimeStamp: { type: dateTime },
        AlertNbr: { type: string },
        ActionReason: { type: string },
        CaseId: { type: string },
        SubCaseId: { type: string },
        Treatment: { type: string },
        BookingSystemCode: { type: string },
        RecordLocator: { type: string },
        PNRCreationTimeStamp: { type: dateTime },
        DirectionCode: { type: DirectionCodeType },
        LocalPortCode: { type: string },
        LocalScheduledDate: { type: date },
        PassengerTattoo: { type: short },
        IATTravellerId: { type: string }
    }
};

const ListOfPOIActionType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfPOIActionType",
    props: {
        POIAction: { type: POIActionType, array: true }
    }
};

const RecordActionRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "RecordActionRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        ListOfPOIAction: { type: ListOfPOIActionType }
    }
};

const ListOfProfileNameType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfProfileNameType",
    props: {
        ProfileName: { type: string, array: true }
    }
};

const GetProfileDismissalReasonRequestType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetProfileDismissalReasonRequestType",
    props: {
        RequestHeader: { type: RequestHeaderType },
        ListOfProfileName: { type: ListOfProfileNameType }
    }
};

export {
    namespaceURI,
    RecordActionRequestType,
    GetProfileDismissalReasonRequestType
}
