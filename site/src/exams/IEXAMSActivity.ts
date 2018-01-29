interface IEXAMSActivity {
    transportType?: string;
    masterBillNumber?: string;
    houseBillNumber?: string;
    entityExaminationRoleType?: string;
    examinationIdentifier?: string;
    billTyp?: string;
    currentDate?: string;
    goodsDescription?: string;
    consigneeName?: string;
    consigneeAddress?: string;
    consignorName?: string;
    consignorAddress?: string;
    selectionCriteriaDescription?: string;
    examStatus?: string;
    priorityType?: string;
    examPort?: string;
    examResultType?: string;
    toolsUsed?: string;
}

export { IEXAMSActivity as default, IEXAMSActivity }