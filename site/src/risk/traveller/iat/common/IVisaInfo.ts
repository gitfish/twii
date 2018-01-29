import ITravelDocInfo from "./ITravelDocInfo";
import IBasicVisaInfo from "./IBasicVisaInfo";
import YesNo from "risk/traveller/common/YesNo";

interface IVisaInfo {
    travelDocInfo?: ITravelDocInfo;
    basicVisaInfo?: IBasicVisaInfo;
    lastUpdatedDate?: Date;
    occupationCode?: string;
    SourceSystemCode?: string;
    visaApplicationId?: string;
    visaCheckCharacter?: string;
    visaEntriesAllowedCode?: string;
    visaEntriesMadeCount?: number;
    visaEntryExpiryDate?: Date;
    visaEvidenceNumber?: string;
    visaEvidenceStatusCode?: string;
    visaGrantCheckCharacter?: string;
    visaImmigrationDirectiveCode?: string;
    visaInformationText?: string;
    visaLawfulGrantNumber?: string;
    visaLawfulUntilDate?: Date;
    visaMigrantExpiryDate?: Date;
    visaMultiIssuedIndicator?: YesNo;
    visaPersonSeqNbr?: number;
    visaPhysicalEvidenceStatusCode?: string;
    visaResidenceCountryCode?: string;
    visaStatusCode?: string;
    visaStayPeriodText?: string;

}

export { IVisaInfo as default, IVisaInfo }