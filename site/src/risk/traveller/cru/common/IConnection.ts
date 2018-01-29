interface IConnection {
    ArrivalPortName?: string;
    ArrivalDate?: Date;
    ArrivalTime?: Date;
    ArrivalPortCode?: string;
    ArrivalCountryCode?: string;
    BlockNumber?: number;
    DeparturePortName?: string;
    DepartureDate?: Date;
    DepartureTime?: Date;
    DeparturePortCode?: string;
    DepartureCountryCode?: string;
    Direction?: string;
    FareClass?: string;
    RouteId?: string;
    ParentRouteId?: string;
    inboundConxIndicator?: string;
    inboundConxPortCode?: string;
}

export { IConnection as default, IConnection }