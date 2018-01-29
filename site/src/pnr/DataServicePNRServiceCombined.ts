import IPNRServiceCombined from "./IPNRServiceCombined";
import PNRDataServiceContext from "./PNRDataServiceContext";
import IPNRCombinedDataOthers from "./IPNRCombinedDataOthers";
import IPNRKey from "./IPNRKey";
import NoResultErrorCode from "common/AbstractRestDataService";
import IPNRTicketPayment from "./IPNRTicketPayment";
import IPNRTicket from "./IPNRTicket";


class DataServicePNRServiceCombined implements IPNRServiceCombined {

    tempArr : IPNRTicketPayment[] = []; //Todo: change to IPNRCombined

    private _mergeTicketingPayment(ticketPayment : IPNRTicketPayment, state : any) {
        const ticketPaymentKey = "ticketPaymentDet:" + ticketPayment.bookingSystemCode + ticketPayment.recordLocator + ticketPayment.pnrCreationTimestamp;
        if(!state[ticketPaymentKey]) {
            state[ticketPaymentKey] = ticketPayment;
            this.tempArr.push(ticketPayment);
        }
    }

    private _mergeTicketingDetails(ticketingDetails : IPNRTicket, state : any) {
        const ticketingDetailsKey = "ticketingDet:" + ticketingDetails.bookingSystemCode + ticketingDetails.recordLocator + ticketingDetails.pnrCreationTimestamp;
        if(!state[ticketingDetailsKey]) {
            state[ticketingDetailsKey] = ticketingDetails;
            this.tempArr.push(ticketingDetails);
        }
    }

    //getOtherDataByKey(bookingSystemCode?: string, recordLocator?: string, pnrCreationTimestamp?: string) {
    getOtherDataByPNRKey(key?: IPNRKey) {
        //const state : { [key: number] : IPNRCombined } = {};
        const state : { [key: number] : IPNRTicketPayment } = {}; //Todo: Change to IPNRCombined
        const ds = PNRDataServiceContext.value;
        return Promise.all([
            ds.getPNRTicketPaymentDetails(key).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.data) {
                    value.data.forEach((item) => {
                        this._mergeTicketingPayment(item, state);
                    });
                    console.log("getPNRTicketPayment data: " + JSON.stringify(value.data));
                }
            })/*,
            ds.getPNRTicketingDetails(key).then((value) => {
                if(value.errors && value.errors.code !== NoResultErrorCode) {
                   return Promise.reject(value.errors);
                } else if(value.data) {
                    value.data.forEach((item) => {
                        this._mergeTicketingDetails(item, state);
                    });
                    console.log("getPNRTicketingDetails data: " + JSON.stringify(value.data));
                }
            })*/
        ]).then(() => {
            const r = state[key.bookingSystemCode + key.recordLocator + key.pnrCreationTimestamp];
            if(!r) {
                return Promise.reject({ status: 404, code: "NOT_FOUND", message: `Unable to find PNR data by key: ${key.bookingSystemCode + key.recordLocator + key.pnrCreationTimestamp}` });
            }
            return Promise.resolve(r);
        });
    }
}

export { DataServicePNRServiceCombined as default, DataServicePNRServiceCombined }