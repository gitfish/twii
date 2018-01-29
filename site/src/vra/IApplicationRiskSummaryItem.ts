interface IApplicationRiskSummaryItem {
    permissionRequestId: string;
    applicationRiskLevelCode?: string;
    applicationRiskPerformedTimestamp?: string;
    visaSubClassCode?: string;
    visaStreamCode?: string;
    visaClassCode?: string;
    applicationTypeCode?: string;
    applicationStageCode?: string;
    applicationOutcomeCode?: string;
}

export { IApplicationRiskSummaryItem as default, IApplicationRiskSummaryItem };