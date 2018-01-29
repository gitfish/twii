import IPNRKey from "./IPNRKey";
import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";

interface IPNRCombinedDataModel {
    pnrKey: IPNRKey;
    combinedData : IPNRCombinedDataOthers[];

}

export { IPNRCombinedDataModel as default, IPNRCombinedDataModel };
