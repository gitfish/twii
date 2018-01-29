interface IIATMovement {
    IATTravellerId?: string;
    localScheduledDate?: string;
    directionCode?: string;
    localPortCode?: string;
    checkinPortCode?: string;
    routeId?: string;
    movementStatusCode?: string;
    movementTime?: string;
    travelDocumentId?: string;
    travelDocDeptCountryCode?: string;
    visaSubClassCd?: string;
    visaIdentifyingNbr?: string;
    travelMovementTypeCd?: string;
    movementRaceId?: string;
    alertInd?: string;
    examinationInd?: string;
}

export { IIATMovement as default, IIATMovement };