import IPNRKey from "./IPNRKey";

interface IPNRSpecialServiceRequest extends IPNRKey {
    segmentTattoo?: string;
    ssrCode?: string;
    passengerTattoo?: string;
    ssrFreeText?: string;
}

export { IPNRSpecialServiceRequest as default, IPNRSpecialServiceRequest }