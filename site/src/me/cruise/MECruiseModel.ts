import { observable, action } from "mobx";
import IMECruiseModel from "./IMECruiseModel";
import { IMECase } from "me/IMECase";
import CruiseBookingModel from "../CruiseBookingModel";
import ITravellerSummary from "risk/traveller/cru/ITravellerSummary";
import METravelHistoryStore from "me/travelhistory/METravelHistoryStore";
import ICruiseBookingModel from "../ICruiseBookingModel";
import IProfileMatchModel from "me/profilematch/IProfileMatchModel";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import * as StringUtils from "util/String";
import MEProfileMatchStore from "me/profilematch/MEProfileMatchStore";

class MECruiseModel implements IMECruiseModel {

    @observable meCase: IMECase;
    @observable bookingModel: ICruiseBookingModel = new CruiseBookingModel();
    @observable profileMatchModel: IProfileMatchModel = MEProfileMatchStore;
    @observable travellerHistoryModel: ITravellerHistoryModel = METravelHistoryStore;

    @action
    refresh() {
        if(this.meCase) {
            return Promise.all([
                this.bookingModel.load(this.meCase).then(() => {
                    return this._loadTravellerHistory();
                }),
                this.profileMatchModel.loadProfileMatches(this.meCase)
            ]);
        }
        return Promise.resolve();
    }

    @action
    load(meCase: IMECase): Promise<any> {
        this.meCase = meCase;
        return this.refresh();
    }

    _loadTravellerHistory = () : Promise<any> => {
        let booking = this.bookingModel.booking;
        let iatTravellerIds: string[] = [];
        if(booking) {
            if (booking && booking.TravellerInfo && booking.TravellerInfo.TravellerSummary) {
                booking.TravellerInfo.TravellerSummary.forEach((travellerSummary: ITravellerSummary) => {
                    if (travellerSummary.IATTraveller && StringUtils.isNotBlank(travellerSummary.IATTraveller.IATTravellerId)) {
                        iatTravellerIds.push(travellerSummary.IATTraveller.IATTravellerId);
                    }
                });
            }
        } else {
            iatTravellerIds.push(this.meCase.IATTravellerID);
        }
        return this.travellerHistoryModel.load(iatTravellerIds);
    }
}

export { MECruiseModel as default, MECruiseModel }


