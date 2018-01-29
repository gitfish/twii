import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";
import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
import IEntityAttributeActions from "./IEntityAttributeActions";

interface IEntityModel {
    name: IMasterEntitySourceEntityName;
    names: IMasterEntitySourceEntityName[];
    addresses: IMasterEntitySourceEntityAddress[];
    phones: IMasterEntitySourceEntityPhone[];
    credentials: IMasterEntitySourceEntityCredential[];
    personalMetas: IMasterEntitySourceEntityMeta[];
    dateOfBirth: Date;
    gender: string;
    isPerson: boolean;
    isOrganisation: boolean;
    attributeActions: IEntityAttributeActions;
}

export { IEntityModel as default, IEntityModel };