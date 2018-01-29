import ITravelDocInfo from "./ITravelDocInfo";
import YesNo from "risk/traveller/common/YesNo";

interface IPassportInfo {
    travelDocInfo?: ITravelDocInfo;
    departmentRunNbr?: string;
    documentImpoundIndicator?: YesNo;
    immigrationDirectiveCode?: string;
    lastUpdateDate?: Date;
    passportIssueDate?: Date;
    passportIssueOfficeCode?: string;
    passportStatusCode?: string;
    passportTypeCode?: string;
    sourceSystemCode?: string; 
}

export { IPassportInfo as default, IPassportInfo }