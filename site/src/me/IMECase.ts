enum MEDomainType {
    Air = "AIR",
    Sea = "SEA"
}

interface IMECase {
    CaseID: string;
    DomainType: MEDomainType;
    BookingSystemCode: string;
    CreationTs: string;
    RecordLocator: string;
    CaseType: string;
    DirectionCode: string;
    IATTravellerID: string;
    LocalPortCode: string;
    LocalScheduleDate: string;
    ParentRouteId: string;
    RouteId: string;
    TravelDocCntryCode: string;
    TravelDocId: string;
    Type: string;
    Action: string;
}

export { IMECase as default, IMECase, MEDomainType }