import SoapService from "xml/SoapService";
import IVesselScheduleServive from './IVesselScheduleServive';
import IGetVesselScheduleRequest from './request/IGetVesselScheduleRequest';
import IGetVesselScheduleResponse from './response/IGetVesselScheduleResponse';
import { GetVesselScheduleRequestType } from "./request/XmlSchema";
import { GetVesselScheduleResponseType } from "./response/XmlSchema";
import { GetVesselScheduleExceptionType } from "./exception/XmlSchema";
import IUrlConfig from "config/IUrlConfig";
import RestRiskServiceConfig from "config/RestRiskServiceConfig";
import { getRequestHeader } from "risk/traveller/common/RequestHeaderUtils";

class SoapVesselScheduleServive extends SoapService implements IVesselScheduleServive {
    private _config: IUrlConfig;
    constructor(config?: IUrlConfig) {
        super();
        this._config = config;
    }

    get config() {
        return this._config || RestRiskServiceConfig;
    }

    set config(value: IUrlConfig) {
        this._config = value;
    }

    GetVesselSchedule(request: IGetVesselScheduleRequest) : Promise<IGetVesselScheduleResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/vessel/VesselDataService`,
                action: "http://border.gov.au/service/vessesl/v1/GetVesselSchedule",
                body: {
                    value: requestInternal,
                    name: "GetVesselScheduleRequest",
                    type: GetVesselScheduleRequestType
                },
                responseType: GetVesselScheduleResponseType,
                faultDetailType: GetVesselScheduleExceptionType
            });
        });
    }


}

export { SoapVesselScheduleServive as default, SoapVesselScheduleServive };