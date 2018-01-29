import IPNRKey from "./IPNRKey";

interface IPNRRemarkFreeText extends IPNRKey {
    segmentTattoo?: string;
    passengerTattoo?: string;
    textType?: string;
    textData?: string;
    textCode?: string;
}

export { IPNRRemarkFreeText as default, IPNRRemarkFreeText }