import { DashboardList } from "@pu/dashboard/lib/model/DashboardList";
import { DashboardStorageServiceContext } from "@pu/dashboard/lib/service/DashboardStorageServiceContext";
import { AppRouter } from "../AppRouter";

const storageKey = "ozp-dashboard-list";

const DashboardListStore = new DashboardList();
DashboardListStore.setRouter(AppRouter);
DashboardListStore.loader = () => {
    return DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApp = { title: "Bookmarks", path: "/listing/bookmark" };

export { DashboardListStore }