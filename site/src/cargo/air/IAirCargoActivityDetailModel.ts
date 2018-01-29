import ISyncModel from "common/ISyncModel";
import IAirCargoActivity from "./IAirCargoActivity";
import IAirCargoActivityDetail from "./IAirCargoActivityDetail";

interface IAirCargoActivityDetailModel {
    visible: boolean;
    sync: ISyncModel;
    total : number;
    items: IAirCargoActivityDetail[];
    activity: IAirCargoActivity;
    load(activity : IAirCargoActivity) :  Promise<any>;
    setVisible(visible: boolean) : void;
}

export { IAirCargoActivityDetailModel as default, IAirCargoActivityDetailModel };