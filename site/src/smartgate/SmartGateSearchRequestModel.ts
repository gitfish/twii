import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";
import { ISmartGateSearchRequestModel } from "./ISmartGateSearchRequestModel";
import { observable, computed, action } from "mobx";
import * as DateUtils from "util/Date";
import * as moment from "moment";

class SmartGateSearchRequestModel implements ISmartGateSearchRequestModel {
    @observable firstName: string;
    @observable familyName: string;
    @observable gender: string;
    @observable travelDocId: string;
    @observable dateOfBirthMoment: moment.Moment;

    @action
    setFirstName(firstName : string) : void {
        this.firstName = firstName;
    }

    @action
    setFamilyName(familyName : string) : void {
        this.familyName = familyName;
    }

    @action
    setDateOfBirthMoment(dateOfBirthMoment : moment.Moment) : void {
        this.dateOfBirthMoment = dateOfBirthMoment;
    }

    @action
    setGender(gender : string) : void {
        this.gender = gender;
    }

    @action
    setTravelDocId(travelDocId : string) : void {
        this.travelDocId = travelDocId;
    }

    @computed
    get dateOfBirth() {
        return DateUtils.momentToDataText(this.dateOfBirthMoment);
    }
    set dateOfBirth(value) {
        this.setDateOfBirth(value);
    }
    
    @action
    setDateOfBirth(dateOfBirth : string) {
        this.setDateOfBirthMoment(DateUtils.momentFromDataText(dateOfBirth));
    }

    @computed
    get request() : ISmartGateSearchRequest {
        return {
            firstName: this.firstName,
            familyName: this.familyName,
            dateOfBirth: this.dateOfBirth,
            gender: this.gender,
            travelDocId : this.travelDocId
        };
    }
    set request(value) {
        this.setRequest(value);
    }

    @action
    setRequest(request : ISmartGateSearchRequest) : void {
        this.setFirstName(request ? request.firstName : undefined);
        this.setFamilyName(request ? request.familyName : undefined);
        this.setDateOfBirth(request ? request.dateOfBirth : undefined);
        this.setGender(request ? request.gender : undefined);
        this.setTravelDocId(request ? request.travelDocId : undefined);
    }

    @action
    submit(requestHandler?: (request : ISmartGateSearchRequest) => void) {
        // validate

        if(requestHandler) {
            requestHandler(this.request);
        }
    }

    @action
    clear() : void {
        this.firstName = undefined;
        this.familyName = undefined;
        this.gender = undefined;
        this.travelDocId = undefined;
        this.dateOfBirthMoment = undefined;
    }
}

export { SmartGateSearchRequestModel }