interface ICruiseSummary {
    CruiseCode?: string;
    CruiseCompanyName?: string;
    CruiseDirection?: string;
    CruiseType?: string;
    CruiseEndCbrArrDateTime?: Date;
    CruiseEndCountryCode?: string;
    CruiseEndCountryName?: string;
    CruiseEndPortCode?: string;
    CruiseNights?: number;
    CruiseShipName?: string;
    CruiseStatus?: string;
    CruiseStartDepCbrDateTime?: Date;
    CruiseStartDepCountryCode?: string;
    CruiseStartDepCountryName?: string;
    CruiseStartDepPortCode?: string;
    NoOfSegments?: string;
}

export{ ICruiseSummary as default, ICruiseSummary }