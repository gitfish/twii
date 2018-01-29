interface IProfileMatchSummary {
    profileId?: string;
    profileDescription?: string;
    alertMessage?: string;
    threat?: string;
    thresholdScore?: string;
    sourceSystem?: string;
    riskTier?: string;
}

export { IProfileMatchSummary as default, IProfileMatchSummary };