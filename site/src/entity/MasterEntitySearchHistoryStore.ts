import HistoryModel from "common/HistoryModel";

const MasterEntitySearchHistoryStore = new HistoryModel();
MasterEntitySearchHistoryStore.storageKey = "analystdesktop-entitySearchHistory";
MasterEntitySearchHistoryStore.legacyValueProp = "request";

export { MasterEntitySearchHistoryStore as default, MasterEntitySearchHistoryStore };