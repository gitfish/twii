import IXmlType from "xml/IXmlType";
import { string, date, time, decimal } from "xml/SimpleXmlType";
import { TravelDocInfoType, PersonInfoType } from "./common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/iat/v1";

const AlertInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "AlertInfoType",
    props: {
        alertNumber: { type: string },
        alertStatusCode: { type: string },
        accessCategoryCode: { type: string },
        issueDate: { type: date },
        departmentCode: { type: string },
        FIDInAction: { type: string },
        FIDOutAction: { type: string },
        BIDInAction: { type: string },
        BIDOutAction: { type: string },
        suspectType: { type: string },
        FIDInNarrative: { type: string },
        FIDOutNarrative: { type: string },
        FIDBothNarrative: { type: string }
    }
};

const MovementInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "MovementInfoType",
    props: {
        travelDocInfo: { type: TravelDocInfoType },
        personInfo: { type: PersonInfoType },
        checkInPortCode: { type: string },
        directionCode: { type: string },
        localPortCode: { type: string },
        localScheduledDate: { type: date },
        routeId: { type: string },
        visaSubClassCode: { type: string },
        passengerCrewCode: { type: string },
        movementDate: { type: date },
        movementTime: { type: time },
        canberraMovementTime: { type: time },
        movementTypeCode: { type: string },
        movementStatusCode: { type: string },
        movementNbr: { type: string },
        movementMessageTypeCode: { type: string },
        travelTypeCode: { type: string }
    }
};

const AlertMovementInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "AlertMovementInfoType",
    props: {
        alertNumber: { type: string },
        localScheduledDate: { type: date },
        localPortCode: { type: string },
        matchCategoryCode: { type: string },
        BIDSelectStatus: { type: string },
        FIDSelectStatus: { type: string },
        ExpectedMovementIndicator: { type: string }
    }
};

const BagsExamResultInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BagsExamResultInfoType",
    props: {
        localScheduledDate: { type: date },
        routeId: { type: string },
        examinationNbr: { type: string },
        targettingMethod: { type: string },
        alertNumber: { type: string },
        highestResultsType: { type: string },
        examinationResultType: { type: string },
        findMethod: { type: string },
        baggageLocation: { type: string },
        notes: { type: string },
        outcomeType: { type: string },
        quantityValue: { type: decimal },
        quantityUnit: { type: string }
    }
};

export {
    namespaceURI,
    AlertInfoType,
    MovementInfoType,
    AlertMovementInfoType,
    BagsExamResultInfoType
}