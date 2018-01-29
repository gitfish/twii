import ISyncHandleModel from "common/ISyncHandleModel";
import ISync from "common/ISync";
import IUserProfile from "./IUserProfile";

interface IUserProfileHandleModel extends ISyncHandleModel<IUserProfile> {
    load() : Promise<any>;
    refresh() : Promise<any>;
}

export { IUserProfileHandleModel as default, IUserProfileHandleModel }