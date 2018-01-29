interface ITravelDocInfo {
    travelDocId?: string;
    travelDocCountryCode?: string;
    travelDocTypeCode?: string;
    travelDocSequenceNbr?: number;
    issueCountryCode?: string;
    travelDocExpiryDate?: Date;
}

export { ITravelDocInfo as default, ITravelDocInfo }