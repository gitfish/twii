import IPersonInfo from "risk/traveller/iat/common/IPersonInfo";

interface ICheckInInfo {
    personInfo?: IPersonInfo;
    CheckinSequence?: string;
    checkInAgent?: string;
    canberraCheckInDateTime?: Date;
    checkInCountryCode?: string;
    checkInCountryName?: string;
    checkInDateTime?: Date;
    checkInPortCode?: string;
}

export { ICheckInInfo as default, ICheckInInfo }