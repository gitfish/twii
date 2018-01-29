import { IIATService, IIATMovementsGetRequest } from "./IIATService";
import IIATMovement from "./IIATMovement";
import IIATMovementDetail from "./IIATMovementDetail";
import IIATPassport from "./IIATPassport";
import IIATVisa from "./IIATVisa";
import IIATAlias from "./IIATAlias";
import IIATFlightListItem from "./IIATFlightListItem";

const createIATMovement = (index : number) => {
    return {
        "IATTravellerId":`00763${23595 + index}`,
        "checkinPortCode":"POM ",
        "localPortCode":"BNE ",
        "localScheduledDate":"2015-09-23",
        "routeId":"VA188   ",
        "directionCode":"I",
        "movementStatusCode":"A",
        "movementTime": "20:31:22",
        "travelDocumentId":"M7089026",
        "travelDocDeptCountryCode":"AUS ",
        "alertInd":"",
        "examinationInd":"N",
        "travelMovementTypeCd": "U",
        "movementRaceId": "D25",
        "visaSubClassCd": "417",
        "visaIdentifyingNbr":"6890168504567925"
    };
};

const createIATMovementsResponse = (count : number) => {
    const r : IIATMovement[] = [];
    for(let i = 0; i < count; i ++) {
        r.push(createIATMovement(i));
    }
    return r;
};

