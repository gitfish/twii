import IMasterEntityHistoryItem from "./IMasterEntityHistoryItem";
import ISortableListModel from "common/ISortableListModel";

interface IMasterEntityHistoryModel extends ISortableListModel<IMasterEntityHistoryItem> {
    masterEntityId: string;
    load(masterEntityId : string) :  Promise<any>;
}

export { IMasterEntityHistoryModel as default, IMasterEntityHistoryModel };