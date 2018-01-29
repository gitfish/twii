import { observable, action } from "mobx";
import IGetHistoricalBookingDataRequest from "risk/traveller/pnr/request/IGetHistoricalBookingDataRequest";
import PNRDataServiceContext from "risk/traveller/pnr/PNRDataServiceContext";
import IHistoricalPNRRecord from "risk/traveller/pnr/IHistoricalPNRRecord";
import IMatchedIATTraveller from "risk/traveller/pnr/IMatchedIATTraveller";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import {IMECase} from "me/IMECase";
import * as DateUtils from "util/Date";
import IMETSPNRModel from "./IMETSPNRModel";

class METSPNRModel implements IMETSPNRModel {

    @observable pnrRecords: IHistoricalPNRRecord[] = [];
    @observable matchedIATTravellers: IMatchedIATTraveller[] = [];
    @observable sync: ISyncModel = new SyncModel();
    @observable visible: boolean = false;

    private meCase: IMECase;

    @action
    refresh(): Promise<any> {
        const syncId = this.meCase.CaseID;
        this.sync.syncStart({id: syncId});
        this.pnrRecords  = [];
        this.matchedIATTravellers = [];
        let request: IGetHistoricalBookingDataRequest = {
           BookingSystemCode : this.meCase.BookingSystemCode,
            BookingCreationTimeStamp : DateUtils.dateFromMatchEvaluationDataText(this.meCase.CreationTs),
            RecordLocator : this.meCase.RecordLocator

        };
        return PNRDataServiceContext.ref.GetHistoricalBookingData(request)
            .then((historicalBookingData) => {
                    this.pnrRecords = historicalBookingData.ListOfHistoricalPNRRecord && historicalBookingData.ListOfHistoricalPNRRecord.PNRRecord ?
                        historicalBookingData.ListOfHistoricalPNRRecord.PNRRecord : [];
                    this.matchedIATTravellers = historicalBookingData.ListOfMatchedIATTraveller && historicalBookingData.ListOfMatchedIATTraveller.MatchedIATTraveller ?
                        historicalBookingData.ListOfMatchedIATTraveller.MatchedIATTraveller : [];
                    this.sync.syncEnd();

            }).catch((error) => {
                    this.pnrRecords = [];
                    this.matchedIATTravellers = [];
                    this.sync.syncError(error);

            });
    }

    loadByCaseId(meCase: IMECase) : Promise<any> {
        const syncId = meCase.CaseID;
        if(meCase.RecordLocator && meCase.BookingSystemCode && meCase.CreationTs) {

                this.meCase = meCase;
                return this.refresh();

        }
        return Promise.resolve();
    }

    setVisibility(_visible: boolean) {
        this.visible = _visible;
    }
}

export { METSPNRModel as default, METSPNRModel }