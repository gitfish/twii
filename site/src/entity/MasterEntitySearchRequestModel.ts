import { observable, action, computed } from "mobx";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IMasterEntitySearchRequestModel from "./IMasterEntitySearchRequestModel";
import IError from "common/IError";
import * as DateUtils from "util/Date";
import { Input as DateInputFormats } from "common/DateFormats";
import * as StringUtils from "util/String";
import * as moment from "moment";

class MasterEntitySearchRequestModel implements IMasterEntitySearchRequestModel {
    @observable validationErrors?: IError[] = [];
    @observable id?: string;
    @observable fullName?: string;
    @observable emailAddress?: string;
    @observable credentialType?: string;
    @observable credential?: string;
    @observable firstName?: string;
    @observable middleName?: string;
    @observable familyName?: string;
    @observable dob?: moment.Moment;
    @observable gender?: string;
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
    setId(id?: string) : void {
        this.id = id;
        if(StringUtils.isNotBlank(id)) {
            this.fullName = undefined;
            this.clearPerson();
            this.clearAddress();
            this.clearContact();
            this.clearCredential();
        }
    }

    @action
    setFullName(fullName?: string) : void {
        this.fullName = fullName;
        if(StringUtils.isNotBlank(fullName)) {
            this.firstName = undefined;
            this.middleName = undefined;
            this.familyName = undefined;
            this.id = undefined;
        }
    }

    @action
    setEmail(email?: string) : void {
        this.emailAddress = email;
        if (StringUtils.isNotBlank(email)) {
            this.id = undefined;
        }
    }

    @action
    setEmailAddress(emailAddress?: string) : void {
        this.emailAddress = emailAddress;
        if (StringUtils.isNotBlank(emailAddress)) {
            this.id = undefined;
        }
    }

    @action
    setCredentialType(credentialType?: string) : void {
        this.credentialType = credentialType;
        if (StringUtils.isNotBlank(credentialType)) {
            this.id = undefined;
        }
    }

    @action
    setCredential(credential?: string) : void {
        this.credential = credential;
        if (StringUtils.isNotBlank(credential)) {
            this.id = undefined;
        }
    }

    @action
    setFirstName(firstName?: string) : void {
        this.firstName = firstName;
        if(StringUtils.isNotBlank(firstName)) {
            this.fullName = undefined;
            this.id = undefined;
        }
    }

    @action
    setMiddleName(middleName?: string) : void {
        this.middleName = middleName;
        if(StringUtils.isNotBlank(middleName)) {
            this.fullName = undefined;
            this.id = undefined;
        }
    }

    @action
    setFamilyName(familyName?: string) : void {
        this.familyName = familyName;
        if(StringUtils.isNotBlank(familyName)) {
            this.fullName = undefined;
            this.id = undefined;
        }
    }

    @action
    setDob(dob?: moment.Moment) : void {
        this.dob = dob;
        if (dob) {
            this.id = undefined;
        }
    }

    @action
    setGender(gender?: string) : void {
        this.gender = gender;
        if(StringUtils.isNotBlank(gender)) {
            this.id = undefined;
        }
    }

    @action
    setFullAddress(fullAddress?: string) : void {
        this.fullAddress = fullAddress;
        if(StringUtils.isNotBlank(fullAddress)) {
            this.unitNumber = undefined;
            this.streetNumber = undefined;
            this.streetName = undefined;
            this.streetType = undefined;
            this.locality = undefined;
            this.state = undefined;
            this.postcode = undefined;
            this.id = undefined;
        }
    }

