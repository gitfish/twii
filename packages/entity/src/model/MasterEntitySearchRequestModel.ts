import { observable, action, computed } from "mobx";
import { IMasterEntitySearchRequest } from "../IMasterEntitySearchRequest";
import { IMasterEntitySearchRequestModel } from "./IMasterEntitySearchRequestModel";
import { IError } from "@twii/common/lib/IError";
import { isValidMoment } from "@twii/common/lib/MomentUtils";
import { momentFromDataString, momentToDataString } from "@twii/common/lib/MomentDataUtils";
import { isBlank, isNotBlank } from "@twii/common/lib/StringUtils";
import * as moment from "moment";

class MasterEntitySearchRequestModel implements IMasterEntitySearchRequestModel {
    @observable validationErrors?: IError[] = [];
    @observable fullName?: string;
    @observable emailAddress?: string;
    @observable credentialType?: string;
    @observable credential?: string;
    @observable firstName?: string;
    @observable middleName?: string;
    @observable familyName?: string;
    @observable dobMoment?: moment.Moment;
    @observable sex?: string;
    @observable fullAddress?: string;
    @observable unitNumber?: string;
    @observable streetNumber?: string;
    @observable streetName?: string;
    @observable streetType?: string;
    @observable locality?: string;
    @observable state?: string;
    @observable postcode?: string;
    @observable phone?: string;

    @observable entityOn: boolean = true;
    @observable personOn: boolean = false;
    @observable credentialOn: boolean = false;
    @observable addressOn: boolean = false;
    @observable contactOn: boolean = false;

    @computed
    get isValid() {
        return this.validationErrors.length === 0;
    }

    @computed
    get isValueSpecified() {
        return this.isEntitySpecified ||
               this.isPersonSpecified ||
               this.isAddressSpecified ||
               this.isContactSpecified ||
               this.isCredentialSpecified;
    }

    @action
    setFullName(fullName?: string) : void {
        this.fullName = fullName;
        if(isNotBlank(fullName)) {
            this.firstName = undefined;
            this.middleName = undefined;
            this.familyName = undefined;
        }
    }

    @action
    setEmail(email?: string) : void {
        this.emailAddress = email;
    }

    @action
    setEmailAddress(emailAddress?: string) : void {
        this.emailAddress = emailAddress;
    }

    @action
    setCredentialType(credentialType?: string) : void {
        this.credentialType = credentialType;
    }

    @action
    setCredential(credential?: string) : void {
        this.credential = credential;
    }

    @action
    setFirstName(firstName?: string) : void {
        this.firstName = firstName;
        if(isNotBlank(firstName)) {
            this.fullName = undefined;
        }
    }

    @action
    setMiddleName(middleName?: string) : void {
        this.middleName = middleName;
        if(isNotBlank(middleName)) {
            this.fullName = undefined;
        }
    }

    @action
    setFamilyName(familyName?: string) : void {
        this.familyName = familyName;
        if(isNotBlank(familyName)) {
            this.fullName = undefined;
        }
    }

    @computed
    get dob() {
        return momentToDataString(this.dobMoment);
    }
    set dob(value : string) {
        this.setDob(value);
    }

    @action
    setDob(dob : string) {
        this.setDobMoment(momentFromDataString(dob));
    }

    @action
    setDobMoment(dobMoment?: moment.Moment) : void {
        this.dobMoment = dobMoment;
    }

    @action
    setSex(sex?: string) : void {
        this.sex = sex;
    }

    @action
    setFullAddress(fullAddress?: string) : void {
        this.fullAddress = fullAddress;
        if(isNotBlank(fullAddress)) {
            this.unitNumber = undefined;
            this.streetNumber = undefined;
            this.streetName = undefined;
            this.streetType = undefined;
            this.locality = undefined;
            this.state = undefined;
            this.postcode = undefined;
        }
    }

