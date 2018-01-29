interface IBagsExamResultInfo {
    localScheduledDate?: Date;
    routeId?: string;
    examinationNbr?: string;
    targettingMethod?: string;
    alertNumber?: string;
    highestResultsType?: string;
    examinationResultType?: string;
    findMethod?: string;
    baggageLocation?: string;
    notes?: string;
    outcomeType?: string;
    quantityValue?: number;
    quantityUnit?: string;
}

export { IBagsExamResultInfo as default, IBagsExamResultInfo }