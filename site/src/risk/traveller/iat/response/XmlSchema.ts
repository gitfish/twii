import IXmlType from "xml/IXmlType";
import { string } from "xml/SimpleXmlType";
import {
    PassportInfoType,
    VisaInfoType,
    BioDataInfoType,
} from "risk/traveller/iat/common/XmlSchema";
import {
    MovementInfoType,
    AlertInfoType,
    AlertMovementInfoType,
    BagsExamResultInfoType
} from "../XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/iat/response/v1";

const ListOfPassportInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfPassportInfoType",
    props: {
        PassportInfo: { type: PassportInfoType, array: true }
    }
};

const ListOfVisaInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOVisaInfoType",
    props: {
        VisaInfo: { type: VisaInfoType, array: true }
    }
};

const ListOfBioDataInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfBioDataInfoType",
    props: {
        BioDataInfo: { type: BioDataInfoType, array: true }
    }
};

const ListOfMovementInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfMovementInfoType",
    props: {
        MovementInfo: { type: MovementInfoType, array: true }
    }
};

const ListOfAlertInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfMovementInfoType",
    props: {
        AlertInfo: { type: AlertInfoType, array: true }
    }
};

const ListOfAlertMovementInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfAlertMovementInfoType",
    props: {
        AlertMovementInfo: { type: AlertMovementInfoType, array: true }
    }
};

const ListOfBagsExamResultInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfBagsExamResultInfoType",
    props: {
        BagsExamResultInfo: { type: BagsExamResultInfoType, array: true}
    }
};

const TravellerHistoryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravellerHistoryType",
    props: {
        IATTravellerID: { type: string },
        ListOfPassportInfo: { type: ListOfPassportInfoType },
        ListOfVisaInfo: { type: ListOfVisaInfoType },
        ListOfBioDataInfo: { type: ListOfBioDataInfoType },
        ListOfMovementInfo: { type: ListOfMovementInfoType },
        ListOfAlertInfo: { type: ListOfAlertInfoType },
        ListOfAlertMovementInfo: { type: ListOfAlertMovementInfoType },
        ListOfBagsExamResultInfo: { type: ListOfBagsExamResultInfoType }
    }
};

const ListOfTravellerHistoryType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "ListOfTravellerHistoryType",
    props: {
        TravellerHistory: { type: TravellerHistoryType, array: true }
    }
};

const GetTravellerHistoryResponseType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "GetTravellerHistoryResponseType",
    props: {
        ListOfTravellerHistory: { type: ListOfTravellerHistoryType }
    }
};

export {
    namespaceURI,
    GetTravellerHistoryResponseType
}