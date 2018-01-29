import DirectionCode from "./DirectionCode";
import IPNRTraveller from "./common/IPNRTraveller";

interface IHistoricalPNRRecord {
    RecordLocator?: string;
    CreationTimeStamp?: Date;
    LocalScheduledDate?: Date;
    LocalPortCode?: string;
    DirectionCode?: DirectionCode;
    RouteId?: string;
    LastReceivedTimeStamp?: Date;
    PNRPushCount?: number;
    Carrier?: string;
    PNRTraveller?: IPNRTraveller;
    sLastReceivedTimeStamp?: string;
    sCreationTimeStamp?: string;
    sLocalScheduledDate?: string;
}

export { IHistoricalPNRRecord as default, IHistoricalPNRRecord }