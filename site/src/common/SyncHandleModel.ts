import HandleModel from "./HandleModel";
import ISyncHandleModel from "./ISyncHandleModel";
import SyncModel from "./SyncModel";

class SyncHandleModel<T> extends HandleModel<T> implements ISyncHandleModel<T> {
    sync = new SyncModel();
}

export { SyncHandleModel as default, SyncHandleModel }