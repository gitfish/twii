import { SyncSupplier } from "@twii/core/lib/model/SyncSupplier";
import { UserServiceContext } from "../service/UserServiceContext";
import { IUserProfile } from "../IUserProfile";

const UserProfileStore = new SyncSupplier<IUserProfile>();
UserProfileStore.loader = () => {
    return UserServiceContext.value.getUserProfile();
};

export { UserProfileStore }