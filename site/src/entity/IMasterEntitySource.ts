import IMasterEntitySourceEntity from "./IMasterEntitySourceEntity";

interface IMasterEntitySource {
    masterEntityId?: string;
    sourceSystemCode?: string;
    sourceEntities?: IMasterEntitySourceEntity[];
}

export { IMasterEntitySource as default, IMasterEntitySource };