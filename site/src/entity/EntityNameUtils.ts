import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceModel from "./IMasterEntitySourceModel";
import { Output as DateOutputFormats } from "common/DateFormats";
import * as StringUtils from "util/String";
import { dateFromDataText } from "util/Date";
import * as moment from "moment";
import {IEntityModel} from "./IEntityModel";

const NAME_USAGE_TYPE_MAIN = "MAIN";

const getNameScore = (name : IMasterEntitySourceEntityName, isPerson : boolean = false) : number => {
    let score = 0;
    if(name) {
        if(isPerson) {
            score += (StringUtils.isNotBlank(name.firstName) ? 1 : 0);
            score += (StringUtils.isNotBlank(name.middleName) ? 1 : 0);
            score += (StringUtils.isNotBlank(name.familyName) ? 1 : 0);   
        }
        score += (StringUtils.isNotBlank(name.standardFullName) ? 1 : 0);
    }
    return score;
};

const isMainName = (name : IMasterEntitySourceEntityName) : boolean => {
    return name && StringUtils.equalsIgnoreCase(name.usageTypeCd, NAME_USAGE_TYPE_MAIN);
};


const formatToNISName = (familyName: string, firstName: string, middleName: string, gender: string, dateOfBirth: Date | string) : string => {

    let dobDisplayValue;
    if (dateOfBirth && typeof(dateOfBirth) === 'string') {
        dobDisplayValue = " " + nisDOBFormat(dateFromDataText(dateOfBirth));
    } else if (dateOfBirth) {
        dobDisplayValue = " " + nisDOBFormat(dateOfBirth as Date);
    } else {
        dobDisplayValue = "";
    }

    return `${familyName}, ${firstName}`
        + (middleName ? " " + middleName : "")
        + (gender ? " (" + genderToNISFormat(gender) + ")" : "(-)")
        + dobDisplayValue;
};

const toNISFormat = (sourceEntityModel: IMasterEntitySourceModel | IEntityModel) : string => {
    const nisNameElements : string[] = [];
    if(sourceEntityModel && sourceEntityModel.name ) {
        nisNameElements.push(nameToNISFormat(sourceEntityModel.name));
    }
    if(sourceEntityModel && sourceEntityModel.gender ) {
        nisNameElements.push("(" + genderToNISFormat(sourceEntityModel.gender) + ")");
    }
    if(sourceEntityModel && sourceEntityModel.dateOfBirth ) {
        nisNameElements.push(nisDOBFormat(sourceEntityModel.dateOfBirth));
    }
    return nisNameElements.length > 0 ? nisNameElements.join(" ") : "";
};

const capitalizeFirstLetter = (value : string) => {
    return value && value.length > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value;
};

const genderToNISFormat = (gender: string):string => {
    let genderChar = "N";
    switch(gender.toLowerCase()) {
        case 'male': case 'm': case 'M': genderChar = "M"; break;
        case 'female': case 'f': case 'F': genderChar = "F"; break;
        case 'undeclared': genderChar = "-"; break;
        case 'unknown': genderChar = "U"; break;
        case 'indeterminate': genderChar = "X"; break;
    }
    return genderChar;
};

// takes a Name object and return <FAMILY NAME> <Middle name> <Last name> format. Note: Family name is upper case
const nameToNISFormat = (name: IMasterEntitySourceEntityName): string => {
    let familyName = name.familyName ? name.familyName.toUpperCase() : undefined;
    let firstName = name.firstName ? capitalizeFirstLetter(name.firstName.toLowerCase()) : undefined;
    let middleName = name.middleName ? capitalizeFirstLetter(name.middleName.toLowerCase()) : undefined;
    const givenNameElements : string[] = [];
    if(StringUtils.isNotBlank(firstName)) {
        givenNameElements.push(firstName);
    }
    if(StringUtils.isNotBlank(middleName)) {
        givenNameElements.push(middleName);
    }
    if(givenNameElements.length === 0 && name.givenNames) {
        givenNameElements.push(capitalizeFirstLetter(name.givenNames.toLowerCase()));
    }
    const givenNames = givenNameElements.length > 0 ? givenNameElements.join(" ") : undefined;
    const nisNameElements : string[] = [];
    if(StringUtils.isNotBlank(familyName)) {
        nisNameElements.push(familyName);
    }
    if(StringUtils.isNotBlank(givenNames)) {
        nisNameElements.push(givenNames);
    }
    return nisNameElements.length > 0 ? nisNameElements.join(", ") : "";
};

// takes a date format and returns a string formatted as DDMMMYYYY
const nisDOBFormat = (dob: Date): string => {
    return dob ? moment(dob).format(DateOutputFormats.nisFormat).toUpperCase() : "";
};

const defaultDOBFormat = (dateOfBirth: Date | string): string => {

    let defaultDOB = "";
    if (dateOfBirth && typeof(dateOfBirth) === 'string') {
        defaultDOB =  moment(dateFromDataText(dateOfBirth)).format(DateOutputFormats.default);
    } else if (dateOfBirth) {
        defaultDOB = moment(dateOfBirth).format(DateOutputFormats.default);
    }
    return defaultDOB;
};

export { getNameScore, isMainName, formatToNISName, toNISFormat, nameToNISFormat, nisDOBFormat, genderToNISFormat, defaultDOBFormat };