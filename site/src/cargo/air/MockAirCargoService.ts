import { IAirCargoService, IAirCargoActivitiesGetRequest } from "./IAirCargoService";
import IAirCargoActivity from "./IAirCargoActivity";
import IAirCargoActivityDetail from "./IAirCargoActivityDetail";

const createAirCargoActivity = (idx : number) => {
    return {
        "originalMsgId":"2017-01-22 19:19:52.816157",
        "clientRoleType":"Consignor ",
        "clientInstanceId":"642531359192207",
        "masterBillNbr":"78429302626",
        "houseBillNbr":"S00237204",
        "airlineCode":"CZ ",
        "flightNbr":"343",
        "searchArrivalDate":"2017-01-26",
        "goodsDescr":"CLOTHING",
        "lowestBillInd":"Y",
        "parentBillNbr":"",
        "partShipmentInd":"N",
        "sacInd":"N",
        "stsCargoStatusCode":"CLEAR     ",
        "examFindResultCode":"",
        "grossWeight": "0.11"
    };
};

const createAirCargoActivities = (count : number) => {
    const r : IAirCargoActivity[] = [];
    for(let i = 0; i < count; i ++) {
        r.push(createAirCargoActivity(i));
    }
    return r;
};

const defaultAirCargoActivityFactory = () => {
    return createAirCargoActivities(2000);
};

class MockAirCargoService implements IAirCargoService {
    recordRequests: boolean = false;
    delay: number = 2000;
    airCargoActivityFactory : () => IAirCargoActivity[] = defaultAirCargoActivityFactory;
    set getAirCargoActivitiesResponse(value : IAirCargoActivity[]) {
        this.airCargoActivityFactory = () => {
            return value;
        };
    }
    getAirCargoActivityDetailResponse: IAirCargoActivityDetail[] = [
        {
            "masterBillNbr" : "9624897512363",
            "subMasterBillNbr": "97387544",
            "houseBillNbr": "936239755",
            "flightNbr": "SQ197",
            "uniqueConsignmentRefNbr": "936239755",
            "specialReporterNbr": "SR863532",
            "transhipmentNbr": "T8683425",
            "arrivalDate": "2014-06-30",
            "dischargePortCode": "AUSYD",
            "destinationPortCode": "AUSYD",
            "firstAusPortCode": "AUSYD",
            "originalLoadingPortCode": "BRCPQ",
            "waybillOriginPortCode": "BRCPQ",
            "overseasRoutingPortCode": "SIN",
            "reportedBy": "4387587847385 DHL EXPRESS (AUSTRALIA)",
            "responsibleParty": "4387587847385 DHL EXPRESS (AUSTRALIA)",
            "consignee": "JOHN SMITH 6 CHAN STREET BELCONNEN ACT",
            "consignor": "SMITH JOHN 26 CHANG STREET SINGAPORE",
            "notifyParty": "",
            "goodsDescr": "DOCUMENTS",
            "nbrOfPackages": "1",
            "grossWeightQuantity": "0.5",
            "grossWeightUnit": "KG",
            "consolidatedCargoStatusCode": "HELD",
            "declaredValueOfGoods": "NDV",
            "declaredValueOfGoodsCurrencyCode": "AUD",
            "freightForwarderInd": "N",
            "freightMethodOfPayment": "PO",
            "reportableDocumentsInd": "Y",
            "selfAssessedClearanceDeclarationInd": "Y",
            "personalEffectsInd": "N",
            "partShipmentInd": "Y",
            "transitInd": "N",
            "createdPartInd": "N"
        }
    ];
    getAirCargoActivitiesRequests: IAirCargoActivitiesGetRequest[] = [];
    getAirCargoActivityDetailRequests: string[] = [];
    getAirCargoActivities(request : IAirCargoActivitiesGetRequest) : Promise<IAirCargoActivity[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.recordRequests) {
                    this.getAirCargoActivitiesRequests.push(request);
                }
                resolve(this.airCargoActivityFactory());
            }, this.delay);
        })
        
    }
    getAirCargoActivityDetails(masterBillNbr : string) : Promise<IAirCargoActivityDetail[]> {
        return new Promise((reject, resolve) => {
            setTimeout(() => {
                if(this.recordRequests) {
                    this.getAirCargoActivityDetailRequests.push(masterBillNbr);
                }
                return resolve(this.getAirCargoActivityDetailResponse);
            }, this.delay);
        });
    }
}

export { MockAirCargoService as default, MockAirCargoService }