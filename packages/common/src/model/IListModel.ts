import { ISync } from "../ISync";
import { IList } from "../IList";

interface IListModel<T> extends IList<T> {
    sync: ISync;
    total: number;
    itemsView: T[];
    addItem(item : T, atIndex?: number) : void;
    addItems(items : T[], atIndex?: number) : void;
    setItems(items: T[], total?: number) : void;
    clear() : void;
}

export { IListModel };
