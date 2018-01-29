import { observable, action } from "mobx";
import IUserProfile from "./IUserProfile";
import IUserProfileHandleModel from "./IUserProfileHandleModel";
import SyncHandleModel from "common/SyncHandleModel";
import SyncModel from "common/SyncModel";
import UserServiceContext from "./UserServiceContext";
import { toPromise } from "common/SyncUtils";

class UserProfileHandleModel extends SyncHandleModel<IUserProfile> implements IUserProfileHandleModel {
    @action
    setValue(value : IUserProfile) {
        super.setValue(value);
        this.sync.syncEnd();
    }

    @action
    setError(error : any) {
        this.setValue(undefined);
        this.sync.syncError(error);
    }

    @action
    refresh() {
        const syncId = String(new Date().getTime());
        this.sync.syncStart({ id: syncId });
        return UserServiceContext.value.getUserProfile().then((value) => {
            if(syncId === this.sync .id) {
                this.setValue(value);
            }
        }).catch((error) => {
            if(syncId === this.sync.id) {
                this.setError(error);
            }
        });
    }

    @action
    load() : Promise<any> {
        if(!this.sync.syncing && (!this.sync.hasSynced || this.sync.error)) {
            return this.refresh();
        }
        return toPromise(this.sync);
    }
}

export { UserProfileHandleModel as default, UserProfileHandleModel }