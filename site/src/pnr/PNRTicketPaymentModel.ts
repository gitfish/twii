import { observable, action, computed } from "mobx";
import IPNRKey from "./IPNRKey";
import IPNRTicketPaymentModel from "./IPNRTicketPaymentModel";
import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRServiceResponse from "./IPNRServiceResponse";
import SortModel from "common/SortModel";
import ActivityListModel from "common/ActivityListModel";
import PNRServiceContext from "./PNRServiceContext";
import { sortItems, filterItems } from "./PNRTicketPaymentHelper";

interface IPNRTicketPaymentDetailsHandler {
    (ticketPaymentDetailsRequest : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicketPayment>>;
}

const DefaultTicketPaymentDetailsPNRHandler : IPNRTicketPaymentDetailsHandler = (ticketPaymentDetailsRequest : IPNRKey) => {
    return PNRServiceContext.value.getPNRTicketPaymentDetails(ticketPaymentDetailsRequest);
};

class PNRTicketPaymentModel extends ActivityListModel<IPNRTicketPayment> implements IPNRTicketPaymentModel {
    sortHandler = sortItems;
    filterHandler = filterItems;
    private _ticketPaymentHandler : IPNRTicketPaymentDetailsHandler;
    @observable sort: SortModel = new SortModel();
    @observable request: IPNRKey;

    get ticketPaymentHandler() : IPNRTicketPaymentDetailsHandler {
        return this._ticketPaymentHandler || DefaultTicketPaymentDetailsPNRHandler;
    }
    set ticketPaymentHandler(ticketPaymentHandler : IPNRTicketPaymentDetailsHandler) {
        this._ticketPaymentHandler = ticketPaymentHandler;
    }

    @action
    private _refreshDone = (r : IPNRServiceResponse<IPNRTicketPayment>) => {
        this.setItems(r && r.data ? r.data : []);
    }

    @action
    private _refreshError = (error : any) => {
        this.setItems([]);
        this.sync.syncError(error);
    }

    @action
    refresh() : Promise<any> {
        if(this.request) {
            const syncId = String(new Date().getTime());
            this.sync.syncStart({ id: syncId });
            return this.ticketPaymentHandler(this.request).then((r) => {
                if(this.sync.id === syncId) {
                    this._refreshDone(r);
                }
            }).catch((error) => {
                if(this.sync.id === syncId) {
                    this._refreshError(error);
                }
            });
        }
        return Promise.resolve();
    }

    @action
    getTicketPayment(request : IPNRKey) : Promise<any> {
        this.request = request;
        return this.refresh();
    }
}

export { PNRTicketPaymentModel as default, PNRTicketPaymentModel }