class MockIATService implements IIATService {
    recordRequests: boolean = false;
    getIATMovementsResponse: IIATMovement[] = createIATMovementsResponse(1000);
    getIATMovementsRequests: IIATMovementsGetRequest[] = [];
    getIATMovements(request : IIATMovementsGetRequest) : Promise<IIATMovement[]> {
        if(this.recordRequests) {
            this.getIATMovementsRequests.push(request);
        }
        return Promise.resolve(this.getIATMovementsResponse);
    }
    getIATMovementDetailsResponse: IIATMovementDetail[] = [
        {
            "iatTravellerIdentifier": "0046705544",
            "aliasSequenceNbr": "1",
            "birthDate": "1942-07-28",
            "sexCode": "M",
            "familyName": "SMITH",
            "givenNames": "JOHN ALAN",
            "routeId": "MH122 ",
            "fullRoutingText": "SYDKUL",
            "localPortCode": "SYD ",
            "localScheduledDate": "2002-03-12",
            "directionCode": "O",
            "checkInPortCode": "",
            "movementDate": "2002-03-12",
            "movementStatusCode": "",
            "movementTime": "15:02:31",
            "movementHistoryInd": "",
            "visaIdentifyingNBR": "7799909657277",
            "passengerCrewCode": "P",
            "postMovementInd": "N",
            "bagsExamReferralReasonCode": " ",
            "travelDocSequenceNbr": "- ",
            "travellerMovementTypeCode": "U",
            "expectedOrActualTripCode": "E",
            "noOfAliasForTheTraveller": "1",
            "birthDeptCountryCode": "GBR ",
            "birthNameInd": "",
            "citizenshipNameInd": "",
            "currentNameInd": "",
            "deptPersonIDInd": "Y",
            "additionalAliasInd": "N",
            "dimiaAliasInd": "Y",
            "maritalStatusCode": "",
            "visaID": "0046705544000779990965727700",
            "entriesAllowedCode": "M",
            "entriesMadeCount": "001",
            "entryExpiryDate": "2002-09-03",
            "evidenceNbr": "0000000000",
            "evidenceStatusCode": " ",
            "immigrationDirectiveCode": "",
            "lawfulUntilDate": "2002-09-03",
            "migrantEntryExpiryDate": "",
            "multiIssuedVisaInd": " ",
            "occupationCode": "0000",
            "physicalEvidenceStatusCode": " ",
            "residenceDeptCountryCode": "- ",
            "travelDocDeptCountryCode": "GBR ",
            "travelDocID": "033172555",
            "visaClassCode": "UD ",
            "visaCheckCharacter": " ",
            "visaGrantDate": "2001-09-03",
            "visaGrantNbr": "7799909657277",
            "visaIssueCountryCode": "",
            "visaPersonSequenceNbr": "0",
            "visaStatusCode": "S",
            "visaSubClassCode": "976",
            "documentImpoundInd": "",
            "issueCountryCode": "",
            "issueOfficeCode": "",
            "passportExpiryDate": "",
            "passportIssueDate": "",
            "passportStatusCode": "",
            "passportTypeCode": "",
            "checkInDate": "",
            "checkInRouteId": "",
            "checkInTime": "",
            "childInd": "",
            "professionCode": "",
            "transborderDate": "",
            "transborderTime": "",
            "visaIssueDate": "",
            "bidStatusCode": "",
            "biometricsResultsCode": "",
            "cancelOriginCode": "",
            "chargesExemptCode": "",
            "fidStatusCode": "",
            "immigrationAliasSequenceNbr": "",
            "immigrationPersonID": "",
            "movementRaceID": "",
            "referralStatusCode": "",
            "relatedVisaID": "",
            "alertInd": "",
            "confidentialAlertInd": "",
            "movementMessageTypeCode": "",
            "referralTypeCode": "",
            "travelDocIssueCountryCode": "",
            "travelDocTypeCode": "",
            "travelTypeCode": "",
            "examinationForTravellerForMovementInd": "N",
            "positiveFindForTravellerForMovementInd": "N",
            "examinationForTravellerInd": "N",
            "numberOfExamsForTheTraveller": "0",
            "positiveFindForTravellerInd": "N",
            "positiveFindCountForTraveller": "0"
		}
    ];
    getIATMovementDetails(iatTravellerId: string, routeId: string, localScheduledDate: string, directionCode: string) : Promise<IIATMovementDetail[]> {
        return Promise.resolve(this.getIATMovementDetailsResponse);
    }
    getPassportsRequests : any[] = [];
    getPassportsResponse : IIATPassport[] = [
        {
            "travelDocID": "M9709026",
            "travelDocDeptCountryCode": "AUS",
            "travelDocTypeCode": "NP",
            "deptRunNbr": "4542545",
            "documentImpoundInd": "N",
            "immigrationDirectiveCode": "E",
            "issueCountryCode": "AUS",
            "issueOfficeCode": "CAN",
            "lastUpdateDate": "2006-03-16",
            "passportExpiryDate": "2022-03-16",
            "passportIssueDate": "2006-03-16",
            "passportStatusCode": "N",
            "passportTypeCode": "O",
            "sourceSystemCode": "PT",
            "Aliases": [
                {
                    "travelDocID": "M9709026",
                    "travelDocDeptCountryCode": "AUS",
                    "iatTravellerID": "0015028332",
                    "aliasSequenceNbr": "901",
                    "birthDate": "1953-12-25",
                    "birthDeptCountryCode": "AUS",
                    "sexCode": "M",
                    "maritalStatusCode": "M",
                    "familyName": "GARDNER",
                    "givenNames": "BERNARD NOEL"
                },
                {
                    "travelDocID": "M9709026",
                    "travelDocDeptCountryCode": "AUS",
                    "iatTravellerID": "0015028332",
                    "aliasSequenceNbr": "902",
                    "birthDate": "1953-12-25",
                    "birthDeptCountryCode": "AUS",
                    "sexCode": "M",
                    "maritalStatusCode": "M",
                    "familyName": "GARDNER",
                    "givenNames": "BERNARD"
                }
            ]
		}
    ];
    getPassports(travelDocumentId: string, travelDocCountryCode: string): Promise<IIATPassport[]> {
        if(this.recordRequests) {
            this.getPassportsRequests.push({ travelDocumentId: travelDocumentId, travelDocCountryCode: travelDocCountryCode });
        }
        return Promise.resolve(this.getPassportsResponse);
    }
    getVisaRequests: string[] = [];
    getVisasResponse : IIATVisa[] = [
        {
            "visaIdentifyingNbr": "1",
            "visaID": "004524586890168504567925",
            "entriesAllowedCode": "M",
            "entriesMadeCount": "002",
            "entryExpiryDate": "2019-04-18",
            "evidenceNbr": "90476445466308X",
            "evidenceStatusCode": "C",
            "immigrationDirectiveCode": "R",
            "lastUpdateDate": "2017-02-19",
            "lawfulUntilDate": "2018-01-01",
            "migrantEntryExpiryDate": "2018-01-01",
            "multiIssuedVisaInd": "N",
            "occupationCode": "9437",
            "physicalEvidenceStatusCode": "O",
            "residenceDeptCountryCode": "BE",
            "travelDocDeptCountryCode": "AU",
            "travelDocID": "M7089026",
            "visaApplicationID": "592454745",
            "visaClassCode": "PT",
            "visaCheckCharacter": "N",
            "visaGrantDate": "2017-01-26",
            "visaGrantNbr": "90365484652904",
            "visaInformationText": "600 No Work",
            "visaIssueCountryCode": "BE",
            "visaPersonSequenceNbr": "1",
            "visaStatusCode": "E",
            "visaSubClassCode": "606",
            "sourceSystemCode": "PT"
		}
    ];
    getVisas(visaIdentifyingNbr: string): Promise<IIATVisa[]> {
        if(this.recordRequests) {
            this.getVisaRequests.push(visaIdentifyingNbr);
        }
        return Promise.resolve(this.getVisasResponse);
    }
    getAliasesRequests: string[] = [];
    getAliasesResponse : IIATAlias[] = [
        {
            "iatTravellerID": "0076323595",
            "aliasSequenceNbr": "901",
            "birthDate": "1973-06-23",
            "birthDeptCountryCode": "BE",
            "birthNameInd": "Y",
            "citizenshipNameInd": "Y",
            "currentNameInd": "Y",
            "deptPersonIDInd": "Y",
            "familyName": "SMITH",
            "givenNames": "ADAM",
            "additionalAliasInd": "Y",
            "dimiaAliasInd": "Y",
            "lastUpdateDate": "2017-01-09",
            "maritalStatusCode": "M",
            "sexCode": "M",
            "sourceFileCode": "M9798",
            "sourceSystemCode": "PT"
		}, {
            "iatTravellerID": "0076323596",
            "aliasSequenceNbr": "902",
            "birthDate": "1973-06-23",
            "birthDeptCountryCode": "BE",
            "birthNameInd": "N",
            "citizenshipNameInd": "N",
            "currentNameInd": "N",
            "deptPersonIDInd": "N",
            "familyName": "JONES",
            "givenNames": "ADAM",
            "additionalAliasInd": "Y",
            "dimiaAliasInd": "N",
            "lastUpdateDate": "2017-01-09",
            "maritalStatusCode": "M",
            "sexCode": "M",
            "sourceFileCode": "M9798",
            "sourceSystemCode": "PT"
        }
    ]
    getAliases(iatTravellerId: string): Promise<IIATAlias[]> {
        if(this.recordRequests) {
            this.getAliasesRequests.push(iatTravellerId);
        }
        return Promise.resolve(this.getAliasesResponse);
    }
    getTravellerMovementFlightListResponse: IIATFlightListItem[] = [
        {
			"iatTravellerIdentifier": "0076323595",
			"aliasSequenceNbr": "1",
			"birthDate": "1967-09-10",
			"sexCode": "M",
			"familyName": "SMITH",
			"givenNames": "ADAM",
			"travelDocumentId": "M7089026",
			"travelDocCountryCode": "AUS ",
			"routeId": "VA188   ",
			"fullRoutingText": "LAX-KUL-SYD",
			"localPortCode": "SYD",
			"localScheduledDate": "2015-09-23",
			"directionCode": "I",
			"actualMovementMessageID": "4867984954534",
			"checkInPortCode": "LAX",
            "expectedMovementMessageID": "482758756452454",
			"expectedMovementNbr": "98475634134545",
			"movementDate": "2015-09-23",
			"movementStatusCode": "A",
			"movementTime": "20:13:27",
			"movementHistoryInd": "N",
			"visaIdentifyingNBR": "438745986645243",
			"visaSubClassCode": "600",
			"passengerCrewCode": "P",
			"postMovementInd": "N",
			"bagsExamReferralReasonCode": "",
			"travelDocSequenceNbr": "1",
			"sourceSystemCode": "PT",
			"travellerMovementTypeCode": "A",
            "birthDeptCountryCode": "BEL",
            "visaID": "4987492545434",
            "visaGrantDate": "2016-05-02",
            "alertInd": "Y",
            "movementRaceID": "A09",
            "userID": "xdiuj",
            "numberOfExamsForTheTraveller": "1",
            "positiveFindCountForTraveller": "0",
            "examinationForTravellerInd": "N",
            "positiveFindForTravellerInd": "N"
		}, {
			"iatTravellerIdentifier": "9473875773",
			"aliasSequenceNbr": "1",
			"birthDate": "1978-01-12",
			"sexCode": "M",
			"familyName": "JONES",
			"givenNames": "SCOTT",
			"travelDocumentId": "X4564658",
			"travelDocCountryCode": "AUS ",
			"routeId": "VA188   ",
			"fullRoutingText": "LAX-KUL-SYD",
			"localPortCode": "SYD",
			"localScheduledDate": "2015-09-23",
			"directionCode": "I",
			"actualMovementMessageID": "4867984786876",
			"checkInPortCode": "LAX",
            "expectedMovementMessageID": "482758756452454",
			"expectedMovementNbr": "98467467873455",
			"movementDate": "2015-09-23",
			"movementStatusCode": "A",
			"movementTime": "20:13:27",
			"movementHistoryInd": "N",
			"visaIdentifyingNBR": "438775467878786",
			"visaSubClassCode": "700",
			"passengerCrewCode": "P",
			"postMovementInd": "N",
			"bagsExamReferralReasonCode": "",
			"travelDocSequenceNbr": "1",
			"sourceSystemCode": "PT",
			"travellerMovementTypeCode": "A",
            "birthDeptCountryCode": "BEL",
            "visaID": "4987445245454",
            "visaGrantDate": "2016-05-02",
            "alertInd": "Y",
            "movementRaceID": "A09",
            "userID": "xdiuj",
            "numberOfExamsForTheTraveller": "1",
            "positiveFindCountForTraveller": "0",
            "examinationForTravellerInd": "N",
            "positiveFindForTravellerInd": "N"
		}, {
			"iatTravellerIdentifier": "9487484254",
			"aliasSequenceNbr": "1",
			"birthDate": "1956-12-04",
			"sexCode": "M",
			"familyName": "ADAMS",
			"givenNames": "JIMMY",
			"travelDocumentId": "N7888397",
			"travelDocCountryCode": "AUS ",
			"routeId": "VA188   ",
			"fullRoutingText": "LAX-KUL-SYD",
			"localPortCode": "SYD",
			"localScheduledDate": "2015-09-23",
			"directionCode": "I",
			"actualMovementMessageID": "4867984786876",
			"checkInPortCode": "LAX",
            "expectedMovementMessageID": "482758756452454",
			"expectedMovementNbr": "98467467873455",
			"movementDate": "2015-09-23",
			"movementStatusCode": "A",
			"movementTime": "20:13:27",
			"movementHistoryInd": "N",
			"visaIdentifyingNBR": "438775467878786",
			"visaSubClassCode": "700",
			"passengerCrewCode": "P",
			"postMovementInd": "N",
			"bagsExamReferralReasonCode": "",
			"travelDocSequenceNbr": "1",
			"sourceSystemCode": "PT",
			"travellerMovementTypeCode": "A",
            "birthDeptCountryCode": "BEL",
            "visaID": "4987445245454",
            "visaGrantDate": "2016-05-02",
            "alertInd": "Y",
            "movementRaceID": "A09",
            "userID": "xdiuj",
            "numberOfExamsForTheTraveller": "1",
            "positiveFindCountForTraveller": "0",
            "examinationForTravellerInd": "N",
            "positiveFindForTravellerInd": "N"
		}, {
			"iatTravellerIdentifier": "2384847478",
			"aliasSequenceNbr": "1",
			"birthDate": "1934-03-12",
			"sexCode": "M",
			"familyName": "SMITH",
			"givenNames": "JIMMY",
			"travelDocumentId": "M8375773",
			"travelDocCountryCode": "AUS ",
			"routeId": "VA188   ",
			"fullRoutingText": "LAX-KUL-SYD",
			"localPortCode": "SYD",
			"localScheduledDate": "2015-09-23",
			"directionCode": "I",
			"actualMovementMessageID": "4867984786876",
			"checkInPortCode": "LAX",
            "expectedMovementMessageID": "482758756452454",
			"expectedMovementNbr": "98467467873455",
			"movementDate": "2015-09-23",
			"movementStatusCode": "A",
			"movementTime": "20:13:27",
			"movementHistoryInd": "N",
			"visaIdentifyingNBR": "438775467878786",
			"visaSubClassCode": "700",
			"passengerCrewCode": "P",
			"postMovementInd": "N",
			"bagsExamReferralReasonCode": "",
			"travelDocSequenceNbr": "1",
			"sourceSystemCode": "PT",
			"travellerMovementTypeCode": "A",
            "birthDeptCountryCode": "BEL",
            "visaID": "4987445245454",
            "visaGrantDate": "2016-05-02",
            "alertInd": "Y",
            "movementRaceID": "A09",
            "userID": "xdiuj",
            "numberOfExamsForTheTraveller": "1",
            "positiveFindCountForTraveller": "0",
            "examinationForTravellerInd": "N",
            "positiveFindForTravellerInd": "N"
		}
    ];
    getIATFlightList(routeId: string, localScheduledDate: string, directionCode: string) : Promise<IIATFlightListItem[]> {
        console.log("-- Get IAT Flight List");
        return Promise.resolve(this.getTravellerMovementFlightListResponse);
    }
}

export { MockIATService as default, MockIATService }