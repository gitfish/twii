import { IMasterEntitySourceEntityKey } from "./IMasterEntitySourceEntityKey";
import { IMasterEntitySourceEntityRef } from "./IMasterEntitySourceEntityRef";
import { IMasterEntitySourceEntityMeta } from "./IMasterEntitySourceEntityMeta";
import { IMasterEntitySourceEntityName } from "./IMasterEntitySourceEntityName";
import { IMasterEntitySourceEntityAddress } from "./IMasterEntitySourceEntityAddress";
import { IMasterEntitySourceEntityPhone } from "./IMasterEntitySourceEntityPhone";
import { IMasterEntitySourceEntityCredential } from "./IMasterEntitySourceEntityCredential";

interface IMasterEntitySourceEntity extends IMasterEntitySourceEntityKey {
    ref?: IMasterEntitySourceEntityRef;
    meta?: IMasterEntitySourceEntityMeta;
    names?: IMasterEntitySourceEntityName[];
    addresses?: IMasterEntitySourceEntityAddress[];
    phones?: IMasterEntitySourceEntityPhone[];
    credentials?: IMasterEntitySourceEntityCredential[];
}

export { IMasterEntitySourceEntity };