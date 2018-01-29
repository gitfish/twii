import { observable, action, computed } from "mobx";
import IGetProfileMatchesRequest from "./request/IGetProfileMatchesRequest";
import ProfileMatchDataServiceConext from "./ProfileMatchDataServiceContext";
import IProfileMatch from "./response/IProfileMatch";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";


class ProfileMatchModel {
    @observable profileMatches: IProfileMatch[] = [];
    @observable sync: ISyncModel = new SyncModel();

    @action
    loadProfileMatches = (profileMatchRequest: IGetProfileMatchesRequest): Promise<any> => {
        const syncId = this._calcSyncId(profileMatchRequest.IATTravellerId);
        this.sync.syncStart({id: syncId});
        return ProfileMatchDataServiceConext.value.GetProfileMatches(profileMatchRequest)
        .then((profileMatchesRespData) => {
            if(profileMatchesRespData){
                this.profileMatches = profileMatchesRespData.ListsOfProfileMatch.ListOfProfileMatch[0].ProfileMatches.ProfileMatch;
            }
            this.sync.syncEnd();

        })
        .catch((error) => {
            console.log("error: " + JSON.stringify(error));
            this.profileMatches = [];
            this.sync.syncError(error);
        })
    } 

    protected _calcSyncId(IATTravellerId: any) : string {
        return String(IATTravellerId);
    }
}

export { ProfileMatchModel as default, ProfileMatchModel};