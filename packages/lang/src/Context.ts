import { ISupplierFunc } from "./ISupplierFunc";
import { IMutableSupplier } from "./IMutableSupplier";

interface IContextOptions<T> {
    id?: string;
    value?: T;
    factory?: ISupplierFunc<T>;
}

class Context<T> implements IMutableSupplier<T> {
    private _id : string;
    private _origValue : T;
    private _value : T;
    private _factory : ISupplierFunc<T>;
    constructor(opts?: IContextOptions<T>) {
        this._id = opts ? opts.id : undefined;
        this._origValue = opts ? opts.value : undefined;
        this._value = opts ? opts.value : undefined;
        this._factory = opts ? opts.factory : undefined;
    }
    get id() {
        return this._id;
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
    get factory() : ISupplierFunc<T> {
        return this._factory;
    }
    set factory(value) {
        this.setFactory(value)
    }
    setFactory(factory : ISupplierFunc<T>) {
        if(factory !== this._factory) {
            this._factory = factory;
            if(this._factory) {
                this.clearValue();
            }
        }
    }
    get ref() {
        return this.value;
    }
    set ref(value : T) {
        this.value = value;
    }
}

export { Context as default, Context, IContextOptions };