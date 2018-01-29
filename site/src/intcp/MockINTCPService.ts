import IINTCPService from "./IINTCPService";
import IINTCPMovement from "./IINTCPMovement";
import IINTCPOrgSummaryItem from "./IINTCPOrgSummaryItem";

class MockINTCPService implements IINTCPService {
    getINTCPMovementsResponse : IINTCPMovement[] = [
        {
            "targetSubjectId": "P0423707",
            "sequenceNumber": "1",
            "relationshipClass": "INCRFL",
            "relationshipType": "SU",
            "portNameWhereOccurred": "Sydney",
            "departureDate": "1996-01-23",
            "atPortDate": "1996-01-27",
            "movementInType": "AA",
            "movementOutType": "DD",
            "expectedOrConfirmedInd": "C",
            "outwardPortName": "Sydney",
            "nextPortName": "Port Vila",
            "lloydsNumber": "5209732",
            "craftName": "Fairstar",
            "vesselType": "PAX",
            "travelDocumentNumber": "L5023991",
            "travelDocumentType": "PP",
            "numberofInfoReportsAssociatedWithTheSubject": "2"
		}, {
            "targetSubjectId": "P0408107",
            "sequenceNumber": "2",
            "relationshipClass": "INCRFL",
            "relationshipType": "SU",
            "portNameWhereOccurred": "Sydney",
            "departureDate": "1996-02-01",
            "atPortDate": "1996-02-05",
            "movementInType": "AA",
            "movementOutType": "DD",
            "expectedOrConfirmedInd": "C",
            "outwardPortName": "Sydney",
            "nextPortName": "Dunedin",
            "lloydsNumber": "5263132",
            "craftName": "Fairstar",
            "vesselType": "PAX",
            "travelDocumentNumber": "L5043991",
            "travelDocumentType": "PP ",
            "numberofInfoReportsAssociatedWithTheSubject": "2"
		}
    ]
    getINTCPMovements(subjectId: string) : Promise<IINTCPMovement[]> {
        return Promise.resolve(this.getINTCPMovementsResponse);
    }
    getOrganisationINTCPSummaryResponse : IINTCPOrgSummaryItem[] = [
        {
            "subjectId": "O500491",
            "organisationName": "HALF DECENT PTY LTD",
            "australianBusinessNumber": "11050292579",
            "businessDescription": "WESTERN STYLE CLOTHING AND ACCESSORIES SALES",
            "numberOfInfoReportsWhereSubjectIsPrincipal": "1"
		}
    ]
    getOrganisationINTCPSummary(subjectId: string) : Promise<IINTCPOrgSummaryItem[]> {
        return Promise.resolve(this.getOrganisationINTCPSummaryResponse);
    }
}

export { MockINTCPService as default, MockINTCPService }