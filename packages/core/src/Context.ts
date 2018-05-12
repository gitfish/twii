import { IMutableSupplier } from "./IMutableSupplier";
import { ISupplierFunc } from "./ISupplierFunc";

interface IContextOptions<T> {
    id?: string;
    value?: T;
    factory?: ISupplierFunc<T>;
}

class Context<T> implements IMutableSupplier<T> {
    private _id : string;
    private _origValue : T;
    private _value : T;
    private _factory : () => T;
    constructor(opts?: IContextOptions<T>) {
        this._id = opts ? opts.id : undefined;
        this._origValue = opts ? opts.value : undefined;
        this._value = opts ? opts.value : undefined;
        this._factory = opts ? opts.factory : undefined;
    }
    get value() : T {
        if(!this._value) {
            if(!this._origValue && this._factory) {
                this._origValue = this._factory();
            }
            this._value = this._origValue;
        }
        return this._value;
    }
    set value(value : T) {
        this.setValue(value);
    }
    setValue(value : T) {
        this._value = value;
    }
    clearValue() {
        this._value = undefined;
    }
}

export { IContextOptions, Context };