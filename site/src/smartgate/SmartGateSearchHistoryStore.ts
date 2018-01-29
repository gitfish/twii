import HistoryModel from "common/HistoryModel";

const SmartGateSearchHistoryStore = new HistoryModel();
SmartGateSearchHistoryStore.storageKey = "analystdesktop-smartGateSearchHistory";

export { SmartGateSearchHistoryStore as default, SmartGateSearchHistoryStore };