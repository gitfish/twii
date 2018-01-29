import { observable, action, computed } from "mobx";
import IHandle from "./IHandle";

class HandleModel<T> implements IHandle<T> {
    @observable.ref value : T;

    @computed
    get ref() {
        return this.value;
    }

    @action
    setValue(value : T) {
        this.value = value;
    }

    @action
    setRef(value : T) {
        this.setValue(value);
    }

    @action
    clearValue() {
        this.value = undefined;
    }

    @action
    clearRef() {
        this.clearValue();
    }
}

export { HandleModel as default, HandleModel };