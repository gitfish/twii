import { IMasterEntitySourceEntityKey } from "./IMasterEntitySourceEntityKey";

interface IMasterEntitySourceEntityPhone extends IMasterEntitySourceEntityKey {
    sourceEntityPhoneId?: string;
    usageTypeCd?: string;
    phoneValue?: string;
    australianFormatIndicator?: string;
    phoneTypeCd?: string;
    countryCd?: string;
    areaCd?: string;
    phoneNumber?: string;
    identifiedContactValue?: string;
    effectiveStartDt?: string;
    [key : string] : any;
}

export { IMasterEntitySourceEntityPhone };