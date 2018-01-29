import IListModel from "./IListModel";
import IHistoryEntry from "./IHistoryEntry";

interface IHistoryModel<T> extends IListModel<IHistoryEntry<T>> {
    load() : Promise<any>;
    addEntry(value : T) : Promise<any>;
}

export { IHistoryModel as default, IHistoryModel }