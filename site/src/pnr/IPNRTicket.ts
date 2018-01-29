import IPNRKey from "./IPNRKey";

interface IPNRTicket extends IPNRKey {
    segmentTattoo?: string;
    passengerTattoo?: string;
    familyName?: string;
    ticketNbr?: string;
    dataIndicator?: string;
    givenName?: string;
}

export { IPNRTicket as default, IPNRTicket }