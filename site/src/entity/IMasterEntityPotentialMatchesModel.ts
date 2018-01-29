import IMasterEntityPotentialMatch from "./IMasterEntityPotentialMatch";
import ISortableListModel from "common/ISortableListModel";

interface IMasterEntityPotentialMatchesModel extends ISortableListModel<IMasterEntityPotentialMatch> {
    masterEntityId: string;
    load(masterEntityId : string) :  Promise<any>;
}

export { IMasterEntityPotentialMatchesModel as default, IMasterEntityPotentialMatchesModel };