import { IMasterEntitySourceEntityRef } from "../IMasterEntitySourceEntityRef";
import { IMasterEntitySourceEntityMeta } from "../IMasterEntitySourceEntityMeta";
import { IMasterEntitySourceEntityName } from "../IMasterEntitySourceEntityName";
import { IMasterEntitySourceEntityAddress } from "../IMasterEntitySourceEntityAddress";
import { IMasterEntitySourceEntityPhone } from "../IMasterEntitySourceEntityPhone";
import { IMasterEntitySourceEntityCredential } from "../IMasterEntitySourceEntityCredential";

interface IMasterEntityServiceResponse {
    errors?: any;
    totalrecords?: number;
}

interface IMasterEntitySourceEntityRefResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceResponse?: IMasterEntitySourceEntityRef[];
}

interface IMasterEntitySourceEntityMetaResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceEntityResponse?: IMasterEntitySourceEntityMeta[];
}

interface IMasterEntitySourceEntityNameResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceEntityNameResponse?: IMasterEntitySourceEntityName[];
}

interface IMasterEntitySourceEntityAddressResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceEntityAddressResponse?: IMasterEntitySourceEntityAddress[];
}

interface IMasterEntitySourceEntityPhoneResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceEntityPhoneResponse?: IMasterEntitySourceEntityPhone[];
}

interface IMasterEntitySourceEntityCredentialResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceEntityCredentialResponse?: IMasterEntitySourceEntityCredential[];
}

interface IMasterEntityServiceRequestOptions {
    maxNoOfRecords?: number;
}

interface IMasterEntityDataService {
    getMasterEntitySourceEntityRef(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityRefResponse>;
    getMasterEntitySourceEntityMeta(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityMetaResponse>;
    getMasterEntitySourceEntityName(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityNameResponse>;
    getMasterEntitySourceEntityAddress(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityAddressResponse>;
    getMasterEntitySourceEntityPhone(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityPhoneResponse>;
    getMasterEntitySourceEntityCredential(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceEntityCredentialResponse>;
}

export {
    IMasterEntityDataService as default,
    IMasterEntityDataService,
    IMasterEntityServiceResponse,
    IMasterEntityServiceRequestOptions,
    IMasterEntitySourceEntityRefResponse,
    IMasterEntitySourceEntityMetaResponse,
    IMasterEntitySourceEntityNameResponse,
    IMasterEntitySourceEntityAddressResponse,
    IMasterEntitySourceEntityPhoneResponse,
    IMasterEntitySourceEntityCredentialResponse
};