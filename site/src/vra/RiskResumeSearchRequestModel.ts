import { observable, action, computed } from "mobx";
import IRiskResumeSearchRequestModel from "./IRiskResumeSearchRequestModel";
import IRiskResumeSearchRequest from "./IRiskResumeSearchRequest";
import IError from "common/IError";
import * as StringUtils from "util/String";

class RiskResumeSearchRequestModel implements IRiskResumeSearchRequestModel {
    @observable validationErrors?: IError[] = [];
    @observable idType?: string;
    @observable id?: string;

    @computed
    get isValid() {
        return this.validationErrors.length === 0;
    }

    @computed
    get isValueSpecified() {
        return StringUtils.isNotBlank(this.idType) &&
               StringUtils.isNotBlank(this.id);
    }

    @action
    setIdType(idType?: string) : void {
        this.idType = idType;
    }

    @action
    setId(id?: string) : void {
        this.id = id;
    }

    @action
    validate() {
        this.validationErrors = [];
        if(!this.isValueSpecified) {
            this.validationErrors.push({ message: "A value must be specified"});
        } else {
            if(StringUtils.isNotBlank(this.id) && !StringUtils.every(this.id, StringUtils.filters.isDigit)) {
                this.validationErrors.push({ prop: "id", propTitle: "ID", message: "ID must contain only numbers"});
            }
        }
    }

    @computed
    get request(): IRiskResumeSearchRequest {
        return {
            idType: StringUtils.isNotBlank(this.idType) ? this.idType : undefined,
            id: StringUtils.isNotBlank(this.id) ? this.id : undefined
        } as IRiskResumeSearchRequest;
    }

    @action
    submit(requestHandler: (request: IRiskResumeSearchRequest) => void) {
        this.validate();
        if(this.isValid && requestHandler) {
            requestHandler(this.request);
        }
    }

    @action
    clear(): void {
        this.idType = undefined;
        this.id = undefined;
    }
}

export { RiskResumeSearchRequestModel as default, RiskResumeSearchRequestModel };