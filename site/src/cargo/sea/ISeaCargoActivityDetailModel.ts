import ISyncModel from "common/ISyncModel";
import ISeaCargoActivity from "./ISeaCargoActivity";
import ISeaCargoActivityDetail from "./ISeaCargoActivityDetail";

interface ISeaCargoActivityDetailModel {
    visible: boolean;
    sync: ISyncModel;
    total : number;
    items: ISeaCargoActivityDetail[];
    activity: ISeaCargoActivity;
    load(activity : ISeaCargoActivity) :  Promise<any>;
    setVisible(visible: boolean) : void;
}

export { ISeaCargoActivityDetailModel as default, ISeaCargoActivityDetailModel };