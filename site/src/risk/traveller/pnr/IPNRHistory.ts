interface IPNRHistory {
    PrevPNREnvelopeNum?: number;
    NewPNREnvelopeNum?: number;
    Action?: string;
    Element?: string;
    HistoryData?: string;
    CreatorIATACode?: string;
    CreatorId?: string;
    CreatorCityCode?: string;
    CreatorCompanyId?: string;
    CreationTimeStamp?: Date;
}

export { IPNRHistory as default, IPNRHistory }