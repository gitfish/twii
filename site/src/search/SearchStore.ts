import SearchModel from "./SearchModel";

const SearchStore = new SearchModel();
SearchStore.addCoreById("aircargo", "Air Cargo");
SearchStore.addCoreById("seacargo", "Sea Cargo");
SearchStore.addCoreById("Mail", "Mail");
SearchStore.addCoreById("PNR", "PNR");
SearchStore.addCoreById("NIS", "NIS");

export { SearchStore as default, SearchStore }