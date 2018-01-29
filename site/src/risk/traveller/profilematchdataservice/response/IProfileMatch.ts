interface IProfileMatch {
    ResultId?: string;
    BiographicFamilyName?: string;
    BiographicGivenName?: string;
    BiographicBirthDate?: string;
    BiographicSexCode?: string;
    BiographicIssueCountryCode?: string;
    BiographicTravelDocNbr?: string;
    BookingRecordLocator?: string;
    BookingCreationTimeStamp?: string;
    BookingSystemCode?: string;
    BookingPassengerNumber?: number;
    IATTravellerID?: string;
    ProfileId?: string;
    ProfileName?: string;
    ProfileVersion?: string;
    ResultCreationTimeStamp?: Date;
    ReasonForMatch?: string;
    ResultTypeCode?: string;
    LocalScheduleDate?: Date;
    RouteId?: string;
    Direction?: string;
    LocalPortCode?: string;
    CBRScheduledDateTime?: Date;
    BioDiffInd?: string;
    ProfileNote?: string;
    ProfileTier?: string;
    ActionInd?: string;
    ActionReason?: string;
    AlertNumber?: string;
    ActionUserId?: string;
}

export {IProfileMatch as default, IProfileMatch}