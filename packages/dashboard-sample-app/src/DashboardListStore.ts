import { DashboardList } from "@twii/dashboard/lib/model/DashboardList";
import { DashboardStorageServiceContext } from "@twii/dashboard/lib/service/DashboardStorageServiceContext";
import { createSampleRouter } from "@twii/sample-base/lib/sampleRouter";

const storageKey = "sample-dashboard-list";

const DashboardListStore = new DashboardList();
DashboardListStore.setRouter(createSampleRouter());
DashboardListStore.loader = () => {
    return DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = (data) => {
    return DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApp = { title: "Samples Home", path: "/samples/home" };

export { DashboardListStore }