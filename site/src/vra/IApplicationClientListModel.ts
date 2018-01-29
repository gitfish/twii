import IApplicationClient from "./IApplicationClient";
import ISortableListModel from "common/ISortableListModel";

interface IApplicationClientListModel extends ISortableListModel<IApplicationClient> {
    permissionRequestId: string;
    load(permissionRequestId : string) :  Promise<any>;
}

export { IApplicationClientListModel as default, IApplicationClientListModel };