interface IAirCargoActivity {
    airlineCode?: string;
    flightNbr?: string;
    originalMsgId?: string;
    clientRoleType?: string;
    clientInstanceId?: string;
    masterBillNbr?: string;
    houseBillNbr?: string;
    searchArrivalDate?: string;
    goodsDescr?: string;
    lowestBillInd?: string;
    parentBillNbr?: string;
    partShipmentInd?: string;
    grossWeight?: string;
    sacInd?: string;
    stsCargoStatusCode?: string;
    examFindResultCode?: string;
    positiveFindInd?: string;
}

export { IAirCargoActivity as default, IAirCargoActivity };