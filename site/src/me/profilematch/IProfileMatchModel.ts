import IProfileMatch from "risk/traveller/profilematchdataservice/response/IProfileMatch";
import ISyncModel from "common/ISyncModel";
import IMECase from "me/IMECase";

interface IIProfileMatch extends IProfileMatch {
    passengerTatoo?: number;
    passengerNumber?: number;
}


interface IProfileMatchModel {
    profileMatches: IIProfileMatch[];
    historicalProfileMatches: IIProfileMatch[];
    currentProfileMatches: IIProfileMatch[];
    sync: ISyncModel;
    loadProfileMatches(meCase: IMECase) : Promise<any>;
    refresh() : Promise<any>;
}

export { IProfileMatchModel as default, IProfileMatchModel, IIProfileMatch};