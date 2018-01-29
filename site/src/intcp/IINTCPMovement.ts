interface IINTCPMovement {
    targetSubjectId?: string;
    sequenceNumber?: string;
    relationshipClass?: string;
    relationshipType?: string;
    portNameWhereOccurred?: string;
    departureDate?: string;
    atPortDate?: string;
    movementInType?: string;
    movementOutType?: string;
    expectedOrConfirmedInd?: string;
    outwardPortName?: string;
    nextPortName?: string;
    lloydsNumber?: string;
    craftName?: string;
    vesselType?: string;
    travelDocumentNumber?: string;
    travelDocumentType?: string;
    numberofInfoReportsAssociatedWithTheSubject?: string;
}

export { IINTCPMovement as default, IINTCPMovement };