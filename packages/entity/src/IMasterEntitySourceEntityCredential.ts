import { IMasterEntitySourceEntityKey } from "./IMasterEntitySourceEntityKey";

interface IMasterEntitySourceEntityCredential extends IMasterEntitySourceEntityKey {
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

export { IMasterEntitySourceEntityCredential };