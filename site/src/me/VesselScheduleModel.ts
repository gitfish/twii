import { observable, action, computed } from "mobx";
import IGetVesselScheduleRequest from 'risk/traveller/vessel/request/IGetVesselScheduleRequest';
import VesselScheduleServiveContext from "risk/traveller/vessel/VesselScheduleServiveContext";
import IVesselItinerary from "risk/traveller/vessel/response/IVesselItinerary";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import {IMECase, MEDomainType} from "./IMECase";
import IVesselScheduleModel from "./IVesselScheduleModel";
import * as DateUtils from "util/Date";

class VesselScheduleModel implements IVesselScheduleModel {

    @observable vesselSchedule: IVesselItinerary[] = [];
    @observable sync: ISyncModel = new SyncModel();

    private meCase: IMECase;

    @action
    refresh(): Promise<any> {
        const syncId = this.meCase.CaseID;
        this.sync.syncStart({ id: syncId });
        this.vesselSchedule = [];
        let request: IGetVesselScheduleRequest = {
            MovementInfo: {
                DirectionCode: this.meCase.DirectionCode,
                LocalPortCode: this.meCase.LocalPortCode,
                LocalScheduledDate: DateUtils.dateFromDataText(this.meCase.LocalScheduleDate),
                VesselType: MEDomainType.Air,
                RouteId: this.meCase.RouteId
            }
        };
        return VesselScheduleServiveContext.ref.GetVesselSchedule(request)
            .then((vesselScheduleResponse) => {

                    if (vesselScheduleResponse && vesselScheduleResponse.ListOfVesselItinerary &&
                        vesselScheduleResponse.ListOfVesselItinerary.VesselItinerary) {
                        this.vesselSchedule = vesselScheduleResponse.ListOfVesselItinerary.VesselItinerary;
                    } else {
                        this.vesselSchedule = [];
                    }
                    this.sync.syncEnd();

            }).catch((error) => {
                    this.vesselSchedule = [];
                    this.sync.syncError(error);

            });
    }

    loadByCaseId(meCase: IMECase): Promise<any> {
        const syncId = meCase.CaseID;
        if(meCase.LocalPortCode && meCase.DirectionCode && meCase.RouteId && meCase.LocalScheduleDate) {

                this.meCase = meCase;
                return this.refresh();

        }
        return Promise.resolve();
    }
}

export { VesselScheduleModel as default, VesselScheduleModel };