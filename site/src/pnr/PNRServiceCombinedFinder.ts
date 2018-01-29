import { action } from "mobx";
import ISyncHandle from "common/ISyncHandle";
import SyncHandleModel from "common/SyncHandleModel";
import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";
//import IMasterEntityModel from "./IMasterEntityModel";
import IPNRCombinedDataModel from "./IPNRCombinedDataModel";
//import MasterEntityModel from "./MasterEntityModel";
import PNRCombinedDataModel from "./PNRCombinedDataModel";
//import MasterEntityServiceContext from "./MasterEntityServiceContext";
import { TimedCache } from "common/TimedCache";

//PNRServiceCombinedFinder

const handleLife = 2 * 60 * 1000;

const handleCache = new TimedCache<SyncHandleModel<IPNRCombinedDataModel>>(handleLife);

const _entityLoaded = action((handle : SyncHandleModel<IPNRCombinedDataModel>, data : IPNRCombinedDataOthers) => {
    handle.setValue(new PNRCombinedDataModel(data));
    handle.sync.syncEnd();
});