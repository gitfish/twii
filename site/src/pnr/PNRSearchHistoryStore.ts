import HistoryModel from "common/HistoryModel";
import IPNRSearchRequest from "./IPNRSearchRequest";

const PNRSearchHistoryStore = new HistoryModel<IPNRSearchRequest>();
PNRSearchHistoryStore.storageKey = "analystdesktop-pnrSearchHistory";

export { PNRSearchHistoryStore as default, PNRSearchHistoryStore }