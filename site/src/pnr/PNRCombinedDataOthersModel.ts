import { observable, action, computed } from "mobx";
//import IMasterEntityModel from "./IMasterEntityModel";
import IPNRCombinedDataModel from "./IPNRCombinedDataModel";
//import IMasterEntitySource from "./IMasterEntitySource";
import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";
//import IMasterEntitySourceModel from "./IMasterEntitySourceModel";
import IPNRCombinedDataOthersModel from "./IPNRCombinedDataOthersModel";

//import IMasterEntitySourceEntity from "./IMasterEntitySourceEntity";
//import IMasterEntitySourceEntityName from "./IMasterEntitySourceEntityName";
//import IMasterEntitySourceEntityAddress from "./IMasterEntitySourceEntityAddress";
//import IMasterEntitySourceEntityPhone from "./IMasterEntitySourceEntityPhone";
//import IMasterEntitySourceEntityCredential from "./IMasterEntitySourceEntityCredential";
//import IMasterEntitySourceEntityMeta from "./IMasterEntitySourceEntityMeta";
//import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
//import * as EntityNameUtils from "./EntityNameUtils";
import * as StringUtils from "util/String";
import { Data as DateDataFormats } from "common/DateFormats";
import * as moment from "moment";
import * as DateUtils from "util/Date";
//import IEntityAttributeActions from "./IEntityAttributeActions";
import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRTicket from "./IPNRTicket";
import IPNRKey from "./IPNRKey";

class PNRCombinedDataOthersModel implements IPNRCombinedDataOthersModel {
    //@observable.ref private _masterEntity : IMasterEntityModel;
    //@observable sourceSystemCode: string;
    //@observable sourceEntities: IMasterEntitySourceEntity[] = [];
    @observable private _state : any = {};

    @observable _pnrKey: IPNRKey;
    @observable ticketPayments: IPNRTicketPayment[];
    @observable tickets: IPNRTicket[];

    constructor(key : IPNRKey, data?: IPNRCombinedDataOthers) {
        this._pnrKey = key;
        this.setData(data);
    }

    @computed
    get pnrKey() {
        return this._pnrKey;
    }


    @computed
    get state() {
        return this._state;
    }
    set state(value) {
        this.setState(value);
    }

    @action
    setState(state : any) {
        this._state = Object.assign({}, this._state, state);
    }

    @computed
    get data() {
        return {
            pnrKey: this._pnrKey,
            ticketPayments: this.ticketPayments,
            tickets: this.tickets
        }
    }

    @action
    setData(data : IPNRCombinedDataOthers) {
        if(data) {
            this._pnrKey = data.pnrKey;
            this.ticketPayments = data.ticketPayments || [];
            this.tickets = data.tickets || [];
        } else {
            this._pnrKey = {};
            this.ticketPayments = [];
            this.tickets = [];
        }
    }

    toJSON() {
        return this.data;
    }
}

export { PNRCombinedDataOthersModel as default, PNRCombinedDataOthersModel };