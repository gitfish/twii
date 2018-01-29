import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRTicket from "./IPNRTicket";
import IPNRKey from "./IPNRKey";


interface IPNRCombinedDataOthersModel {
    //bookingSystemCode?: string;
    //recordLocator?: string;
    //pnrCreationTimestamp?: string;
    pnrKey: IPNRKey;
    ticketPayments: IPNRTicketPayment[];
    tickets: IPNRTicket[];
}

export { IPNRCombinedDataOthersModel as default, IPNRCombinedDataOthersModel }