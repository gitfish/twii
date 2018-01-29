import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";
import IPNRKey from "./IPNRKey";


interface IPNRCombinedData {
    //bookingSystemCode?: string;
    //recordLocator?: string;
    //pnrCreationTimestamp?: string;
    pnrKey: IPNRKey;
    ticketPayments: IPNRCombinedDataOthers[];
}

export { IPNRCombinedData as default, IPNRCombinedData }