import IMasterEntitySourceKey from "./IMasterEntitySourceKey";

interface IMasterEntitySourceEntityName extends IMasterEntitySourceKey {
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

export { IMasterEntitySourceEntityName as default, IMasterEntitySourceEntityName };