import IMasterEntitySourceKey from "./IMasterEntitySourceKey";

interface IMasterEntitySourceEntityMeta extends IMasterEntitySourceKey {
    entityTypeCd?: string;
    sex?: string;
    birthDt?: string;
    birthCountryCd?: string;
    effectiveStartDt?: string;
    [key: string] : any;
}

export { IMasterEntitySourceEntityMeta as default, IMasterEntitySourceEntityMeta };