import IHistoryEntry from "../IHistoryEntry";
import { IListModel } from "./IListModel";
import { ISync } from "../ISync";

interface IHistoryModel<T> extends IListModel<IHistoryEntry<T>> {
    saveSync : ISync;
    save() : Promise<any>;
    load() : Promise<any>;
    addEntry(value : T) : Promise<any>;
}

export { IHistoryModel as default, IHistoryModel }