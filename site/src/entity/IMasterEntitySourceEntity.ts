import IMasterEntitySourceRef from "./IMasterEntitySourceRef";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";

interface IMasterEntitySourceEntity {
    sourceEntityId?: string;
    sourceSystemCode?: string;
    ref?: IMasterEntitySourceRef;
    meta?: IMasterEntitySourceEntityMeta;
    names?: IMasterEntitySourceEntityName[];
    addresses?: IMasterEntitySourceEntityAddress[];
    phones?: IMasterEntitySourceEntityPhone[];
    credentials?: IMasterEntitySourceEntityCredential[];
}

export { IMasterEntitySourceEntity as default, IMasterEntitySourceEntity };