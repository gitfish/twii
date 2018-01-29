import DirectionCode from "./DirectionCode";

interface IPOIAction {
    ETVInstanceId?: string;
    ProfileName?: string;
    ProfileVersion?: string;
    ProfileTier?: string;
    ActionInd?: string;
    ActionUserId?: string;
    ActionTimeStamp?: Date;
    AlertNbr?: string;
    ActionReason?: string;
    CaseId?: string;
    SubCaseId?: string;
    Treatment?: string;
    BookingSystemCode?: string;
    RecordLocator?: string;
    PNRCreationTimeStamp?: Date;
    DirectionCode?: DirectionCode;
    LocalPortCode?: string;
    LocalScheduledDate?: Date;
    PassengerTattoo?: number;
    IATTravellerId?: string;
}

export { IPOIAction as default, IPOIAction }