import { IBAGSService, IBAGSActivitiesGetRequest } from "./IBAGSService";
import IBAGSActivity from "./IBAGSActivity";

class MockBAGSService implements IBAGSService {
    recordRequests: boolean = false;
    getBAGSActivitiesResponse : IBAGSActivity[] = [
        {
            "travelDocNbr":"N7107645",
            "travelDocCntryCode":"AUS",
            "birthDate":"1988-01-21",
            "sexCode":"M",
            "craftMovementNumber":"JQ58    ",
            "craftMovementDate":"2013-12-04",
            "portCode":"DRW       ",
            "directionCode":"I",
            "targetingMthdType":"MARSHAL   ",
            "modeOfEntryType":"BACKOFHALL",
            "findMethodType":"",
            "bagLocationType":"",
            "examinationResultType":"",
            "concealmentMthdType":"",
            "travellerType":"PASSENGER ",
            "bagsExamSeverityCategory":"NO UNDECLARED ITEMS AREFOUND",
            "resultType":"",
            "outcomeType":""
        },
        {
            "travelDocNbr":"N7107646",
            "travelDocCntryCode":"AUS",
            "birthDate":"1988-01-21",
            "sexCode":"M",
            "craftMovementNumber":"JQ59    ",
            "craftMovementDate":"2013-09-11",
            "portCode":"DRW       ",
            "directionCode":"I",
            "targetingMthdType":"MARSHAL   ",
            "modeOfEntryType":"BACKOFHALL",
            "findMethodType":"",
            "bagLocationType":"",
            "examinationResultType":"",
            "concealmentMthdType":"",
            "travellerType":"PASSENGER ",
            "bagsExamSeverityCategory":"NO UNDECLARED ITEMS AREFOUND",
            "resultType":"",
            "outcomeType":""
        }
    ];
    getBAGSActivitiesRequests: IBAGSActivitiesGetRequest[] = [];
    getBAGSActivities(request : IBAGSActivitiesGetRequest) : Promise<IBAGSActivity[]> {
        if(this.recordRequests) {
            this.getBAGSActivitiesRequests.push(request);
        }
        return Promise.resolve(this.getBAGSActivitiesResponse);
    }
}

export { MockBAGSService as default, MockBAGSService };