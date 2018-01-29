interface IApplicationClientRiskSummaryItem {
    applicationClientRoleId: string;
    sourceClientId?: string;
    permissionRequestId?: string;
    clientRiskLevelCode?: string;
    clientRiskPerformedTimestamp?: string;
    applicationStageCode?: string;
    applicationTypeCode?: string;
    channelCode?: string;
    visaSubClassCode?: string;
    visaStreamCode?: string;
    visaClassCode?: string;
    clientRoleTypeDesc?: string;
    clientLocationCode?: string;
    clientName?: string;
    clientGenderCode?: string;
    clientBirthDate?: string;
    eventSourceCode?: string;
    eventTypeCode?: string;
    riskSystemCode?: string;
    sourceSystemCode?: string;
    sourceClientNameVDS?: string;
    clientBirthDateVDS?: string;
    clientGenderCodeVDS?: string;
}

export { IApplicationClientRiskSummaryItem as default, IApplicationClientRiskSummaryItem };