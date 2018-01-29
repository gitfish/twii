import IPNRKey from "./IPNRKey";

interface IPNRContactDetails extends IPNRKey {
    segmentTattoo?: string;
    contactFreeText?: string;
    passengerTattoo?: string;
    contactType?: string;
}

export { IPNRContactDetails as default, IPNRContactDetails }