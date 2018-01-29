import IHandle from "./IHandle";

interface IContextOptions<T> {
    id?: string;
    value?: T;
    factory?: () => T;
}

class Context<T> implements IHandle<T> {
    private _id : string;
    private _origValue : T;
    private _value : T;
    private _factory : () => T;
    constructor(opts: IContextOptions<T>) {
        this._id = opts.id;
        this._origValue = opts.value;
        this._value = opts.value;
        this._factory = opts.factory;
    }
    get value() : T {
        if(!this._value) {
            if(!this._origValue) {
                this._origValue = this._factory();
            }
            this._value = this._origValue;
        }
        return this._value;
    }
    set value(value : T) {
        this._value = value;
    }
    get ref() {
        return this.value;
    }
    set ref(value : T) {
        this.value = value;
    }
}

export { Context as default, Context, IContextOptions };