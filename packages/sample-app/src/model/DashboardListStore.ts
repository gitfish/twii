import { DashboardList } from "@twii/bored/lib/model/DashboardList";
import { StorageServiceContext } from "@twii/bored/lib/service/StorageServiceContext";
import { ComponentFactory } from "@twii/bored/lib/model/ComponentFactory";
import { AppRouter } from "../AppRouter";

const storageKey = "sample-dashboard-list";

const DashboardListStore = new DashboardList();
DashboardListStore.setRouter(AppRouter);
DashboardListStore.loader = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(StorageServiceContext.value.getItem(storageKey));
        }, 1000)
    });
};
DashboardListStore.saver = (data) => {
    return StorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApp = { title: "Samples", path: "/samples" };
DashboardListStore.componentFactory = ComponentFactory;

export { DashboardListStore }