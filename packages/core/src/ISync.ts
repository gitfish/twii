interface ISync<I = any> {
    id?: I;
    type?: any;
    startDate: Date;
    endDate: Date;
    error: any;
    syncing: boolean;
    hasSynced: boolean;
}

export { ISync, ISync as default }