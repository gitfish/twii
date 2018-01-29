import IMEAirTravellerModel from "./IMEAirTravellerModel";
import IMECase from "./IMECase";
import IMECruiseModel from "./cruise/IMECruiseModel";

interface IMETravellerModel {
    air?: IMEAirTravellerModel;
    sea?: IMECruiseModel;
    load(meCase : IMECase) : Promise<any>;
    refresh() : Promise<any>;
}

export { IMETravellerModel as default, IMETravellerModel }