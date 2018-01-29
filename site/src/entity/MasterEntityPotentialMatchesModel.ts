import { observable, action, computed } from "mobx";
import IMasterEntityPotentialMatch from "./IMasterEntityPotentialMatch";
import IMasterEntityPotentialMatchesModel from "./IMasterEntityPotentialMatchesModel";
import ListModel from "common/ListModel";
import SortModel from "common/SortModel";
import * as SortUtils from "util/Sort";
import * as DateUtils from "util/Date";
import { MatchScorePercentage, StartTimestamp, EndTimestamp, Credential } from "./component/MasterEntityPotentialMatchesColumns";
import MasterEntityPotentialMatchesServiceContext from "./MasterEntityPotentialMatchesServiceContext";

class MasterEntityPotentialMatchesModel extends ListModel<IMasterEntityPotentialMatch> implements IMasterEntityPotentialMatchesModel {

    @observable masterEntityId: string;
    @observable sort = new SortModel();

    @action
    refresh() {
        const syncId = this.masterEntityId;
        this.sync.syncStart({ id: syncId });
        return MasterEntityPotentialMatchesServiceContext.value.getMasterEntityPotentialMatches(this.masterEntityId).then((items) => {
            if(syncId === this.sync.id) {
                this.setItems(items);
            }
        }).catch((error) => {
            if(syncId === this.sync.id) {
                this.clearItems();
                this.sync.syncError(error);
            }
        });
    }

    @action
    load(masterEntityId : string) :  Promise<any> {
        const syncId = masterEntityId;
        if(syncId !== this.sync.id) {
            this.masterEntityId = masterEntityId;
            return this.refresh();
        }
        return Promise.resolve();
    }

    @computed
    get itemsView() {
        return SortUtils.sort(this.items, this.sort, this._toSortValue);
    }

    private _toSortValue = (item : IMasterEntityPotentialMatch, field: string) => {
        if(item) {
            if(field === StartTimestamp.fieldName) {
                return DateUtils.dateFromTimestampDataText(item.Cdl_Strt_Tmstmp);
            } else if (field === EndTimestamp.fieldName) {
                return DateUtils.dateFromTimestampDataText(item.Cdl_End_Tmstmp);
            } else if (field === MatchScorePercentage.fieldName) {
                const n = parseFloat(item.MDM_Mtch_Scr_Prc);
                return !isNaN(n) ? n : item.MDM_Mtch_Scr_Prc;
            } else if (field === Credential.fieldName) {
                return item.Crdntl_Vlu;
            }
            return item[field];
        }
    };
}

export { MasterEntityPotentialMatchesModel as default, MasterEntityPotentialMatchesModel }