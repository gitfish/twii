import { ISeaCargoService, ISeaCargoActivitiesGetRequest } from "./ISeaCargoService";
import ISeaCargoActivity from "./ISeaCargoActivity";
import ISeaCargoActivityDetail from "./ISeaCargoActivityDetail";

class MockSeaCargoService implements ISeaCargoService {
    recordRequests: boolean = false;
    delay: number = 4000;
    getSeaCargoActivitiesResponse: ISeaCargoActivity[] = [
        {
            "originalMsgId":"2017-02-07 17:52:54.070063",
            "clientRoleType":"Consignor ",
            "clientInstanceId":"642531359192207",
            "oceanBillNbr":"OOLU4027316390",
            "houseBillNbr":"S00237528",
            "vesselId":"9234355 ",
            "voyageNbr":"025S  ",
            "containerNbr":"OOLU9205138      ",
            "searchArrivalDate":"2017-02-12",
            "goodsDescr":"MEN'S JACKET FREIGHT COLLECT",
            "lowestBillInd":"Y",
            "parentBillLadingNbr":"",
            "cargoType":"FCX",
            "sacInd":"N",
            "stsCargoStatusCode":"CLEAR     ",
            "examFindResultCode":"",
            "grossWeight": "0.22"
        },
        {
            "originalMsgId":"2017-02-07 17:52:54.070063",
            "clientRoleType":"Consignor ",
            "clientInstanceId":"642531359192207",
            "oceanBillNbr":"OOLU4027316390",
            "houseBillNbr":"S00237528",
            "vesselId":"9234355 ",
            "voyageNbr":"025S  ",
            "containerNbr":"OOLU9205138      ",
            "searchArrivalDate":"2017-02-12",
            "goodsDescr":"MEN'S JACKET FREIGHT COLLECT",
            "lowestBillInd":"Y",
            "parentBillLadingNbr":"",
            "cargoType":"FCX",
            "sacInd":"N",
            "stsCargoStatusCode":"CLEAR     ",
            "examFindResultCode":"",
            "grossWeight": "0.32"
        },
        {
            "originalMsgId":"2017-02-07 17:52:54.070063",
            "clientRoleType":"Consignor ",
            "clientInstanceId":"642531359192207",
            "oceanBillNbr":"OOLU4027316390",
            "houseBillNbr":"S00237528",
            "vesselId":"9234355 ",
            "voyageNbr":"025S  ",
            "containerNbr":"OOLU9205138      ",
            "searchArrivalDate":"2017-02-12",
            "goodsDescr":"MEN'S JACKET FREIGHT COLLECT",
            "lowestBillInd":"Y",
            "parentBillLadingNbr":"",
            "cargoType":"FCX",
            "sacInd":"N",
            "stsCargoStatusCode":"CLEAR     ",
            "examFindResultCode":"",
            "grossWeight": "1.82"
        }
    ];
    getSeaCargoActivityDetailResponse: ISeaCargoActivityDetail[] = [
        {
            "vesselId": "9234355",
            "vesselName": "OTAK ODAK",
            "voyageNbr": "025S",
            "dischargePortCode": "AUSYD",
            "destinationPortCode": "AUSYD",
            "firstAusPortCode": "AUSYD",
            "originalLoadingPortCode": "CXNMZ",
            "billOfLadingOriginPortCode": "CXNMZ",
            "oceanBillNbr": "OOLU4027316390",
            "houseBillNbr": "S00237528",
            "parentBillLadingNbr": "",
            "countryOfOriginOfGoods": "CHINA",
            "reportedBy": "82487428989 XYZ LOGISTICS SERVICES (AUST)",
            "responsibleParty": "82487428989 XYZ LOGISTICS SERVICES (AUST)",
            "principalAgent": "8742673487 HAPPY SHIPPING SERVICES PTY LTD",
            "consignee": "JOHN SMITH 6 CHAN STREET BELCONNEN ACT",
            "consignor": "SMITH JOHN 26 CHANG STREET SINGAPORE",
            "notifyParty": "",
            "freightForwarderInd": "N",
            "freightMethodOfPayment": "PP - PREPAID BY SELLER",
            "transitInd": "N",
            "overseasRoutingPortCode": "SIN",
            "cargoType": "FCX",
            "containerNbr": "OOLU9205138",
            "goodsDescr": "MEN'S JACKET FREIGHT COLLECT",
            "consolidatedCargoStatusCode": "CLEAR"
        }
    ];
    getSeaCargoActivitiesRequests: ISeaCargoActivitiesGetRequest[] = [];
    getSeaCargoActivityDetailRequests: string[] = [];
    getSeaCargoActivities(request : ISeaCargoActivitiesGetRequest) : Promise<ISeaCargoActivity[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.recordRequests) {
                    this.getSeaCargoActivitiesRequests.push(request);
                }
                resolve(this.getSeaCargoActivitiesResponse);
            }, this.delay);
        });
    }
    getSeaCargoActivityDetails(oceanBillNbr : string) : Promise<ISeaCargoActivityDetail[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.recordRequests) {
                    this.getSeaCargoActivityDetailRequests.push(oceanBillNbr);
                }
                return resolve(this.getSeaCargoActivityDetailResponse);
            }, this.delay);
        });
    }
}

export { MockSeaCargoService as default, MockSeaCargoService }