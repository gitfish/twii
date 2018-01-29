import IMasterEntitySourceEntityMeta from "entity/IMasterEntitySourceEntityMeta";
import IMasterEntitySourceEntityName from "entity/IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "entity/IMasterEntitySourceEntityAddress";

interface IEROLLEntity {
    sourceEntityId?: string;
    effectiveStartDt?: string;
    meta?: IMasterEntitySourceEntityMeta;
    names?: IMasterEntitySourceEntityName[];
    addresses?: IMasterEntitySourceEntityAddress[];
}

export { IEROLLEntity as default, IEROLLEntity };