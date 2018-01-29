import { observable, action, computed } from "mobx";
import IPNRKey from "./IPNRKey";
import IPNRTicketingModel from "./IPNRTicketingModel";
import IPNRTicket from "./IPNRTicket";
import IPNRServiceResponse from "./IPNRServiceResponse";
import SortModel from "common/SortModel";
import ActivityListModel from "common/ActivityListModel";
import PNRServiceContext from "./PNRServiceContext";
import { sortItems, filterItems } from "./PNRTicketingHelper";

interface IPNRTicketingDetailsHandler {
    (ticketingDetailsRequest : IPNRKey) : Promise<IPNRServiceResponse<IPNRTicket>>;
}

const DefaultTicketingDetailsPNRHandler : IPNRTicketingDetailsHandler = (ticketingDetailsRequest : IPNRKey) => {
    return PNRServiceContext.value.getPNRTicketingDetails(ticketingDetailsRequest);
};

class PNRTicketingModel extends ActivityListModel<IPNRTicket> implements IPNRTicketingModel {
    sortHandler = sortItems;
    filterHandler = filterItems;
    private _ticketingHandler : IPNRTicketingDetailsHandler;
    @observable sort: SortModel = new SortModel();
    @observable request: IPNRKey;

    get ticketingHandler() : IPNRTicketingDetailsHandler {
        return this._ticketingHandler || DefaultTicketingDetailsPNRHandler;
    }
    set ticketingHandler(ticketingHandler : IPNRTicketingDetailsHandler) {
        this._ticketingHandler = ticketingHandler;
    }

    @action
    private _refreshDone = (r : IPNRServiceResponse<IPNRTicket>) => {
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
            return this.ticketingHandler(this.request).then((r) => {
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
    getTicketing(request : IPNRKey) : Promise<any> {
        this.request = request;
        return this.refresh();
    }
}

export { PNRTicketingModel as default, PNRTicketingModel }