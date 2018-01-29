import ISyncModel from "common/ISyncModel";
import IMECase from "./IMECase";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";

interface ICruiseBookingModel {
    sync: ISyncModel;
    meCase : IMECase;
    booking: ICruiseBookingData;
    load(meCase : IMECase): Promise<any>;
    refresh() : Promise<any>;
}

export { ICruiseBookingModel as default, ICruiseBookingModel };