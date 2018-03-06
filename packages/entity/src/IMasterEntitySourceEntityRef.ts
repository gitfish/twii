import { IMasterEntitySourceEntityKey } from "./IMasterEntitySourceEntityKey";

interface IMasterEntitySourceEntityRef extends IMasterEntitySourceEntityKey {
    masterSourceSystemCd?: string;
    masterSourceObjectTypeCd?: string;
    masterSourceKeyValue?: string;
    MDMProfileName?: string;
    masteredIndicator?: string;
    MDMMatchScorePercent?: string;
    sourceObjectTypeCd?: string;
    sourceKeyValue?: string;
    sourceRelatedKeyValue?: string;
    masterEntityNameID?: string;
    masterEntityAddressID?: string;
    masterEntityCredentialID?: string;
    masterEntityEmailID?: string;
    masterEntityPhoneID?: string;
    sourceEntityNameId?: string;
    sourceEntityAddressId?: string;
    sourceEntityCredentialId?: string;
    sourceEntityEmailId?: string;
    sourceEntityPhoneId?: string;
    masterValidStartTmstmp?: string;
    sourceValidStartTmstmp?: string;
    CDLStartTmstmp?: string;
    [key : string] : any;
}

export { IMasterEntitySourceEntityRef };