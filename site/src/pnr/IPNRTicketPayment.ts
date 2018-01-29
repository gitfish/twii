import IPNRKey from "./IPNRKey";

interface IPNRTicketPayment extends IPNRKey{
    amount?: string;
    paymentModeCode?: string;
    currencyCode?: string;
    tax?: string;
    creditCardNbr?: string;
    paymentType?: string;
    creditCardName?: string;
    pnrPaymentFreeText?: string;
}

export { IPNRTicketPayment as default, IPNRTicketPayment }