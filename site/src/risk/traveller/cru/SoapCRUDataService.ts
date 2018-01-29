import SoapService from "xml/SoapService";
import ICRUDataService from "./ICRUDataService";
import IGetCurrentCruBookingDataRequest from "./request/IGetCurrentCruBookingDataRequest";
import IGetHistoricalBookingDataRequest from "./request/IGetHistoricalCruBookingDataRequest";
import { GetCurrentCruBookingDataRequestType, GetHistoricalCruBookingDataRequestType } from "./request/XmlSchema";
import IGetCurrentCruBookingDataResponse from "./response/IGetCurrentCruBookingDataResponse";
import IGetHistoricalCruBookingDataResponse from "./response/IGetHistoricalCruBookingDataResponse";
import { GetCurrentCruBookingDataResponseType, GetHistoricalCruBookingDataResponseType } from "./response/XmlSchema";
import { GetCurrentCruBookingDataFaultDetailType, GetHistoricalCruBookingDataFaultDetailType } from "./exception/XmlSchema";
import IUrlConfig from "config/IUrlConfig";
import RestRiskServiceConfig from "config/RestRiskServiceConfig";
import { getRequestHeader } from "risk/traveller/common/RequestHeaderUtils";

class SoapCRUDataService extends SoapService implements ICRUDataService {
    private _config : IUrlConfig;
    constructor(config?: IUrlConfig) {
        super();
        this.config = config;
    }
    get config() {
        return this._config || RestRiskServiceConfig;
    }
    set config(value : IUrlConfig) {
        this._config = value;
    }
    GetCurrentCruBookingData(request : IGetCurrentCruBookingDataRequest) : Promise<IGetCurrentCruBookingDataResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/cru/CRUDataService`,
                action: "http://border.gov.au/risk/traveller/cru/v1/GetCurrentCruBookingData",
                body: {
                    value: requestInternal,
                    name: "GetCurrentCruBookingDataRequest",
                    type: GetCurrentCruBookingDataRequestType,
                    forceQualify: false
                },
                responseType: GetCurrentCruBookingDataResponseType,
                faultDetailType: GetCurrentCruBookingDataFaultDetailType
            });
        });
    }
    GetHistoricalCruBookingData(request : IGetHistoricalBookingDataRequest) : Promise<IGetHistoricalCruBookingDataResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/cru/CRUDataService`,
                action: "http://border.gov.au/risk/traveller/cru/v1/GetHistoricalCruBookingData",
                body: {
                    value: requestInternal,
                    name: "GetHistoricalCruBookingDataRequest",
                    type: GetHistoricalCruBookingDataRequestType,
                    forceQualify: false
                },
                responseType: GetHistoricalCruBookingDataResponseType,
                faultDetailType: GetHistoricalCruBookingDataFaultDetailType
            });
        });
    }
}

export { SoapCRUDataService as default, SoapCRUDataService }