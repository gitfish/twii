import { DashboardList } from "@twii/ui-dashboard/lib/DashboardList";
import { DashboardStorageServiceContext } from "@twii/ui-dashboard/lib/DashboardStorageServiceContext";

const storageKey = "sample-dashboard-list";

const DashboardListStore = new DashboardList();
DashboardListStore.loader = () => {
    return DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApp = { title: "Add Widget", path: "/listing/bookmarks" };

export { DashboardListStore }