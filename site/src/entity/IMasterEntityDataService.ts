import IMasterEntitySourceRef from "./IMasterEntitySourceRef";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";

interface IMasterEntityServiceResponse {
    errors?: any;
    totalrecords?: number;
}

interface IMasterEntitySourceRefResponse extends IMasterEntityServiceResponse {
    getMasterEntitySourceResponse?: IMasterEntitySourceRef[];
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
    getMasterEntitySourceRef(masterEntityId: string, opts?: IMasterEntityServiceRequestOptions) : Promise<IMasterEntitySourceRefResponse>;
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
    IMasterEntitySourceRefResponse,
    IMasterEntitySourceEntityMetaResponse,
    IMasterEntitySourceEntityNameResponse,
    IMasterEntitySourceEntityAddressResponse,
    IMasterEntitySourceEntityPhoneResponse,
    IMasterEntitySourceEntityCredentialResponse
};