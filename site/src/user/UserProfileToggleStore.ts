import HandleModel from "common/HandleModel";
import RootAppHost from "app/RootAppHost";
import { autorun } from "mobx";

const UserProfileToggleStore = new HandleModel<boolean>();

autorun(() => {
    if(RootAppHost.sync.syncing) {
        UserProfileToggleStore.setValue(false);
    }
});

export { UserProfileToggleStore as default, UserProfileToggleStore }