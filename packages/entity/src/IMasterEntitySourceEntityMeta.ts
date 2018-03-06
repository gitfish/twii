import { IMasterEntitySourceEntityKey } from "./IMasterEntitySourceEntityKey";

interface IMasterEntitySourceEntityMeta extends IMasterEntitySourceEntityKey {
    entityTypeCd?: string;
    sex?: string;
    birthDt?: string;
    birthCountryCd?: string;
    effectiveStartDt?: string;
    [key: string] : any;
}

export { IMasterEntitySourceEntityMeta };