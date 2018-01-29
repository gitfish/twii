import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IError from "common/IError";
import * as moment from "moment";

interface IMasterEntitySearchRequestModel {
    validationErrors?: IError[];
    isValueSpecified?: boolean;
    id?: string;
    fullName?: string;
    emailAddress?: string;
    credentialType?: string;
    credential?: string;
    firstName?: string;
    middleName?: string;
    familyName?: string;
    dob?: moment.Moment;
    gender?: string;
    fullAddress?: string;
    unitNumber?: string;
    streetNumber?: string;
    streetName?: string;
    streetType?: string;
    locality?: string;
    state?: string;
    postcode?: string;
    phone?: string;

    entityOn: boolean;
    isEntitySpecified : boolean;
    personOn: boolean;
    isPersonSpecified: boolean;
    credentialOn: boolean;
    isCredentialSpecified: boolean;
    addressOn: boolean;
    isAddressSpecified: boolean;
    contactOn: boolean;
    isContactSpecified: boolean;
    setEntityOn(entityOn : boolean) : void;
    setPersonOn(personOn : boolean) : void;
    setCredentialOn(credentialOn : boolean) : void;
    setAddressOn(addressOn : boolean) : void;
    setContactOn(contactOn : boolean) : void;

    setId(id?: string) : void;
    setFullName(fullName?: string) : void;
    setEmail(email?: string) : void;
    setEmailAddress(emailAddress?: string) : void;
    setCredentialType(credentialType?: string) : void;
    setCredential(credential?: string) : void;
    setFirstName(firstName?: string) : void;
    setMiddleName(middleName?: string) : void;
    setFamilyName(familyName?: string) : void;
    setDob(dob?: moment.Moment) : void;
    setGender(gender?: string) : void;
    setFullAddress(fullAddress?: string) : void;
    setUnitNumber(unitNumber?: string) : void;
    setStreetNumber(streetNumber?: string) : void;
    setStreetName(streetName?: string) : void;
    setStreetType(streetType?: string) : void;
    setLocality(locality?: string) : void;
    setState(state?: string) : void;
    setPostcode(postcode?: string) : void;
    setPhone(phone?: string) : void;
  
    request : IMasterEntitySearchRequest;
    setRequest(request : IMasterEntitySearchRequest) : void;
    validate() : void;
    isValid : boolean;

    submit(requestHandler : (request : IMasterEntitySearchRequest) => void);
    clear(): void;
}

export { IMasterEntitySearchRequestModel as default, IMasterEntitySearchRequestModel };