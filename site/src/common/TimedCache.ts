const defaultEntryLife : number = 2 * 60 * 1000;

interface ITimedCacheEntry<V> {
    timeoutId: any;
    value: V;
}

class TimedCache<V = any> {
    private _entries : any = {};
    private _lifeInMillis;
    constructor(lifeInMillis?: number) {
        this._lifeInMillis = lifeInMillis > 0 ? lifeInMillis : defaultEntryLife; 
    }
    get(key : string | number) {
        const e = this._entries[key];
        return e ? e.value : undefined;
    }
    remove(key : string | number) {
        const e = this._entries[key];
        if(e.timeoutId) {
            try {
                clearTimeout(e.timeoutId);
            } catch(e) {}
        }
        delete this._entries[key];
    }
    put(key : string | number, value : V) {
        if(key !== undefined && value) {
            const e = this._entries[key];
            if(e) {
                clearTimeout(e.timeoutId);
            }
            this._entries[key] = { 
                timeoutId: setTimeout(() => {
                    this.remove(key);
                }, this._lifeInMillis),
                value : value
            }
        }
    }
}

export { TimedCache }