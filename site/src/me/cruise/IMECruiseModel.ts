import IMECase from "me/IMECase";
import ICruiseBookingModel from "../ICruiseBookingModel";
import IProfileMatchModel from "me/profilematch/IProfileMatchModel";
import ITravellerHistoryModel from "me/travelhistory/ITravellerHistoryModel";

interface IMECruiseModel {
    meCase: IMECase;
    bookingModel: ICruiseBookingModel;
    profileMatchModel: IProfileMatchModel;
    travellerHistoryModel: ITravellerHistoryModel;
    load(meCase: IMECase): Promise<any>;
    refresh() : Promise<any>;
}

export { IMECruiseModel as default, IMECruiseModel }
