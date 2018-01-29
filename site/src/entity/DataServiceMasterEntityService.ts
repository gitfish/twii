import IMasterEntityService from "./IMasterEntityService";
import MasterEntityDataServiceContext from "./MasterEntityDataServiceContext";
import IMasterEntity from "./IMasterEntity";
import IMasterEntitySource from "./IMasterEntitySource";
import IMasterEntitySourceEntity from "./IMasterEntitySourceEntity";
import IMasterEntitySourceKey from "./IMasterEntitySourceKey";
import IMasterEntitySourceRef from "./IMasterEntitySourceRef";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";
import NoResultErrorCode from "common/AbstractRestDataService";

class DataServiceMasterEntityService implements IMasterEntityService {
    private _getMaster(key : IMasterEntitySourceKey, state : any) : IMasterEntity {
        let master = state[key.masterEntityId];
        if(!master) {
            master = { masterEntityId: key.masterEntityId, sources: [] };
            state[key.masterEntityId] = master;
        }
        return master;
    }
    private _getSource(key : IMasterEntitySourceKey, state : any) {
        let src : IMasterEntitySource = state[key.sourceSystemCd];
        if(!src) {
            src = { masterEntityId: key.masterEntityId, sourceSystemCode: key.sourceSystemCd, sourceEntities: [] };
            this._getMaster(key, state).sources.push(src);
            state[key.sourceSystemCd] = src;
        }
        return src;
    }
    private _getSourceEntity(key : IMasterEntitySourceKey, state : any) {
        const src = this._getSource(key, state);
        let sourceEntity = src.sourceEntities.find((e) => {
            return e.sourceEntityId === key.sourceEntityId;
        });
        if(!sourceEntity) {
            sourceEntity = {
                sourceSystemCode: key.sourceSystemCd,
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
    private _mergeRef(ref : IMasterEntitySourceRef, state : any) {
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
    getMasterEntityById(masterEntityId: string) : Promise<IMasterEntity> {
        const state : { [key: number] : IMasterEntity } = {};
        const ds = MasterEntityDataServiceContext.value;
        return Promise.all([
            ds.getMasterEntitySourceRef(masterEntityId).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceResponse) {
                    value.getMasterEntitySourceResponse.forEach((item) => {
                        this._mergeRef(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityMeta(masterEntityId).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityResponse) {
                    value.getMasterEntitySourceEntityResponse.forEach((item) => {
                        this._mergeMeta(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityName(masterEntityId).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityNameResponse) {
                    value.getMasterEntitySourceEntityNameResponse.forEach((item) => {
                        this._mergeName(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityAddress(masterEntityId).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityAddressResponse) {
                    value.getMasterEntitySourceEntityAddressResponse.forEach((item) => {
                        this._mergeAddress(item, state);
                    });
                }
            }),
            ds.getMasterEntitySourceEntityPhone(masterEntityId).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityPhoneResponse) {
                    value.getMasterEntitySourceEntityPhoneResponse.forEach((item) => {
                        this._mergePhone(item, state);
                    })
                }
            }),
            ds.getMasterEntitySourceEntityCredential(masterEntityId).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.getMasterEntitySourceEntityCredentialResponse) {
                    value.getMasterEntitySourceEntityCredentialResponse.forEach((item) => {
                        this._mergeCredential(item, state);
                    })
                }
            })
        ]).then(() => {
            const r = state[masterEntityId];
            if(!r) {
                return Promise.reject({ status: 404, code: "NOT_FOUND", message: `Unable to find master entity by id: ${masterEntityId}` });
            }
            return Promise.resolve(r);
        });
    }
}

export { DataServiceMasterEntityService as default, DataServiceMasterEntityService };