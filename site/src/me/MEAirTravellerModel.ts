import { observable, action } from "mobx";
import IMEAirTravellerModel from "./IMEAirTravellerModel";
import {IMECase, MEDomainType} from "me/IMECase";
import MESummaryStore from "me/summary/MESummaryStore";
import MEProfileMatchStore from "me/profilematch/MEProfileMatchStore";
import VesselScheduleModel from "./VesselScheduleModel";
import METSPNRStore from "me/travellersummary/METSPNRStore";
import METravelHistoryStore from "me/travelhistory/METravelHistoryStore";
import IMESummaryModel from "me/summary/IMESummaryModel";
import IProfileMatchModel from "me/profilematch/IProfileMatchModel";
import IVesselScheduleModel from "./IVesselScheduleModel";
import IMETSPNRModel from "me/travellersummary/IMETSPNRModel";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";
import ITravellerSummary from "risk/traveller/pnr/ITravellerSummary";
import * as StringUtils from "util/String";

class MEAirTravellerModel implements IMEAirTravellerModel {

    @observable meCase: IMECase;
    @observable summaryModel: IMESummaryModel = MESummaryStore;
    @observable profileMatchModel: IProfileMatchModel = MEProfileMatchStore;
    @observable vesselScheduleModel: IVesselScheduleModel = new VesselScheduleModel();
    @observable historicalPNRnIATModel: IMETSPNRModel = METSPNRStore;
    @observable travellerHistoryModel: ITravellerHistoryModel = METravelHistoryStore;

    @action
    refresh() {
        if(this.meCase) {
            return Promise.all([
                this.summaryModel.loadByCaseId(this.meCase).then(() => {
                    return this._loadTravellerHistory();
                }),
                this.profileMatchModel.loadProfileMatches(this.meCase),
                this.vesselScheduleModel.loadByCaseId(this.meCase),
                this.historicalPNRnIATModel.loadByCaseId(this.meCase)
            ]);
        }
        return Promise.resolve();
    }

    @action
    load(meCase: IMECase) : Promise<any> {
        this.meCase = meCase;
        return this.refresh();
    }

    _loadTravellerHistory = () : Promise<any> => {
        let iatTravellerIds: string[] = [];
        if(this.summaryModel.bookingSummary) {
            let bookingSummary = this.summaryModel.bookingSummary;
            if (bookingSummary && bookingSummary.TravellerInfo && bookingSummary.TravellerInfo.TravellerSummary) {
                bookingSummary.TravellerInfo.TravellerSummary.forEach((travellerSummary: ITravellerSummary) => {
                    if (travellerSummary.IATTraveller && StringUtils.isNotBlank(travellerSummary.IATTraveller.IATTravellerId)) {
                        iatTravellerIds.push(travellerSummary.IATTraveller.IATTravellerId);
                    }
                });
            }
        }
        if(this.meCase.IATTravellerID) {
            iatTravellerIds.push(this.meCase.IATTravellerID);
        }
        return this.travellerHistoryModel.load(iatTravellerIds);
    }
}

export { MEAirTravellerModel as default, MEAirTravellerModel }


