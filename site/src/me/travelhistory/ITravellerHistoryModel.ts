import ISyncModel from "common/ISyncModel"
import ITravellerHistory from "risk/traveller/iat/response/ITravellerHistory";
import IVisaInfo from "risk/traveller/iat/common/IVisaInfo";
import IPassportInfo from "risk/traveller/iat/common/IPassportInfo";
import IAlertInfo from "risk/traveller/iat/IAlertInfo";
import IBioDataInfo from "risk/traveller/iat/common/IBioDataInfo";
import IBagsExamResultInfo from "risk/traveller/iat/IBagsExamResultInfo";
import IMovementInfo from "risk/traveller/iat/IMovementInfo";
import IAlertMovementInfo from "risk/traveller/iat/IAlertMovementInfo";

interface IITravelerHistoryMovementDetails extends IMovementInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
}

interface IITravelerHistoryVisasDetails extends IVisaInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
}

interface IITravelerHistoryPassportsDetails extends IPassportInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
    resBio?: string;
}

interface IITravelerHistoryAlertsDetails extends IAlertInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
}

interface IITravelerHistoryAlertsHistoryDetails extends IAlertMovementInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
}

interface IITravelerHistoryBioDataDetails extends IBioDataInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
}

interface IITravelerHistoryBagsExamDetails extends IBagsExamResultInfo {
    passengerTatoo?: number;
    iatTravellerId?: string;
}

interface ITravellerHistoryModel {
    sync: ISyncModel;
    historyItems: ITravellerHistory[];
    visas: IITravelerHistoryVisasDetails[];
    passports: IITravelerHistoryPassportsDetails[];
    alerts: IITravelerHistoryAlertsDetails[];
    alertHistoryItems: IITravelerHistoryAlertsHistoryDetails[]
    bioDataItems: IITravelerHistoryBioDataDetails[];
    movementItems: IITravelerHistoryMovementDetails[];
    bagsExamResults: IITravelerHistoryBagsExamDetails[];
    load(iatTravellerIds: string[]): Promise<any>;
}

export { ITravellerHistoryModel as default, ITravellerHistoryModel,
    IITravelerHistoryMovementDetails,
    IITravelerHistoryVisasDetails,
    IITravelerHistoryPassportsDetails,
    IITravelerHistoryAlertsDetails,
    IITravelerHistoryBioDataDetails,
    IITravelerHistoryBagsExamDetails,
    IITravelerHistoryAlertsHistoryDetails
};