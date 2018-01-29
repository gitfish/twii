import { IEXAMSService, IEXAMSActivityGetRequest } from "./IEXAMSService";
import IEXAMSActivity from "./IEXAMSActivity";
import IListResult from "common/IListResult";

class MockEXAMSService implements IEXAMSService {
    recordRequests: boolean = false;
    getEXAMSActivitiesResponse: IListResult<IEXAMSActivity> = {
        total: 4,
        items: [
            {
                "transportType":"AIR",
                "masterBillNumber":"4",
                "houseBillNumber":"4",
                "entityExaminationRoleType":"TestRole",
                "examinationIdentifier":"4",
                "billTyp":"4",
                "currentDate":"2006-01-04",
                "goodsDescription":"s4",
                "consigneeName":"s4",
                "consigneeAddress":"4 AirCargo Street, Canbera",
                "consignorName":"s4",
                "consignorAddress":"4 AirCargo Street, Canbera",
                "selectionCriteriaDescription":"s4",
                "examStatus":"Passed",
                "priorityType":"4",
                "examPort":"Canbera port",
                "examResultType":"e4",
                "toolsUsed": "test"
            },
            {
                "transportType":"AIR",
                "masterBillNumber":"5",
                "houseBillNumber":"5",
                "entityExaminationRoleType":"TestRole",
                "examinationIdentifier":"5",
                "billTyp":"5",
                "currentDate":"2006-01-05",
                "goodsDescription":"s5",
                "consigneeName":"s5",
                "consignorAddress":"5 AirCargo Street, Canbera",
                "consignorName":"s5",
                "consigneeAddress":"5 AirCargo Street, Canbera",
                "selectionCriteriaDescription":"s5",
                "examStatus":"Passed",
                "priorityType":"5",
                "examPort":"Canbera port",
                "examResultType":"e5",
                "toolsUsed": "test"
            },
            {
                "transportType":"SEA",
                "masterBillNumber":"6",
                "houseBillNumber":"6",
                "entityExaminationRoleType":"TestRole",
                "examinationIdentifier":"6",
                "billTyp":"6",
                "currentDate":"2006-01-06",
                "goodsDescription":"s6",
                "consigneeName":"s6",
                "consignorAddress":"6 AirCargo Street, Canbera",
                "consignorName":"s6",
                "consigneeAddress":"6 AirCargo Street, Canbera",
                "selectionCriteriaDescription":"s6",
                "examStatus":"Passed",
                "priorityType":"6",
                "examPort":"Canbera port",
                "examResultType":"e6",
                "toolsUsed": "test"
            },
            {
                "transportType":"AIR",
                "masterBillNumber":"7",
                "houseBillNumber":"7",
                "entityExaminationRoleType":"TestRole",
                "examinationIdentifier":"7",
                "billTyp":"7",
                "currentDate":"2007-01-07",
                "goodsDescription":"s7",
                "consigneeName":"s7",
                "consignorAddress":"7 AirCargo Street, Canbera",
                "consignorName":"s7",
                "consigneeAddress":"7 AirCargo Street, Canbera",
                "selectionCriteriaDescription":"s7",
                "examStatus":"Passed",
                "priorityType":"7",
                "examPort":"Canbera port",
                "examResultType":"e7",
                "toolsUsed": "test"
            }
        ]
    }
    getEXAMSActivitiesRequests : IEXAMSActivityGetRequest[] = [];
    getEXAMSActivities(request : IEXAMSActivityGetRequest) : Promise<IListResult<IEXAMSActivity>> {
        if(this.recordRequests) {
            this.getEXAMSActivitiesRequests.push(request);
        }
        return Promise.resolve(this.getEXAMSActivitiesResponse);
    }
}

export { MockEXAMSService as default, MockEXAMSService }