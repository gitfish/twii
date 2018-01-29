import IPNRKey from "./IPNRKey";

interface IPNRPushHistory extends IPNRKey {
    pushTypeCode?: string;
    pushNumber?: string;
    localPortCode?: string;
    localScheduledDate?: string;
    directionCode?: string;
    routeId?: string;
    activeTimestamp?: string;
}

export { IPNRPushHistory as default, IPNRPushHistory }