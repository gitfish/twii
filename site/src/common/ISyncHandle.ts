import IHandle from "./IHandle";
import ISync from "./ISync";

interface ISyncHandle<T> extends IHandle<T> {
    sync: ISync;
}

export { ISyncHandle as default, ISyncHandle }