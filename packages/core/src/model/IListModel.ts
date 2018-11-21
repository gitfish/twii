import { IList } from "../IList";
import { ISyncSupplier } from "../ISyncSupplier";

interface IListModel<T = any, P = any> extends IList<T, P>, ISyncSupplier<T[]> {
    total: number;
    itemsView: T[];
    setParent(parent : P) : void;
    addItem(item : T, atIndex?: number) : void;
    addItems(items : T[], atIndex?: number) : void;
    setItems(items: T[]) : void;
    clear() : void;
}

export { IListModel };
