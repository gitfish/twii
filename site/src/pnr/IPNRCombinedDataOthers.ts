import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRTicket from "./IPNRTicket";
import IPNRKey from "./IPNRKey";


interface IPNRCombinedDataOthers {
    //bookingSystemCode?: string;
    //recordLocator?: string;
    //pnrCreationTimestamp?: string;
    pnrKey: IPNRKey;
    ticketPayments: IPNRTicketPayment[];
    tickets: IPNRTicket[];
}

export { IPNRCombinedDataOthers as default, IPNRCombinedDataOthers }