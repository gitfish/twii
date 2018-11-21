import { IActivityFilterModel } from "./IActivityFilterModel";
import { ISortableListModel } from "./ISortableListModel";
import { ISelectableListModel } from "./ISelectableListModel";

interface IActivityListModel<T> extends ISortableListModel<T>, ISelectableListModel<T> {
    filterSpecified : boolean;
    filter: IActivityFilterModel;
}

export { IActivityListModel, IActivityListModel as default }