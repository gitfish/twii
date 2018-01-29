import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRKey from "./IPNRKey";
import IActivityListModel from "common/IActivityListModel";

interface IPNRTicketPaymentModel extends IActivityListModel<IPNRTicketPayment> {
    request: IPNRKey;
    getTicketPayment(request : IPNRKey) : Promise<any>;
    refresh() : Promise<any>;
}

export { IPNRTicketPaymentModel as default, IPNRTicketPaymentModel }