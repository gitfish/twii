import {observable, action, computed} from "mobx";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import ITravellerHistoryModel from "./ITravellerHistoryModel";
import ITravellerHistory from "risk/traveller/iat/response/ITravellerHistory";
import {IGetTravellerHistoryRequest} from "risk/traveller/iat/request/IGetTravellerHistoryRequest";
import {IGetTravellerHistoryResponse} from "risk/traveller/iat/response/IGetTravellerHistoryResponse";
import TravellerRiskServiceContext from "risk/traveller/model/TravellerRiskServiceContext";
import IATDataSubject from "risk/traveller/iat/common/IATDataSubject";
import {IITravelerHistoryMovementDetails} from "./ITravellerHistoryModel";
import {IITravelerHistoryVisasDetails} from "./ITravellerHistoryModel";
import {IITravelerHistoryPassportsDetails} from "./ITravellerHistoryModel";
import {IITravelerHistoryAlertsDetails} from "./ITravellerHistoryModel";
import {IITravelerHistoryAlertsHistoryDetails} from "./ITravellerHistoryModel";
import {IITravelerHistoryBioDataDetails} from "./ITravellerHistoryModel";
import {IITravelerHistoryBagsExamDetails} from "./ITravellerHistoryModel";
import MESummaryStore from "me/summary/MESummaryStore";
import ITravellerSummary from "risk/traveller/pnr/ITravellerSummary";
import {formatToNISName, defaultDOBFormat} from "entity/EntityNameUtils";

const TravellerHistoryDataSubjects: IATDataSubject[] = [
    IATDataSubject.Documents,
    IATDataSubject.Intervention,
    IATDataSubject.Movements
];

class TravellerHistoryModel implements ITravellerHistoryModel {

    @observable sync: ISyncModel = new SyncModel();
    @observable historyItems: ITravellerHistory[] = [];

    private iatTravellerIds: string[];

    @action
    refresh() : Promise<any> {
        const syncId = this.iatTravellerIds.join();
        this.sync.syncStart({ id: syncId });
        this.historyItems = [];
        let request: IGetTravellerHistoryRequest = {
            ListOfIATTravellerId: { IATTravellerId: this.iatTravellerIds },
            RequestedDataSubjects: { IATDataSubject: TravellerHistoryDataSubjects }
        };
        return TravellerRiskServiceContext.ref.GetTravellerHistory(request)
            .then((response : IGetTravellerHistoryResponse) => {

                    if (response && response.ListOfTravellerHistory && response.ListOfTravellerHistory.TravellerHistory) {
                        this.historyItems = response.ListOfTravellerHistory.TravellerHistory;
                    } else {
                        this.historyItems = [];
                    }
                    this.sync.syncEnd();

            }).catch((error) => {

                    this.historyItems = [];
                    this.sync.syncError(error);

            });
    }

    load(iatTravellerIds: string[]): Promise<any> {
        if (iatTravellerIds && iatTravellerIds.length > 0) {
            const syncId = iatTravellerIds.join();

                this.iatTravellerIds = iatTravellerIds;
                return this.refresh();

        } else {
            this.historyItems = [];
            this.sync.syncEnd();
        }
        return Promise.resolve();
    }

    matchPTatoo = (iatTravellerID: string): number => {
        var passTatoo:number = undefined;
        let parentTravelSummaryItems: ITravellerSummary[] = MESummaryStore.travelSummaryItems;
        parentTravelSummaryItems.forEach((item: ITravellerSummary) => {
            if(item.IATTraveller && item.IATTraveller.IATTravellerId) {
                if (item.IATTraveller.IATTravellerId == iatTravellerID)
                    passTatoo = item.PNRTraveller ? item.PNRTraveller.PassengerTattoo ? item.PNRTraveller.PassengerTattoo : undefined : undefined ;
            }
        });
        return passTatoo;
    }

