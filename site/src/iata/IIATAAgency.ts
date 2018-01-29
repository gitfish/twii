interface IIATAAgency {
    iataTravelAgencyCode?: string;
    iataTravelAgencyCheckDigit?: string;
    travelAgencyTypeCode?: string;
    carrierCode?: string;
    travelAgencyName?: string;
    tradingName?: string;
    locationCity?: string;
    locationRegion?: string;
    locationCountryCode?: string;
    telephoneCountryCode?: string;
    telephoneAreaCode?: string;
    telephoneNumber?: string;
    emailAddress?: string;
    webAddress?: string;
}

export { IIATAAgency as default, IIATAAgency };