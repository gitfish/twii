import IMasterEntityHistoryItem from "./IMasterEntityHistoryItem";

interface IMasterEntityHistoryService {
    getMasterEntityHistory(masterEntityId : string) : Promise<IMasterEntityHistoryItem[]>;
}

export { IMasterEntityHistoryService as default, IMasterEntityHistoryService };