    @action
    setUnitNumber(unitNumber?: string) : void {
        this.unitNumber = unitNumber;
        if(StringUtils.isNotBlank(unitNumber)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setStreetNumber(streetNumber?: string) : void {
        this.streetNumber = streetNumber;
        if(StringUtils.isNotBlank(streetNumber)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setStreetName(streetName?: string) : void {
        this.streetName = streetName;
        if(StringUtils.isNotBlank(streetName)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setStreetType(streetType?: string) : void {
        this.streetType = streetType;
        if(StringUtils.isNotBlank(streetType)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setLocality(locality?: string) : void {
        this.locality = locality;
        if(StringUtils.isNotBlank(locality)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setState(state?: string) : void {
        this.state = state;
        if(StringUtils.isNotBlank(state)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setPostcode(postcode?: string) : void {
        this.postcode = postcode;
        if(StringUtils.isNotBlank(postcode)) {
            this.fullAddress = undefined;
            this.id = undefined;
        }
    }

    @action
    setPhone(phone?: string) : void {
        this.phone = phone;
        if(StringUtils.isNotBlank(phone)) {
            this.id = undefined;
        }
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
        return StringUtils.isNotBlank(this.id) || StringUtils.isNotBlank(this.fullName);
    }

    @action
    clearEntity() {
        this.id = undefined;
        this.fullName = undefined;
    }

    @computed
    get isPersonSpecified() {
        return StringUtils.isNotBlank(this.firstName) ||
                StringUtils.isNotBlank(this.middleName) ||
                StringUtils.isNotBlank(this.familyName) ||
                DateUtils.isValidMoment(this.dob) ||
                StringUtils.isNotBlank(this.gender);
    }

    @action
    clearPerson() {
        this.firstName = undefined;
        this.middleName = undefined;
        this.familyName = undefined;
        this.dob = undefined;
        this.gender = undefined;
    }

    @computed
    get isAddressSpecified() {
        return StringUtils.isNotBlank(this.fullAddress) ||
               StringUtils.isNotBlank(this.unitNumber) ||
               StringUtils.isNotBlank(this.streetNumber) ||
               StringUtils.isNotBlank(this.streetName) ||
               StringUtils.isNotBlank(this.streetType) ||
               StringUtils.isNotBlank(this.locality) ||
               StringUtils.isNotBlank(this.state) ||
               StringUtils.isNotBlank(this.postcode);
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
        return StringUtils.isNotBlank(this.phone) || StringUtils.isNotBlank(this.emailAddress);
    }

    @action
    clearContact() {
        this.phone = undefined;
        this.emailAddress = undefined;
    }

    @computed
    get isCredentialSpecified() {
        return StringUtils.isNotBlank(this.credentialType) || StringUtils.isNotBlank(this.credential);
    }

    @action
    clearCredential() {
        this.credentialType = undefined;
        this.credential = undefined;
    }

    @computed
    get request() : IMasterEntitySearchRequest {
        return {
            id: this.entityOn && StringUtils.isNotBlank(this.id) ? this.id : undefined,
            fullName: this.entityOn && StringUtils.isNotBlank(this.fullName) ? this.fullName : undefined,
            firstName: this.personOn && StringUtils.isNotBlank(this.firstName) ? this.firstName : undefined,
            middleName: this.personOn && StringUtils.isNotBlank(this.middleName) ? this.middleName : undefined,
            familyName: this.personOn && StringUtils.isNotBlank(this.familyName) ? this.familyName : undefined,
            dob: this.personOn ? DateUtils.momentToDataText(this.dob) : undefined,
            sex: this.personOn && StringUtils.isNotBlank(this.gender) ? this.gender : undefined,
            fullAddress: this.addressOn && StringUtils.isNotBlank(this.fullAddress) ? this.fullAddress : undefined,
            unitnNo: this.addressOn && StringUtils.isNotBlank(this.unitNumber) ? this.unitNumber : undefined,
            streetNo: this.addressOn && StringUtils.isNotBlank(this.streetNumber) ? this.streetNumber : undefined,
            streetName: this.addressOn && StringUtils.isNotBlank(this.streetName) ? this.streetName : undefined,
            streetType: this.addressOn && StringUtils.isNotBlank(this.streetType) ? this.streetType : undefined,
            locality: this.addressOn && StringUtils.isNotBlank(this.locality) ? this.locality : undefined,
            state: this.addressOn && StringUtils.isNotBlank(this.state) ? this.state : undefined,
            postCode: this.addressOn && StringUtils.isNotBlank(this.postcode) ? this.postcode : undefined,
            phoneNumber: this.contactOn && StringUtils.isNotBlank(this.phone) ? this.phone : undefined,
            emailAddress: this.contactOn && StringUtils.isNotBlank(this.emailAddress) ? this.emailAddress : undefined,
            credentialType: this.credentialOn && StringUtils.isNotBlank(this.credentialType) ? this.credentialType : undefined,
            credential: this.credentialOn && StringUtils.isNotBlank(this.credential) ? this.credential : undefined
        };
    }

    set request(request : IMasterEntitySearchRequest) {
        this.setRequest(request);   
    }

    @action
    setRequest(request : IMasterEntitySearchRequest) {
        if(request) {
            this.setId(request.id);
            this.setFullName(request.fullName);
            this.setFirstName(request.firstName);
            this.setMiddleName(request.middleName);
            this.setFamilyName(request.familyName);
            this.setDob(DateUtils.dataTextToInputMoment(request.dob));
            this.setGender(request.sex);
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
            if(this.personOn && this.dob && !this.dob.isValid()) {
                this.validationErrors.push({ prop: "dob", propTitle: "Date of Birth", message: "Invalid Date: " + this.dob.creationData().input });
            }

            if(this.credentialOn && StringUtils.isNotBlank(this.credential) && StringUtils.isBlank(this.credentialType)) {
                this.validationErrors.push({ props: "credentialType", propTitle: "Credential Type", message: "A credential type must be specified"});
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