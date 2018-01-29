import DashboardList from "./DashboardList";
import DashboardStorageServiceContext from "./DashboardStorageServiceContext";

const storageKey = "analyst-desktop-dashboard-list";
const DashboardListStore = new DashboardList();
DashboardListStore.loader = () => {
    return DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApplet = { title: "Add Widget", path: "/listing/bookmarks" };

export { DashboardListStore as default, DashboardListStore }