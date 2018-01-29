import IGetVesselScheduleRequest from './request/IGetVesselScheduleRequest';
import GetVesselScheduleResponse from './response/IGetVesselScheduleResponse';


interface IVesselScheduleServive {
    GetVesselSchedule(request: IGetVesselScheduleRequest): Promise<GetVesselScheduleResponse>;
}

export { IVesselScheduleServive as default, IVesselScheduleServive };