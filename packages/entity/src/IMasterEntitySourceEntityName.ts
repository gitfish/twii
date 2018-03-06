import { IMasterEntitySourceEntityKey } from "./IMasterEntitySourceEntityKey";

interface IMasterEntitySourceEntityName extends IMasterEntitySourceEntityKey {
    sourceEntityNameId?: string;
    usageTypeCd?: string;
    standardFullName?: string;
    organisationName?: string;
    namePrefix?: string;
    firstName?: string;
    middleName?: string;
    familyName?: string;
    nameSuffix?: string;
    nameGeneration?: string;
    nameGenderCd?: string;
    nameEntityTypeCd?: string;
    identifiedContactValue?: string;
    effectiveStartDt?: string;
    [key : string] : any;
}

export { IMasterEntitySourceEntityName };