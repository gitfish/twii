import IListOfAlertInfo from "./IListOfAlertInfo";
import IListOfAlertMovementInfo from "./IListOfAlertMovementInfo";
import IListOfMovementInfo from "./IListOfMovementInfo";
import IListOfPassportInfo from "./IListOfPassportInfo";
import IListOfVisaInfo from "./IListOfVisaInfo";
import IListOfBioDataInfo from "./IListOfBioDataInfo";
import IListOfBagsExamResultInfo from "./IListOfBagsExamResultInfo";

interface ITravellerHistory {
    IATTravellerID?: string;
    ListOfPassportInfo?: IListOfPassportInfo;
    ListOfVisaInfo?: IListOfVisaInfo;
    ListOfBioDataInfo?: IListOfBioDataInfo;
    ListOfMovementInfo?: IListOfMovementInfo;
    ListOfAlertInfo?: IListOfAlertInfo;
    ListOfAlertMovementInfo?: IListOfAlertMovementInfo;
    ListOfBagsExamResultInfo?: IListOfBagsExamResultInfo;
}

export { ITravellerHistory as default, ITravellerHistory }