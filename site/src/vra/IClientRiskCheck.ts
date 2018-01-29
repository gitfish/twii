interface IClientRiskCheck {
    sourceClientId: string;
    permissionRequestId?: string;
    applicationTypeCode?: string;
    clientRoleTypeDesc?: string;
    clientRiskLevelCode?: string;
    clientRiskPerformedTimestamp?: string;
    applicationStageCode?: string;
    applicationOutcomeCode?: string;
    visaSubClassCode?: string;
    visaStreamCode?: string;
    eventTypeCode?: string;
    clientLocationCode?: string;
    clientName?: string;
    clientBirthDate?: string;
    clientGenderCode?: string;
    clientNameVds?: string;
    clientBirthDateVds?: string;
    clientGenderCodeVds?: string;
}

export { IClientRiskCheck as default, IClientRiskCheck };