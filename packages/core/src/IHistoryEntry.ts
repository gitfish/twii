interface IHistoryEntry<T> {
    timestamp: Date;
    value: T;
    [key : string] : any;
}

export { IHistoryEntry as default, IHistoryEntry }