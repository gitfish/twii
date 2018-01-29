import SoapService from "xml/SoapService";
import IIATTravellerDataService from "./IIATTravellerDataService";
import IGetTravellerHistoryRequest from "./request/IGetTravellerHistoryRequest";
import { GetTravellerHistoryRequestType } from "./request/XmlSchema";
import IGetTravellerHistoryResponse from "./response/IGetTravellerHistoryResponse";
import { GetTravellerHistoryResponseType } from "./response/XmlSchema";
import { GetTravellerHistoryFaultDetailType } from "./exception/XmlSchema";
import IUrlConfig from "config/IUrlConfig";
import RestRiskServiceConfig from "config/RestRiskServiceConfig";
import { getRequestHeader } from "risk/traveller/common/RequestHeaderUtils";

class SoapIATTravellerDataService extends SoapService implements IIATTravellerDataService {
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
    GetTravellerHistory(request : IGetTravellerHistoryRequest) : Promise<IGetTravellerHistoryResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/iat/IATTravellerDataService`,
                action: "http://border.gov.au/risk/traveller/iat/v1/GetTravellerHistory",
                body: {
                    value: requestInternal,
                    name: "GetTravellerHistoryRequest",
                    type: GetTravellerHistoryRequestType,
                    forceQualify: true
                },
                responseType: GetTravellerHistoryResponseType,
                faultDetailType: GetTravellerHistoryFaultDetailType
            });
        });
    }
}

export { SoapIATTravellerDataService as default, SoapIATTravellerDataService }