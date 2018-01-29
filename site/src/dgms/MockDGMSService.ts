import { IDGMSService, IDGMSActivitiesGetRequest } from "./IDGMSService";
import IDGMSActivity from "./IDGMSActivity";

class MockDGMSService implements IDGMSService {
    recordRequests : boolean = false;
    getDGMSActivitiesResponse : IDGMSActivity[] = [
        {
            "dgmsNumber":"702878",
            "clientId":"677034",
            "dealerId":"",
            "startTimestamp":"2015-07-19 09:17:34.336000",
            "dateDetected":"2015-07-19",
            "isDeclared":"N",
            "detentionNumber":"",
            "detentionDescription":"Other Detention",
            "seizureDescription":"Customs Seizure",
            "detentionModeDescription":"Officer's suspicion",
            "modeOfConcealment":"",
            "modeOfEntry":"AIR AO",
            "port":"Parcels Post Vic",
            "dealer":"",
            "goodsDeclarationDescription":"NOT CLEARLY WRITTEN ON DECLARATION"
        },
        {
            "dgmsNumber":"695675",
            "clientId":"677034",
            "dealerId":"",
            "startTimestamp":"2015-06-16 07:28:08.548000",
            "dateDetected":"2015-06-16",
            "isDeclared":"N",
            "detentionNumber":"",
            "detentionDescription":"Other Detention",
            "seizureDescription":"Customs Seizure",
            "detentionModeDescription":"Located by mass screen x-ray",
            "modeOfConcealment":"",
            "modeOfEntry":"AIR AO",
            "port":"Parcels Post NSW",
            "dealer":"",
            "goodsDeclarationDescription":"NIE"
        }
    ];
    getDGMSActivitiesRequests : IDGMSActivitiesGetRequest[] = [];
    getDGMSActivities(request : IDGMSActivitiesGetRequest) : Promise<IDGMSActivity[]> {
        if(this.recordRequests) {
            this.getDGMSActivitiesRequests.push(request);
        }
        return Promise.resolve(this.getDGMSActivitiesResponse);
    }
}

export { MockDGMSService as default, MockDGMSService }