import { DashboardList } from "@twii/dashboard/lib/model/DashboardList";
import { DashboardStorageServiceContext } from "@twii/dashboard/lib/service/DashboardStorageServiceContext";

const storageKey = "sample-dashboard-list";

const DashboardListStore = new DashboardList();
DashboardListStore.loader = () => {
    return DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApp = { title: "Add App", path: "/app/add" };

export { DashboardListStore }