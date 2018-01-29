import ISyncHandle from "./ISyncHandle";
import IHandleModel from "./IHandleModel";

interface ISyncHandleModel<T> extends ISyncHandle<T>, IHandleModel<T> {

}

export { ISyncHandleModel as default, ISyncHandleModel }