import IMasterEntitySourceKey from "./IMasterEntitySourceKey";

interface IMasterEntitySourceEntityCredential extends IMasterEntitySourceKey {
    sourceEntityCredentialId?: string;
    credentialTypeCd?: string;
    credentialValue?: string;
    internalIndicator?: string;
    credentialCountryCd?: string;
    issuingCountryCd?: string;
    issuingAuthorityCd?: string;
    effectiveStartDt?: string;
    [key : string] : any;
}

export { IMasterEntitySourceEntityCredential as default, IMasterEntitySourceEntityCredential };