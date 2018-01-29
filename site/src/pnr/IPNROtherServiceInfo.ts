import IPNRKey from "./IPNRKey";

interface IPNROtherServiceInfo extends IPNRKey {
    segmentTattoo?: string;
    osiFreeText: string;
    passengerTattoo: string;
    osiCode: string;
}

export { IPNROtherServiceInfo as default, IPNROtherServiceInfo }