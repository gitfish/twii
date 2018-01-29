import Gender from "risk/traveller/common/Gender";

interface IPersonInfo {
    familyName?: string;
    givenName?: string;
    sexCode?: Gender;
    birthDate?: string; // some components of the birth date may not be know - hence the string type
    maritalStatusCode?: string;
    birthCountryCode?: string;
    countryOfCitizenship?: string;
    placeOfBirth?: string;
    professionCode?: string;
}

export { IPersonInfo as default, IPersonInfo }