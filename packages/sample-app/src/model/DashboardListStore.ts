import { DashboardList } from "@twii/dashboard/lib/model/DashboardList";
import { StorageServiceContext } from "@twii/dashboard/lib/service/StorageServiceContext";
import { AppRouter } from "../AppRouter";

const storageKey = "sample-dashboard-list";

const DashboardListStore = new DashboardList();
DashboardListStore.setRouter(AppRouter);
DashboardListStore.loader = () => {
    return StorageServiceContext.value.then(service => service.getItem(storageKey));
};
DashboardListStore.saver = (data) => {
    return StorageServiceContext.value.then(service => service.setItem(storageKey, data));
};
DashboardListStore.addApp = { title: "Samples", path: "/samples" };

export { DashboardListStore }