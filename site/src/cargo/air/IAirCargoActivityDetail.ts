interface IAirCargoActivityDetail {
    masterBillNbr?: string;
    subMasterBillNbr?: string;
    houseBillNbr?: string;
    flightNbr?: string;
    uniqueConsignmentRefNbr?: string;
    specialReporterNbr?: string;
    transhipmentNbr?: string;
    arrivalDate?: string;
    dischargePortCode?: string;
    destinationPortCode?: string;
    firstAusPortCode?: string;
    originalLoadingPortCode?: string;
    waybillOriginPortCode?: string;
    overseasRoutingPortCode?: string;
    reportedBy?: string;
    responsibleParty?: string;
    consignee?: string;
    consignor?: string;
    notifyParty?: string;
    goodsDescr?: string;
    nbrOfPackages?: string;
    grossWeightQuantity?: string;
    grossWeightUnit?: string;
    consolidatedCargoStatusCode?: string;
    declaredValueOfGoods?: string;
    declaredValueOfGoodsCurrencyCode?: string;
    freightForwarderInd?: string;
    freightMethodOfPayment?: string;
    reportableDocumentsInd?: string;
    selfAssessedClearanceDeclarationInd?: string;
    personalEffectsInd?: string;
    partShipmentInd?: string;
    transitInd?: string;
    createdPartInd?: string;
}

export { IAirCargoActivityDetail as default, IAirCargoActivityDetail };