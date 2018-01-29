import { observable, action, computed } from "mobx";
import IGetProfileMatchesRequest from "risk/traveller/profilematchdataservice/request/IGetProfileMatchesRequest";
import IGetProfileMatchesByPNRRequest from "risk/traveller/profilematchdataservice/request/IGetProfileMatchesByPNRRequest";
import ProfileMatchDataServiceContext from "risk/traveller/profilematchdataservice/ProfileMatchDataServiceContext";
import IProfileMatch from "risk/traveller/profilematchdataservice/response/IProfileMatch";
import {IIProfileMatch} from "me/profilematch/IProfileMatchModel";
import IProfileMatchModel from "./IProfileMatchModel";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import IListOfProfileMatch from "risk/traveller/profilematchdataservice/response/IListOfProfileMatch";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import {IMECase, MEDomainType} from "me/IMECase";
import * as moment from "moment";
import IBookingKey from "risk/traveller/profilematchdataservice/common/IBookingKey";

interface IProfileMatchData extends IProfileMatch, IListOfProfileMatch{
    profileMatchData: any;
}

class ProfileMatchModel implements IProfileMatchModel {

    @observable sync: ISyncModel = new SyncModel();
    @observable profileMatches: IIProfileMatch[] = [];
    @observable currentProfileMatches: IIProfileMatch[] = [];
    @observable historicalProfileMatches: IIProfileMatch[] = [];
    private meCase: IMECase;
    private request : IGetProfileMatchesRequest;


    @action
    refresh() : Promise<any> {
        const syncId = this.meCase.IATTravellerID+this.meCase.RecordLocator;
        this.sync.syncStart({id: syncId});
        this.profileMatches = [];
        this.currentProfileMatches = [];
        this.historicalProfileMatches = [];
        return ProfileMatchDataServiceContext.ref.GetProfileMatches(this.request)
            .then((profileMatchesRespData) => {
                var profileMatchData: IProfileMatchData;
                if (syncId === this.sync.id) {
                    if (profileMatchesRespData && profileMatchesRespData.ListsOfProfileMatch && profileMatchesRespData.ListsOfProfileMatch.ListOfProfileMatch) {

                        profileMatchesRespData.ListsOfProfileMatch.ListOfProfileMatch.forEach((profileMatch) => {
                            if(profileMatch.ProfileMatches && profileMatch.ProfileMatches.ProfileMatch) {
                               profileMatch.ProfileMatches.ProfileMatch.forEach((pfileMatch: any) => {
                                   profileMatchData = pfileMatch;
                                   profileMatchData.PassengerTattoo = profileMatch.PassengerTattoo;
                                   profileMatchData.PassengerNumber = profileMatch.PassengerNumber;
                                   profileMatchData.IATTravellerId = profileMatch.IATTravellerId;
                                   if(StringUtils.equalsIgnoreCase(this.meCase.DirectionCode, StringUtils.trim(pfileMatch.Direction)) &&
                                       StringUtils.equalsIgnoreCase(this.meCase.LocalPortCode, StringUtils.trim(pfileMatch.LocalPortCode)) &&
                                        StringUtils.equalsIgnoreCase(this.meCase.ParentRouteId, StringUtils.trim(pfileMatch.RouteId)) &&
                                         (moment(StringUtils.trim(this.meCase.LocalScheduleDate)).isSame(moment(pfileMatch.LocalScheduleDate)))) {
                                             this.currentProfileMatches.push(profileMatchData);
                                   }
                                   else {
                                       this.historicalProfileMatches.push(profileMatchData);
                                   }
                               });

                            }
                        });
                    } else {
                        this.profileMatches = [];
                    }
                    this.sync.syncEnd();
                }
            }).catch((error) => {
                if (syncId === this.sync.id) {
                    this.profileMatches = [];
                    this.sync.syncError(error);
                }
            });
    }

    @action
    loadProfileMatches(meCase: IMECase) : Promise<any> {
        const syncId = meCase.IATTravellerID+meCase.RecordLocator;
        this.meCase = meCase;
         if( this.meCase.BookingSystemCode && this.meCase.RecordLocator && this.meCase.CreationTs) {
            let bookingKey: IBookingKey;
            bookingKey = {
                BookingSystemCode : this.meCase.BookingSystemCode,
                BookingCreationTimeStamp: DateUtils.dateFromMatchEvaluationDataText(this.meCase.CreationTs),
                RecordLocator:this.meCase.RecordLocator
            };
            if(StringUtils.equalsIgnoreCase(this.meCase.DomainType, MEDomainType.Air)) {
                this.request = {
                    pnrBusinessKey: bookingKey
                };
            } else {
                this.request = {
                    CruiseBusinessKey: bookingKey
                };
            }
            return this.refresh();
        } else if(this.meCase.IATTravellerID) {
            this.request = {
                IATTravellerId : this.meCase.IATTravellerID
            };
            return this.refresh();
        }
        return Promise.resolve();
    }

}

export { ProfileMatchModel as default, ProfileMatchModel, IProfileMatchData};