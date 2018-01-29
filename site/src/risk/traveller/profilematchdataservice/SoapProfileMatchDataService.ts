import SoapService from "xml/SoapService";
import IProfileMatchDataService from './IProfileMatchDataService';
import IGetProfileMatchesRequest from './request/IGetProfileMatchesRequest';
import IGetProfileMatchesByPNRRequest from './request/IGetProfileMatchesByPNRRequest';
import IGetProfileMatchesResponse from "./response/IGetProfileMatchesResponse";
import { GetProfileMatchesRequestType, GetProfileMatchesByPNRRequestType } from "./request/XmlSchema";
import { GetProfileMatchesResponseType } from "./response/XmlSchema";
import { GetProfileMatchesByPNRFaultDetailType, GetProfileMatchesFaultDetailType } from "./exception/XmlSchema";
import IUrlConfig from "config/IUrlConfig";
import RestRiskServiceConfig from "config/RestRiskServiceConfig";
import { getRequestHeader } from "risk/traveller/common/RequestHeaderUtils";

class SoapProfileMatchDataService extends SoapService implements IProfileMatchDataService {
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

    GetProfileMatches(request: IGetProfileMatchesRequest) : Promise<IGetProfileMatchesResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/match/ProfileMatchDataService`,
                action: "http://border.gov.au/service/risk/traveller/profilematchdataserviceService/v1/GetProfileMatches",
                body: {
                    value: requestInternal,
                    name: "GetProfileMatchesRequest",
                    type: GetProfileMatchesRequestType 
                },
                responseType: GetProfileMatchesResponseType, 
                faultDetailType: GetProfileMatchesFaultDetailType
            });
        });
    }

    GetProfileMatchesByPNR(request: IGetProfileMatchesByPNRRequest) : Promise<IGetProfileMatchesResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/match/ProfileMatchDataService`,
                action: "http://border.gov.au/risk/traveller/ProfileMatchDataService/v1/GetProfileMatchesByPNR",
                body: {
                    value: requestInternal,
                    name: "GetProfileMatchesByPNRRequest",
                    type: GetProfileMatchesByPNRRequestType 
                },
                responseType: GetProfileMatchesResponseType, 
                faultDetailType: GetProfileMatchesByPNRFaultDetailType
            });
        });
    }
}

export { SoapProfileMatchDataService as default, SoapProfileMatchDataService };