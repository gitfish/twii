import IActivityListModel from "common/IActivityListModel";
import IMasterEntitySourceModel from "./IMasterEntitySourceModel";

interface IMasterEntitySourceListModel<T> extends IActivityListModel<T> {
    source: IMasterEntitySourceModel;
}

export { IMasterEntitySourceListModel as default, IMasterEntitySourceListModel }