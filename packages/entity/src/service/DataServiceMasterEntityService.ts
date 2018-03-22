import { IMasterEntityService, IGetMasterEntityByIdRequest } from "./IMasterEntityService";
import { IMasterEntityDataService } from "./IMasterEntityDataService";
import { MasterEntityDataServiceContext } from "./MasterEntityDataServiceContext";
import { IMasterEntity } from "../IMasterEntity";
import { IMasterEntitySource } from "../IMasterEntitySource";
import { IMasterEntitySourceEntity } from "../IMasterEntitySourceEntity";
import { IMasterEntitySourceEntityKey } from "../IMasterEntitySourceEntityKey";
import { IMasterEntitySourceEntityRef } from "../IMasterEntitySourceEntityRef";
import { IMasterEntitySourceEntityMeta } from "../IMasterEntitySourceEntityMeta";
import { IMasterEntitySourceEntityName } from "../IMasterEntitySourceEntityName";
import { IMasterEntitySourceEntityAddress } from "../IMasterEntitySourceEntityAddress";
import { IMasterEntitySourceEntityPhone } from "../IMasterEntitySourceEntityPhone";
import { IMasterEntitySourceEntityCredential } from "../IMasterEntitySourceEntityCredential";
import { noResultErrorCode } from "./DataServiceHelper";

class DataServiceMasterEntityService implements IMasterEntityService {
    private _dataService : IMasterEntityDataService;
    get dataService() : IMasterEntityDataService {
        return this._dataService || MasterEntityDataServiceContext.value;
    }
    set dataService(value : IMasterEntityDataService) {
        this._dataService = value;
    }
    private _getMaster(key : IMasterEntitySourceEntityKey, state : any) : IMasterEntity {
        let master = state[key.masterEntityId];
        if(!master) {
            master = { masterEntityId: key.masterEntityId, sources: [] };
            state[key.masterEntityId] = master;
        }
        return master;
    }
    private _getSource(key : IMasterEntitySourceEntityKey, state : any) {
        let src : IMasterEntitySource = state[key.sourceSystemCd];
        if(!src) {
            src = { masterEntityId: key.masterEntityId, sourceSystemCode: key.sourceSystemCd, sourceEntities: [] };
            this._getMaster(key, state).sources.push(src);
            state[key.sourceSystemCd] = src;
        }
        return src;
    }
    private _getSourceEntity(key : IMasterEntitySourceEntityKey, state : any) {
        const src = this._getSource(key, state);
        let sourceEntity = src.sourceEntities.find((e) => {
            return e.sourceEntityId === key.sourceEntityId;
        });
        if(!sourceEntity) {
            sourceEntity = {
                sourceSystemCd: key.sourceSystemCd,
                sourceEntityId: key.sourceEntityId,
                names: [],
                addresses: [],
                credentials: [],
                phones: []
            };
            src.sourceEntities.push(sourceEntity);
        }
        return sourceEntity;
    }
    private _mergeMeta(meta : IMasterEntitySourceEntityMeta, state : any) {
        this._getSourceEntity(meta, state).meta = meta;
    }
    private _mergeRef(ref : IMasterEntitySourceEntityRef, state : any) {
        this._getSourceEntity(ref, state).ref = ref;
    }
    private _mergeName(name : IMasterEntitySourceEntityName, state : any) {
        const nameKey = "name:" + name.sourceSystemCd + name.sourceEntityId + name.sourceEntityNameId;
        if(!state[nameKey]) {
            state[nameKey] = name;
            this._getSourceEntity(name, state).names.push(name);
        }
    }
    private _mergeAddress(address : IMasterEntitySourceEntityAddress, state : any) {
        const addressKey = "addr:" + address.sourceSystemCd + address.sourceEntityId + address.sourceEntityAddressId;
        if(!state[addressKey]) {
            state[addressKey] = address;
            this._getSourceEntity(address, state).addresses.push(address);
        }
    }
    private _mergePhone(phone : IMasterEntitySourceEntityPhone, state : any) {
        const phoneKey = "phone:" + phone.sourceSystemCd + phone.sourceEntityId + phone.sourceEntityPhoneId;
        if(!state[phoneKey]) {
            state[phoneKey] = phone;
            this._getSourceEntity(phone, state).phones.push(phone);
        }
    }
    private _mergeCredential(credential : IMasterEntitySourceEntityCredential, state : any) {
        const credentialKey = "cred:" + credential.sourceSystemCd + credential.sourceEntityId + credential.sourceEntityCredentialId;
        if(!state[credentialKey]) {
            state[credentialKey] = credential;
            this._getSourceEntity(credential, state).credentials.push(credential);
        }
    }
    getMasterEntityById(request : IGetMasterEntityByIdRequest) : Promise<IMasterEntity> {
        const state : { [key: number] : IMasterEntity } = {};
        const ds = MasterEntityDataServiceContext.value;
        return Promise.all([
            ds.getMasterEntitySourceEntityRef(request.masterEntityId).then(value => {
                if(value.errors && value.errors.code !== noResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceResponse) {
                    value.getMasterEntitySourceResponse.forEach(item => {
                        this._mergeRef(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityMeta(request.masterEntityId).then(value => {
                if(value.errors && value.errors.code !== noResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityResponse) {
                    value.getMasterEntitySourceEntityResponse.forEach(item => {
                        this._mergeMeta(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityName(request.masterEntityId).then(value => {
                if(value.errors && value.errors.code !== noResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityNameResponse) {
                    value.getMasterEntitySourceEntityNameResponse.forEach(item => {
                        this._mergeName(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityAddress(request.masterEntityId).then(value => {
                if(value.errors && value.errors.code !== noResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityAddressResponse) {
                    value.getMasterEntitySourceEntityAddressResponse.forEach(item => {
                        this._mergeAddress(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityPhone(request.masterEntityId).then(value => {
                if(value.errors && value.errors.code !== noResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityPhoneResponse) {
                    value.getMasterEntitySourceEntityPhoneResponse.forEach(item => {
                        this._mergePhone(item, state);
                    })
                }
            }),
            ds.getMasterEntitySourceEntityCredential(request.masterEntityId).then(value => {
                if(value.errors && value.errors.code !== noResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityCredentialResponse) {
                    value.getMasterEntitySourceEntityCredentialResponse.forEach(item => {
                        this._mergeCredential(item, state);
                    })
                }
            })
        ]).then(() => {
            const r = state[request.masterEntityId];
            if(!r) {
                return Promise.reject({ status: 404, code: "NOT_FOUND", message: `Unable to find master entity by id: ${request.masterEntityId}` });
            }
            return Promise.resolve(r);
        });
    }
}

export { DataServiceMasterEntityService as default, DataServiceMasterEntityService };