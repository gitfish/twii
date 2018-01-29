import DirectionCode from "./DirectionCode";

interface IPNRPushHistory {
    DirectionCode?: DirectionCode;
    RouteId?: string;
    LocalPort?: string;
    ScheduledDate?: Date;
    PushTypeCode?: string;
    PushNumber?: number;
    PNRReceivedTimeStamp?: Date;
}

export { IPNRPushHistory as default, IPNRPushHistory }