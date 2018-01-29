interface ISeaCargoActivityDetail {
    vesselId?: string;
    vesselName?: string;
    voyageNbr?: string;
    dischargePortCode?: string;
    destinationPortCode?: string;
    firstAusPortCode?: string;
    originalLoadingPortCode?: string;
    billOfLadingOriginPortCode?: string;
    oceanBillNbr?: string;
    houseBillNbr?: string;
    parentBillLadingNbr?: string;
    countryOfOriginOfGoods?: string;
    reportedBy?: string;
    responsibleParty?: string;
    principalAgent?: string;
    consignee?: string;
    consignor?: string;
    notifyParty?: string;
    freightForwarderInd?: string;
    freightMethodOfPayment?: string;
    transitInd?: string;
    overseasRoutingPortCode?: string;
    cargoType?: string;
    containerNbr?: string;
    goodsDescr?: string;
    consolidatedCargoStatusCode?: string;
}

export { ISeaCargoActivityDetail as default, ISeaCargoActivityDetail };