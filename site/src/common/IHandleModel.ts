import IHandle from "./IHandle";

interface IHandleModel<T> extends IHandle<T> {
    setValue(value: T) : Promise<any> | void;
    clearValue() : void;
    setRef(value : T) : Promise<any> | void;
    clearRef() : void;
}

export { IHandleModel as default, IHandleModel };