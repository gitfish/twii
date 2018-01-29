import IProfileMatchEvalutationService from "./IProfileMatchEvalutionService";
import IGetProfileDismissalReasonRequest from "./request/IGetProfileDismissalReasonRequest";
import IGetProfileDismissalReasonResponse from "./response/IGetProfileDismissalReasonResponse";
import { GetProfileDismissalReasonRequestType } from "./request/XmlSchema";
import { GetProfileDismissalReasonResponseType } from "./response/XmlSchema";
import IRecordActionRequest from "./request/IRecordActionRequest";
import IRecordActionResponse from "./response/IRecordActionResponse";
import { RecordActionRequestType } from "./request/XmlSchema";
import { RecordActionResponseType } from "./response/XmlSchema";
import { RecordActionFaultDetailType, GetProfileDismissalReasonFaultDetailType } from "./exception/XmlSchema";
import { getRequestHeader } from "risk/traveller/common/RequestHeaderUtils";
import IUrlConfig from "config/IUrlConfig";
import RestRiskServiceConfig from "config/RestRiskServiceConfig";
import SoapService from "xml/SoapService";

class SoapProfileMatchEvaluationService extends SoapService implements IProfileMatchEvalutationService {
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
    GetProfileDismissReason(request : IGetProfileDismissalReasonRequest) : Promise<IGetProfileDismissalReasonResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/traveller/ProfileMatchEvaluationService/GetProfileDismissalReason`,
                action: "http://border.gov.au/service/risk/traveller/ProfileMatchEvaluationService/v1/GetProfileDismissalReason",
                body: {
                    value: requestInternal,
                    name: "GetProfileDismissalReasonRequest",
                    type: GetProfileDismissalReasonRequestType
                },
                responseType: GetProfileDismissalReasonResponseType,
                faultDetailType: GetProfileDismissalReasonFaultDetailType
            });
        });
    }
    RecordAction(request : IRecordActionRequest) : Promise<IRecordActionResponse> {
        const requestInternal = Object.assign({}, request);
        return getRequestHeader(requestInternal.RequestHeader).then(requestHeader => {
            requestInternal.RequestHeader = requestHeader;
            return this.soapCall({
                url: `${this.config.baseUrl}/traveller/ProfileMatchEvaluationService/RecordAction`,
                action: "http://border.gov.au/service/risk/traveller/ProfileMatchEvaluationService/v1/RecordAction",
                body: {
                    value: requestInternal,
                    name: "RecordActionRequest",
                    type: RecordActionRequestType
                },
                responseType: RecordActionResponseType,
                faultDetailType: RecordActionFaultDetailType
            });
        });
    }
}

export { SoapProfileMatchEvaluationService as default, SoapProfileMatchEvaluationService }