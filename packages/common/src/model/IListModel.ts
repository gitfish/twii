import { ISync } from "../ISync";
import { IList } from "../IList";
import { ISyncSupplier } from "../ISyncSupplier";

interface IListModel<T> extends IList<T>, ISyncSupplier<T[]> {
    total: number;
    itemsView: T[];
    addItem(item : T, atIndex?: number) : void;
    addItems(items : T[], atIndex?: number) : void;
    setItems(items: T[], total?: number) : void;
    clear() : void;
}

export { IListModel };
