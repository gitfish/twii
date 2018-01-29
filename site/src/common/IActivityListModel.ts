import IActivityFilterModel from "./IActivityFilterModel";
import ISortableListModel from "./ISortableListModel";
import ISelectionModel from "./ISelectionModel";

interface IActivityListModel<T> extends ISortableListModel<T> {
    filterSpecified : boolean;
    filter: IActivityFilterModel;
    selection: ISelectionModel<T>;
    selectedIndexes: number[];
}

export { IActivityListModel as default, IActivityListModel }