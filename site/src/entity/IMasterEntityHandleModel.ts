import ISyncModel from "common/ISyncModel";
import IHandleModel from "common/IHandleModel";
import IMasterEntityModel from "./IMasterEntityModel";

interface IMasterEntityHandleModel extends IHandleModel<IMasterEntityModel> {
    sync: ISyncModel;
    masterEntityId: string;
    loadById(masterEntityId : string) : void;
}

export { IMasterEntityHandleModel as default, IMasterEntityHandleModel }