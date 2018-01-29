interface IDGMSActivity {
    dgmsNumber?: string;
    clientId?: string;
    dealerId?: string;
    startTimestamp?: string;
    dateDetected?: string;
    isDeclared?: string;
    detentionNumber?: string;
    detentionDescription?: string;
    seizureDescription?: string;
    detentionModeDescription?: string; // NOTE: this is actually the detection mode
    modeOfConcealment?: string;
    modeOfEntry?: string;
    port?: string;
    dealer?: string;
    goodsDeclarationDescription?: string;
}

export { IDGMSActivity as default, IDGMSActivity };