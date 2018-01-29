import { observable, action, computed } from "mobx";
import IMECase from "./IMECase";
import ICruiseBookingModel from "./ICruiseBookingModel";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import CRUDataServiceContext from "risk/traveller/cru/CRUDataServiceContext";
import IGetCurrentCruBookingDataRequest from "risk/traveller/cru/request/IGetCurrentCruBookingDataRequest";
import IGetCurrentCruBookingDataResponse from "risk/traveller/cru/response/IGetCurrentCruBookingDataResponse";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";
import * as DateUtils from "util/Date";

class CruiseBookingModel implements ICruiseBookingModel {
    @observable sync : ISyncModel = new SyncModel();
    @observable meCase : IMECase;
    @observable booking : ICruiseBookingData;

    @action
    refresh() : Promise<any> {
        const syncId = this.meCase.CaseID;
        this.sync.syncStart({ id: syncId });
        let request: IGetCurrentCruBookingDataRequest = {
            BookingSystemCode: this.meCase.BookingSystemCode,
            BookingCreationTimeStamp: DateUtils.dateFromMatchEvaluationDataText(this.meCase.CreationTs),
            RecordLocator: this.meCase.RecordLocator
        };
        return CRUDataServiceContext.ref.GetCurrentCruBookingData(request)
            .then((response : IGetCurrentCruBookingDataResponse) => {
                    this.booking = response.CurrentCruBookingData;
                    this.sync.syncEnd();
            }).catch((error) => {
                    this.booking = undefined;
                    this.sync.syncError(error);
            });
    }

    @action
    load(meCase : IMECase) : Promise<any> {
        this.meCase = meCase;
        if(meCase.RecordLocator && meCase.BookingSystemCode && meCase.CreationTs) {
            return this.refresh();
        }
        return Promise.resolve();
    }
}

export { CruiseBookingModel as default, CruiseBookingModel }