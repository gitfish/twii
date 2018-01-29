interface IAlertInfo {
    alertNumber?: string;
    alertStatusCode?: string;
    accessCategoryCode?: string;
    issueDate?: Date;
    departmentCode?: string;
    FIDInAction?: string;
    FIDOutAction?: string;
    BIDInAction?: string;
    BIDOutAction?: string;
    suspectType?: string;
    FIDInNarrative?: string;
    FIDOutNarrative?: string;
    FIDBothNarrative?: string;
}

export { IAlertInfo as default, IAlertInfo }