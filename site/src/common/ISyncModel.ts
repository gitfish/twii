import ISync from "./ISync";

interface ISyncStartOptions {
    id?: string;
    type?: string;
}

interface ISyncModel extends ISync {
    hasSynced: boolean;
    syncStart(opts?: ISyncStartOptions) : void;
    syncEnd() : void;
    syncError(error : any) : void;
    clear() : void;
}

export { ISyncModel as default, ISyncModel, ISyncStartOptions }