import IPersonInfo from "./IPersonInfo";
import YesNo from "risk/traveller/common/YesNo";

interface IBioDataInfo {
    aliasSequenceNbr?: string;
    personInfo?: IPersonInfo;
    birthNameInd?: YesNo;
    citizenshipNameInd?: YesNo;
    currentNameInd?: YesNo;
    buildCode?: string;
    complexionCode?: string;
    ethnicityCode?: string;
    eyeColourCode?: string;
    travellerBookability?: string;
    travellerTypeCode?: string;
    validityPeriodEndDateTime?: Date;
    validityPeriodStartDateTime?: Date;
    lastUpdateDate?: Date;
    sourceFileCode?: string;
}

export { IBioDataInfo as default, IBioDataInfo }