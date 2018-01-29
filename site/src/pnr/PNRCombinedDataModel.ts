
import { observable, action, computed } from "mobx";
import { Data as DateDataFormats } from "common/DateFormats";
import * as moment from "moment";
import * as StringUtils from "util/String";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import ActivityFilterModel from "common/ActivityFilterModel";
import IPNRCombinedDataModel from "./IPNRCombinedDataModel";
import IPNRCombinedDataOthersModel from "./IPNRCombinedDataOthersModel";
import PNRCombinedDataOthersModel from "./PNRCombinedDataOthersModel";
import IPNRCombinedData from "./IPNRCombinedData";
import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";
import IPNRKey from "./IPNRKey";


class PNRCombinedDataModel implements IPNRCombinedDataModel {
    @observable pnrKey: IPNRKey;
    combinedData: IPNRCombinedDataOthers[];
    @observable sync : ISyncModel = new SyncModel();
    @observable activityFilter = new ActivityFilterModel();

    constructor(data?: IPNRCombinedDataOthers) {
        this.setData(data);
    }

    @computed
    get data() {
        return {
            pnrKey: this.pnrKey,
            combinedData: this.combinedData.map(s => s.ticketPayments)
        };
    }

    @action
    setData(data : IPNRCombinedDataOthers) {
        if(data) {
            this.pnrKey = data.pnrKey;
            this.combinedData = data.ticketPayments ? data.ticketPayments.map((s) => {
                return new PNRCombinedDataOthersModel(s);
            }) : [];
        } else {
            this.pnrKey = undefined;
            this.combinedData = []
        }
    }

}

export { PNRCombinedDataModel as default, PNRCombinedDataModel } 