    @action
    setUnitNumber(unitNumber?: string) : void {
        this.unitNumber = unitNumber;
        if(isNotBlank(unitNumber)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setStreetNumber(streetNumber?: string) : void {
        this.streetNumber = streetNumber;
        if(isNotBlank(streetNumber)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setStreetName(streetName?: string) : void {
        this.streetName = streetName;
        if(isNotBlank(streetName)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setStreetType(streetType?: string) : void {
        this.streetType = streetType;
        if(isNotBlank(streetType)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setLocality(locality?: string) : void {
        this.locality = locality;
        if(isNotBlank(locality)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setState(state?: string) : void {
        this.state = state;
        if(isNotBlank(state)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setPostcode(postcode?: string) : void {
        this.postcode = postcode;
        if(isNotBlank(postcode)) {
            this.fullAddress = undefined;
        }
    }

    @action
    setPhone(phone?: string) : void {
        this.phone = phone;
    }

    @action
    setEntityOn(entityOn : boolean) : void {
        this.entityOn = entityOn;
    }

    @action
    setPersonOn(personOn : boolean) : void {
        this.personOn = personOn;
    }

    @action
    setCredentialOn(credentialOn : boolean) : void {
        this.credentialOn = credentialOn;
    }

    @action
    setAddressOn(addressOn : boolean) : void {
        this.addressOn = addressOn;
    }

    @action
    setContactOn(contactOn : boolean) : void {
        this.contactOn = contactOn;
    }

    @computed
    get isEntitySpecified() {
        return isNotBlank(this.fullName);
    }

    @action
    clearEntity() {
        this.fullName = undefined;
    }

    @computed
    get isPersonSpecified() {
        return isNotBlank(this.firstName) ||
                isNotBlank(this.middleName) ||
                isNotBlank(this.familyName) ||
                isValidMoment(this.dobMoment) ||
                isNotBlank(this.sex);
    }

    @action
    clearPerson() {
        this.firstName = undefined;
        this.middleName = undefined;
        this.familyName = undefined;
        this.dobMoment = undefined;
        this.sex = undefined;
    }

    @computed
    get isAddressSpecified() {
        return isNotBlank(this.fullAddress) ||
               isNotBlank(this.unitNumber) ||
               isNotBlank(this.streetNumber) ||
               isNotBlank(this.streetName) ||
               isNotBlank(this.streetType) ||
               isNotBlank(this.locality) ||
               isNotBlank(this.state) ||
               isNotBlank(this.postcode);
    }

    @action
    clearAddress() {
        this.fullAddress = undefined;
        this.unitNumber = undefined;
        this.streetNumber = undefined;
        this.streetName = undefined;
        this.streetType = undefined;
        this.locality = undefined;
        this.state = undefined;
        this.postcode = undefined;
    }

    @computed
    get isContactSpecified() {
        return isNotBlank(this.phone) || isNotBlank(this.emailAddress);
    }

    @action
    clearContact() {
        this.phone = undefined;
        this.emailAddress = undefined;
    }

    @computed
    get isCredentialSpecified() {
        return isNotBlank(this.credentialType) || isNotBlank(this.credential);
    }

    @action
    clearCredential() {
        this.credentialType = undefined;
        this.credential = undefined;
    }

    @computed
    get request() : IMasterEntitySearchRequest {
        return {
            fullName: this.entityOn && isNotBlank(this.fullName) ? this.fullName : undefined,
            firstName: this.personOn && isNotBlank(this.firstName) ? this.firstName : undefined,
            middleName: this.personOn && isNotBlank(this.middleName) ? this.middleName : undefined,
            familyName: this.personOn && isNotBlank(this.familyName) ? this.familyName : undefined,
            dob: this.personOn && isValidMoment(this.dobMoment) ? this.dob : undefined,
            sex: this.personOn && isNotBlank(this.sex) ? this.sex : undefined,
            fullAddress: this.addressOn && isNotBlank(this.fullAddress) ? this.fullAddress : undefined,
            unitnNo: this.addressOn && isNotBlank(this.unitNumber) ? this.unitNumber : undefined,
            streetNo: this.addressOn && isNotBlank(this.streetNumber) ? this.streetNumber : undefined,
            streetName: this.addressOn && isNotBlank(this.streetName) ? this.streetName : undefined,
            streetType: this.addressOn && isNotBlank(this.streetType) ? this.streetType : undefined,
            locality: this.addressOn && isNotBlank(this.locality) ? this.locality : undefined,
            state: this.addressOn && isNotBlank(this.state) ? this.state : undefined,
            postCode: this.addressOn && isNotBlank(this.postcode) ? this.postcode : undefined,
            phoneNumber: this.contactOn && isNotBlank(this.phone) ? this.phone : undefined,
            emailAddress: this.contactOn && isNotBlank(this.emailAddress) ? this.emailAddress : undefined,
            credentialType: this.credentialOn && isNotBlank(this.credentialType) ? this.credentialType : undefined,
            credential: this.credentialOn && isNotBlank(this.credential) ? this.credential : undefined
        };
    }

    set request(request : IMasterEntitySearchRequest) {
        this.setRequest(request);   
    }

    @action
    setRequest(request : IMasterEntitySearchRequest) {
        if(request) {
            this.setFullName(request.fullName);
            this.setFirstName(request.firstName);
            this.setMiddleName(request.middleName);
            this.setFamilyName(request.familyName);
            this.setDob(request.dob);
            this.setSex(request.sex);
            this.setFullAddress(request.fullAddress);
            this.setUnitNumber(request.unitnNo);
            this.setStreetNumber(request.streetNo);
            this.setStreetName(request.streetName);
            this.setStreetType(request.streetType);
            this.setLocality(request.locality);
            this.setState(request.state);
            this.setPostcode(request.postCode);
            this.setPhone(request.phoneNumber);
            this.setEmailAddress(request.emailAddress);
            this.setCredentialType(request.credentialType);
            this.setCredential(request.credential);
            this.setEntityOn(this.isEntitySpecified);
            this.setPersonOn(this.isPersonSpecified);
            this.setAddressOn(this.isAddressSpecified);
            this.setContactOn(this.isContactSpecified);
            this.setCredentialOn(this.isCredentialSpecified);
        } else {
            this.clear();
        }
    }

    @action
    validate() {
        this.validationErrors = [];
        if(!this.isValueSpecified) {
            this.validationErrors.push({ message: "A value must be specified"});
        } else {
            if(this.personOn && this.dobMoment && !isValidMoment(this.dobMoment)) {
                this.validationErrors.push({ key: "dobMoment", keyTitle: "Date of Birth", message: "Invalid Date: " + this.dobMoment.creationData().input });
            }

            if(this.credentialOn && isNotBlank(this.credential) && isBlank(this.credentialType)) {
                this.validationErrors.push({ key: "credentialType", keyTitle: "Credential Type", message: "A credential type must be specified"});
            }
        }
    }

    @action
    submit(requestHandler?: (request : IMasterEntitySearchRequest) => void) {
        this.validate();
        if(this.isValid && requestHandler) {
            requestHandler(this.request);
        }
    }

    @action
    clearValidation() {
        this.validationErrors = [];
    }

    @action
    clear(): void {
        this.clearValidation();
        this.clearEntity();
        this.clearPerson();
        this.clearAddress();
        this.clearContact();
        this.clearCredential();
    }
}

export { MasterEntitySearchRequestModel as default, MasterEntitySearchRequestModel };