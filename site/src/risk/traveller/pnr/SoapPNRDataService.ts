import SoapService from "xml/SoapService";
import IPNRDataService from "./IPNRDataService";
import IGetCurrentBookingDataRequest from "./request/IGetCurrentBookingDataRequest";
import IGetHistoricalBookingDataRequest from "./request/IGetHistoricalBookingDataRequest";
import { GetCurrentBookingDataRequestType, GetHistoricalBookingDataRequestType } from "./request/XmlSchema";
import { GetCurrentBookingDataResponseType, GetHistoricalBookingDataResponseType } from "./response/XmlSchema";
import { GetCurrentBookingDataFaultDetailType, GetHistoricalBookingDataFaultDetailType } from "./exception/XmlSchema";
import IGetCurrentBookingDataResponse from "./response/IGetCurrentBookingDataResponse";
import IGetHistoricalBookingDataResponse from "./response/IGetHistoricalBookingDataResponse";
import IUrlConfig from "config/IUrlConfig";
import RestRiskServiceConfig from "config/RestRiskServiceConfig";
import { getRequestHeader } from "risk/traveller/common/RequestHeaderUtils";

// NOTE: A lot of this needs to be moved into a SoapBaseService or something

class SoapPNRDataService extends SoapService implements IPNRDataService {
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
    
    GetCurrentBookingData(request : IGetCurrentBookingDataRequest) : Promise<IGetCurrentBookingDataResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/pnr/PNRDataService`,
                action: "http://border.gov.au/risk/traveller/pnr/v1/GetCurrentBookingData",
                body: {
                    value: requestInternal,
                    name: "GetCurrentBookingDataRequest",
                    type: GetCurrentBookingDataRequestType,
                    forceQualify: false
                },
                responseType: GetCurrentBookingDataResponseType,
                faultDetailType: GetCurrentBookingDataFaultDetailType
            });
        });
    }

    GetHistoricalBookingData(request : IGetHistoricalBookingDataRequest) : Promise<IGetHistoricalBookingDataResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/pnr/PNRDataService`,
                action: "http://border.gov.au/risk/traveller/pnr/v1/GetHistoricalBookingData",
                body: {
                    value: requestInternal,
                    name: "GetHistoricalBookingDataRequest",
                    type: GetHistoricalBookingDataRequestType,
                    forceQualify: false
                },
                responseType: GetHistoricalBookingDataResponseType,
                faultDetailType: GetHistoricalBookingDataFaultDetailType
            });
        });
    }
}

export { SoapPNRDataService as default, SoapPNRDataService }