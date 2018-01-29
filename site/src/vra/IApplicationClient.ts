interface IApplicationClient {
    applicationClientRoleId?: string;
    ICSEClientId?: string;
    sourceClientName?: string;
    clientBirthDate?: string;
    clientGenderCode?: string;
    clientCitzenshipCountryCode?: string;
    clientRiskLevelCode?: string;
    clientRoleTypeDesc?: string;
    clientLocationCode?: string;
    applicationOutcomeCode?: string;
}

export { IApplicationClient as default, IApplicationClient };