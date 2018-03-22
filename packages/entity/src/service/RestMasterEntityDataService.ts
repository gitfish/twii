import axios from "axios";
import {
    IMasterEntityDataService,
    IMasterEntityServiceRequestOptions,
    IMasterEntitySourceEntityRefResponse,
    IMasterEntitySourceEntityMetaResponse,
    IMasterEntitySourceEntityNameResponse,
    IMasterEntitySourceEntityAddressResponse,
    IMasterEntitySourceEntityPhoneResponse,
    IMasterEntitySourceEntityCredentialResponse
} from "./IMasterEntityDataService";

const Defaults = {
    baseUrl: "/DataServices",
    maxNoOfRecords: 1000
};

class RestMasterEntityDataService implements IMasterEntityDataService {
    private _baseUrl : string;
    private _maxNoOfRecords : number;
    get baseUrl() {
        return this._baseUrl || Defaults.baseUrl;
    }
    set baseUrl(value : string) {
        this._baseUrl = value;
    }
    get maxNoOfRecords() {
        return this._maxNoOfRecords && this._maxNoOfRecords > 0 ? this._maxNoOfRecords : Defaults.maxNoOfRecords;
    }
    set maxNoRecords(maxNoOfRecords : number) {
        this._maxNoOfRecords = maxNoOfRecords;
    }
    private _createParams(opts?: IMasterEntityServiceRequestOptions) : any {
        return {
            maxNoOfRecords: opts && opts.maxNoOfRecords > 0 ? opts.maxNoOfRecords : this.maxNoOfRecords
        };
    }
    getMasterEntitySourceEntityRef(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityRefResponse> {
        return axios.get(`${this.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}`, {
            params: this._createParams(opts)
        }).then(value => {
            return value.data as IMasterEntitySourceEntityRefResponse;
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
    getMasterEntitySourceEntityMeta(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityMetaResponse> {
        return axios.get(`${this.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/Entity`, {
            params: this._createParams(opts)
        }).then(value => {
            return value.data as IMasterEntitySourceEntityMetaResponse;
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
    getMasterEntitySourceEntityName(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityNameResponse> {
        return axios.get(`${this.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityName`, {
            params: this._createParams(opts)
        }).then(value => {
            return value.data as IMasterEntitySourceEntityNameResponse;
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
    getMasterEntitySourceEntityAddress(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityAddressResponse> {
        return axios.get(`${this.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityAddress`, {
            params: this._createParams(opts)
        }).then(value => {
            return value.data as IMasterEntitySourceEntityAddressResponse;
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
    getMasterEntitySourceEntityPhone(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityPhoneResponse> {
        return axios.get(`${this.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityPhone`, {
            params: this._createParams(opts)
        }).then(value => {
            return value.data as IMasterEntitySourceEntityPhoneResponse;
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
    getMasterEntitySourceEntityCredential(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityCredentialResponse> {
        return axios.get(`${this.baseUrl}/resources/masterEntitySource/${encodeURIComponent(masterEntityId)}/EntityCredential`, {
            params: this._createParams(opts)
        }).then(value => {
            return value.data as IMasterEntitySourceEntityCredentialResponse;
        })/*.catch(DefaultHttpErrorHandler.handleAxiosError)*/;
    }
}

export { RestMasterEntityDataService, Defaults };