    // To consolidate below functions to one.
    @computed
    get visas(): IITravelerHistoryVisasDetails[] {
        let visas: IITravelerHistoryVisasDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let vsItem: IITravelerHistoryVisasDetails = {};
            let pt:number;
            if(histItem.IATTravellerID) {
                pt = this.matchPTatoo(histItem.IATTravellerID);
            }
            if(histItem.ListOfVisaInfo && histItem.ListOfVisaInfo.VisaInfo) {
                histItem.ListOfVisaInfo.VisaInfo.forEach((visa) => {
                    vsItem = visa;
                    vsItem.passengerTatoo = pt;
                    vsItem.iatTravellerId = histItem.IATTravellerID;
                    visas.push(vsItem);
                });
            }
        });
        return visas;
    }

    matchPTatooWithResBio = (iatTravellerID: string, ppItem: IITravelerHistoryPassportsDetails): IITravelerHistoryPassportsDetails => {
        let parentTravelSummaryItems: ITravellerSummary[] = MESummaryStore.travelSummaryItems;
        parentTravelSummaryItems.forEach((item: ITravellerSummary) => {
            if(item.IATTraveller && item.IATTraveller.IATTravellerId) {
                if (item.IATTraveller.IATTravellerId == iatTravellerID) {
                    ppItem.passengerTatoo = item.PNRTraveller ? item.PNRTraveller.PassengerTattoo ? item.PNRTraveller.PassengerTattoo : undefined : undefined;
                    if (item.PNRTraveller.Biographic) {
                        var resBio = formatToNISName(item.PNRTraveller.Biographic.familyName.toUpperCase(),
                            item.PNRTraveller.Biographic.givenName, "",
                            item.PNRTraveller.Biographic.sexCode, "");
                        resBio = item.PNRTraveller.Biographic.birthDate ? resBio.concat(defaultDOBFormat(item.PNRTraveller.Biographic.birthDate)) : resBio;
                        resBio = item.PNRTraveller.Biographic.countryOfCitizenship ? resBio+" - "+(item.PNRTraveller.Biographic.countryOfCitizenship) : resBio;
                        ppItem.resBio = resBio;
                    }
                }
            }
        });
        return ppItem;
    }

    @computed
    get passports(): IITravelerHistoryPassportsDetails[] {
        let passports: IITravelerHistoryPassportsDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let ppItem: IITravelerHistoryPassportsDetails = {};
            if (histItem.ListOfPassportInfo && histItem.ListOfPassportInfo.PassportInfo) {
                histItem.ListOfPassportInfo.PassportInfo.forEach((pInfo) => {
                    ppItem = pInfo;
                    ppItem = this.matchPTatooWithResBio(histItem.IATTravellerID, ppItem);
                    ppItem.iatTravellerId = histItem.IATTravellerID;
                    passports.push(ppItem);
                });
            }
        });
        return passports;
    }


    @computed
    get alerts(): IITravelerHistoryAlertsDetails[] {
        let alerts: IITravelerHistoryAlertsDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let aItem: IITravelerHistoryAlertsDetails = {};
            let pt:number;
            if(histItem.IATTravellerID) {
                pt = this.matchPTatoo(histItem.IATTravellerID);
            }
            if(histItem.ListOfAlertInfo && histItem.ListOfAlertInfo.AlertInfo) {
                histItem.ListOfAlertInfo.AlertInfo.forEach((alert) => {
                    aItem = alert;
                    aItem.passengerTatoo = pt;
                    aItem.iatTravellerId = histItem.IATTravellerID;
                    alerts.push(aItem);
                });
            }
        });
        return alerts;
    }


    @computed
    get alertHistoryItems(): IITravelerHistoryAlertsHistoryDetails[] {
        let alertHistoryItems: IITravelerHistoryAlertsHistoryDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let aHistItem: IITravelerHistoryAlertsDetails = {};
            let pt:number;
            if(histItem.IATTravellerID) {
                pt = this.matchPTatoo(histItem.IATTravellerID);
            }
            if(histItem.ListOfAlertMovementInfo && histItem.ListOfAlertMovementInfo.AlertMovementInfo) {
                histItem.ListOfAlertMovementInfo.AlertMovementInfo.forEach((alertHistory) => {
                    aHistItem = alertHistory;
                    aHistItem.passengerTatoo = pt;
                    aHistItem.iatTravellerId = histItem.IATTravellerID;
                    alertHistoryItems.push(aHistItem);
                });
            }
        });
        return alertHistoryItems;
    }

    @computed
    get bioDataItems(): IITravelerHistoryBioDataDetails[] {
        let bioDataItems: IITravelerHistoryBioDataDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let bdItem: IITravelerHistoryBioDataDetails = {};
            let pt:number;
            if(histItem.IATTravellerID) {
                pt = this.matchPTatoo(histItem.IATTravellerID);
            }
            if (histItem.ListOfBioDataInfo && histItem.ListOfBioDataInfo.BioDataInfo) {
                histItem.ListOfBioDataInfo.BioDataInfo.forEach((bInfo) => {
                    bdItem = bInfo;
                    bdItem.passengerTatoo = pt;
                    bdItem.iatTravellerId = histItem.IATTravellerID;
                    bioDataItems.push(bdItem);
                });
            }
        });
        return bioDataItems;
    }

    @computed
    get movementItems(): IITravelerHistoryMovementDetails[] {
        let movementItems: IITravelerHistoryMovementDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let mItem: IITravelerHistoryMovementDetails = {};
            let pt:number;
            if(histItem.IATTravellerID) {
                pt = this.matchPTatoo(histItem.IATTravellerID);
            }
            if (histItem.ListOfMovementInfo && histItem.ListOfMovementInfo.MovementInfo) {
                histItem.ListOfMovementInfo.MovementInfo.forEach((mvItem) => {
                    mItem = mvItem;
                    mItem.passengerTatoo = pt;
                    mItem.iatTravellerId = histItem.IATTravellerID;
                    movementItems.push(mItem);
                });
            }
        });
        return movementItems;
    }

    @computed
    get bagsExamResults(): IITravelerHistoryBagsExamDetails[] {
        let bagsExamResults: IITravelerHistoryBagsExamDetails[] = [];
        this.historyItems.forEach((histItem: ITravellerHistory) => {
            let beItem: IITravelerHistoryBagsExamDetails = {};
            let pt:number;
            if(histItem.IATTravellerID) {
                pt = this.matchPTatoo(histItem.IATTravellerID);
            }
            if (histItem.ListOfBagsExamResultInfo && histItem.ListOfBagsExamResultInfo.BagsExamResultInfo) {
                histItem.ListOfBagsExamResultInfo.BagsExamResultInfo.forEach((bagsExamResult) => {
                    beItem = bagsExamResult;
                    beItem.passengerTatoo = pt;
                    beItem.iatTravellerId = histItem.IATTravellerID;
                    bagsExamResults.push(beItem);
                });
            }
        });
        return bagsExamResults;
    }

}

export { TravellerHistoryModel as default, TravellerHistoryModel}
