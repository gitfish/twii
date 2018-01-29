interface ISeaCargoActivity {
    originalMsgId?: string;
    clientRoleType?: string;
    clientInstanceId?: string;
    houseBillNbr?: string;
    oceanBillNbr?: string;
    vesselId?: string;
    voyageNbr?: string;
    searchArrivalDate?: string;
    goodsDescr?: string;
    lowestBillInd?: string;
    parentBillLadingNbr?: string;
    sacInd?: string;
    examFindResultCode?: string;
    cargoType?: string;
    containerNbr?: string;
    stsCargoStatusCode?: string;
    grossWeight?: string;
    positiveFindInd?: string;
}

export { ISeaCargoActivity as default, ISeaCargoActivity };