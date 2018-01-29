interface ISync {
    id: string;
    type: string;
    startDate: Date;
    endDate: Date;
    error: any;
    syncing: boolean;
    hasSynced: boolean;
}

export { ISync as default, ISync }
