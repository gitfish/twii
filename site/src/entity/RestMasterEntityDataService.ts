import axios from "axios";
import {
    IMasterEntityDataService,
    IMasterEntityServiceRequestOptions,
    IMasterEntitySourceRefResponse,
    IMasterEntitySourceEntityMetaResponse,
    IMasterEntitySourceEntityNameResponse,
    IMasterEntitySourceEntityAddressResponse,
    IMasterEntitySourceEntityPhoneResponse,
    IMasterEntitySourceEntityCredentialResponse
} from "./IMasterEntityDataService";
import AbstractRestDataService from "common/AbstractRestDataService";
import * as DefaultHttpErrorHandler from "common/HttpErrorHandler";

const DEFAULT_MAX_NO_RECORDS = 1000;

class RestMasterEntityDataService extends AbstractRestDataService implements IMasterEntityDataService {
    private _createParams(opts?: IMasterEntityServiceRequestOptions) : any {
        return {
            maxNoOfRecords: opts && opts.maxNoOfRecords > 0 ? opts.maxNoOfRecords : DEFAULT_MAX_NO_RECORDS
        };
    }
    getMasterEntitySourceRef(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceRefResponse> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}`, {
            params: this._createParams(opts)
        }).then((value) => {
            return value.data as IMasterEntitySourceRefResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getMasterEntitySourceEntityMeta(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityMetaResponse> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/Entity`, {
            params: this._createParams(opts)
        }).then((value) => {
            return value.data as IMasterEntitySourceEntityMetaResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getMasterEntitySourceEntityName(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityNameResponse> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityName`, {
            params: this._createParams(opts)
        }).then((value) => {
            return value.data as IMasterEntitySourceEntityNameResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getMasterEntitySourceEntityAddress(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityAddressResponse> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityAddress`, {
            params: this._createParams(opts)
        }).then((value) => {
            return value.data as IMasterEntitySourceEntityAddressResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getMasterEntitySourceEntityPhone(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityPhoneResponse> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityPhone`, {
            params: this._createParams(opts)
        }).then((value) => {
            return value.data as IMasterEntitySourceEntityPhoneResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
    getMasterEntitySourceEntityCredential(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityCredentialResponse> {
        return axios.get(`${this.config.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityCredential`, {
            params: this._createParams(opts)
        }).then((value) => {
            return value.data as IMasterEntitySourceEntityCredentialResponse;
        }).catch(DefaultHttpErrorHandler.handleAxiosError);
    }
}

export { RestMasterEntityDataService as default, RestMasterEntityDataService };

