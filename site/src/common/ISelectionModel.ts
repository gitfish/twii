import { IObjectWithKey } from "office-ui-fabric-react/lib/utilities/selection";

interface ISelectionModel<T> {
    selectedItems: T[];
    selectionCount: number;
    setSelectedItems(selectedItems: T[]);
    toggleItem(item : T) : void;
    clearSelection();
}

export { ISelectionModel as default, ISelectionModel };