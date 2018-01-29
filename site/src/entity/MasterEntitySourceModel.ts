import { observable, action, computed } from "mobx";
import IMasterEntityModel from "./IMasterEntityModel";
import IMasterEntitySource from "./IMasterEntitySource";
import IMasterEntitySourceModel from "./IMasterEntitySourceModel";
import IMasterEntitySourceEntity from "./IMasterEntitySourceEntity";
import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import * as EntityNameUtils from "./EntityNameUtils";
import * as StringUtils from "util/String";
import { Data as DateDataFormats } from "common/DateFormats";
import * as moment from "moment";
import * as DateUtils from "util/Date";
import IEntityAttributeActions from "./IEntityAttributeActions";

class MasterEntitySourceModel implements IMasterEntitySourceModel {
    @observable.ref private _masterEntity : IMasterEntityModel;
    @observable sourceSystemCode: string;
    @observable sourceEntities: IMasterEntitySourceEntity[] = [];
    @observable private _state : any = {};

    constructor(masterEntity : IMasterEntityModel, data?: IMasterEntitySource) {
        this._masterEntity = masterEntity;
        this.setData(data);
    }

    @computed
    get masterEntity() {
        return this._masterEntity;
    }

    @computed
    get masterEntityId() {
        return this._masterEntity ? this._masterEntity.masterEntityId : undefined;
    }

    @computed
    get state() {
        return this._state;
    }
    set state(value) {
        this.setState(value);
    }

    @action
    setState(state : any) {
        this._state = Object.assign({}, this._state, state);
    }

    @computed
    get data() {
        return {
            sourceSystemCode: this.sourceSystemCode,
            sourceEntities: this.sourceEntities.slice(0)
        }
    }

    @action
    setData(data : IMasterEntitySource) {
        if(data) {
            this.sourceSystemCode = data.sourceSystemCode;
            this.sourceEntities = data.sourceEntities || [];
        } else {
            this.sourceSystemCode = data.sourceSystemCode;
            this.sourceEntities = [];
        }
    }

    @computed
    get names() : IMasterEntitySourceEntityName[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityName[] = [];
        this.sourceEntities.forEach((source) => {
            source.names.forEach((name) => {
                if(!dup[name.standardFullName]) {
                    dup[name.standardFullName] = name;
                    r.push(name);
                }
            });
        });
        return r;
    }

    @computed
    get name() : IMasterEntitySourceEntityName {
        let r : IMasterEntitySourceEntityName;
        let score = 0;
        this.sourceEntities.forEach((source) => {
            return source.names.forEach((name) => {
                const nameScore = EntityNameUtils.getNameScore(name, this.isPerson);
                if(nameScore > score) {
                    score = nameScore;
                    r = name;
                } else if(nameScore === score && EntityNameUtils.isMainName(name)) {
                    r = name;
                }
            })
        });
        
        if(!r) {
            const mainName = this.names.find(EntityNameUtils.isMainName);
            if(mainName) {
                r = mainName;
            }
        }

        if(!r && this.names.length > 0) {
            r = this.names[0];
        }
        return r;
    }

    @computed
    get addresses() : IMasterEntitySourceEntityAddress[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityAddress[] = [];
        this.sourceEntities.forEach((source) => {
            source.addresses.forEach((address) => {
                if(!dup[address.standardAddressValue]) {
                    dup[address.standardAddressValue] = address;
                    r.push(address);
                }
            })
        });
        return r;
    }

    @computed
    get phones() : IMasterEntitySourceEntityPhone[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityPhone[] = [];
        this.sourceEntities.forEach((source) => {
            source.phones.forEach((phone) => {
                if(!dup[phone.phoneNumber]) {
                    dup[phone.phoneNumber] = phone;
                    r.push(phone);
                }
            })
        });
        return r;
    }

    @computed
    get credentials() : IMasterEntitySourceEntityCredential[] {
        const dup : { [key: string] : any } = {};
        const r : IMasterEntitySourceEntityCredential[] = [];
        this.sourceEntities.forEach((source) => {
            source.credentials.forEach((cred) => {
                if(!dup[cred.credentialTypeCd + cred.credentialValue]) {
                    dup[cred.credentialTypeCd + cred.credentialValue] = cred;
                    r.push(cred);
                }
            })
        });
        return r;
    }

    private _isPerson(sourceEntity : IMasterEntitySourceEntity) {
        return sourceEntity.meta && StringUtils.equalsIgnoreCase(sourceEntity.meta.entityTypeCd, "IND");
    }

    private _isOrganisation(sourceEntity : IMasterEntitySourceEntity) {
        return sourceEntity.meta && StringUtils.equalsIgnoreCase(sourceEntity.meta.entityTypeCd, "ORG");
    }

    @computed
    get personalMetas() : IMasterEntitySourceEntityMeta[] {
        const dup : { [key: string] : any } = {};
        let r : IMasterEntitySourceEntityMeta[] = [];
        this.sourceEntities.filter(this._isPerson, this).forEach((source) => {
            if(source.meta && !dup[source.meta.birthDt + source.meta.birthCountryCd + source.meta.sex]) {
                dup[source.meta.birthDt + source.meta.birthCountryCd + source.meta.sex] = source.meta;
                r.push(source.meta);
            }
        });
        return r;
    }

    @computed
    get dateOfBirth() : Date {
        const meta = this.personalMetas.find((meta) => {
            return meta && StringUtils.isNotBlank(meta.birthDt);
        });
        const m = meta ? DateUtils.momentFromDataText(meta.birthDt) : undefined;
        return m && m.isValid() ? m.toDate() : undefined;
    }

    @computed
    get gender() : string {
        const meta = this.personalMetas.find((meta) => {
            return meta && StringUtils.isNotBlank(meta.sex);
        });
        return meta && !StringUtils.equalsIgnoreCase(meta.sex, "NA") ? meta.sex : undefined;
    }

    @computed
    get isPerson() : boolean {
        return this.sourceEntities.some(this._isPerson, this);
    }

    @computed
    get isOrganisation() : boolean {
        return this.sourceEntities.some(this._isOrganisation, this);
    }

    @computed
    get attributeActions() : IEntityAttributeActions {
        return this.masterEntity ? this.masterEntity.attributeActions : undefined;
    }

    toJSON() {
        return this.data;
    }
}

export { MasterEntitySourceModel as default, MasterEntitySourceModel };