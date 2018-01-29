import HandleModel from "common/HandleModel";
import RootAppHost from "app/RootAppHost";
import { autorun } from "mobx";

const NavToggleStore = new HandleModel<boolean>();

autorun(() => {
    if(RootAppHost.sync.syncing) {
        NavToggleStore.setValue(false);
    }
});

export { NavToggleStore as default, NavToggleStore }