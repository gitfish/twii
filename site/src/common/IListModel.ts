import ISyncModel from "./ISyncModel";
import IList from "./IList";

interface IListModel<T> extends IList<T> {
    sync: ISyncModel;
    visible: boolean;
    total: number;
    itemsView: T[];
    addItem(item : T, atIndex?: number) : void;
    addItems(items : T[], atIndex?: number) : void;
    setItems(items: T[], total?: number) : void;
    addItem(item: T) : void;
    setVisible(visible : boolean) : void;
    clear() : void;
}

export { IListModel as default, IListModel };
