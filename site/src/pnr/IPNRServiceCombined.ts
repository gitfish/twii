import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";
import IPNRTicketPayment from "./IPNRTicketPayment";//Todo: Change to IPNRCombined
import IPNRKey from "./IPNRKey";


interface IPNRServiceCombined {
    //Todo: use IPNRKey
    getOtherDataByPNRKey(key?: IPNRKey) : Promise<IPNRTicketPayment>;
    //getOtherDataByKey(bookingSystemCode?: string, recordLocator?: string, pnrCreationTimestamp?: string) : Promise<IPNRCombined>;
}

export { IPNRServiceCombined as default, IPNRServiceCombined };