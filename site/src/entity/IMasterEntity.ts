import IMasterEntitySource from "./IMasterEntitySource";

interface IMasterEntity {
    masterEntityId?: string;
    sources?: IMasterEntitySource[];
}

export { IMasterEntity as default, IMasterEntity };