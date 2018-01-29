import { observable, action, computed } from "mobx";
import { IMutableSupplier } from "../IMutableSupplier";

class SupplierModel<T> implements IMutableSupplier<T> {
    @observable.ref _value : T;

    @computed
    get value() {
        return this._value;
    }
    set value(value : T) {
        this.setValue(value);
    }

    @action
    setValue(value : T) {
        this._value = value;
    }

    @action
    clearValue() {
        this._value = undefined;
    }
}

export { SupplierModel };