import { observable, action } from "mobx";
import IMETravellerModel from "./IMETravellerModel";
import IMEAirTravellerModel from "./IMEAirTravellerModel";
import MEAirTravellerModel from "./MEAirTravellerModel";
import IMECruiseModel from "./cruise/IMECruiseModel";
import MECruiseModel from "./cruise/MECruiseModel";
import { IMECase, MEDomainType } from "./IMECase";

class METravellerModel implements IMETravellerModel {
    @observable air : IMEAirTravellerModel;
    @observable sea : IMECruiseModel;
    
    @action
    load(meCase : IMECase) : Promise<any> {
        if(meCase.DomainType === MEDomainType.Air) {
            this.sea = undefined;
            if(!this.air) {
                this.air = new MEAirTravellerModel();
            }
            return this.air.load(meCase);
        } else if(meCase.DomainType === MEDomainType.Sea) {
            this.air = undefined;
            if(!this.sea) {
                this.sea = new MECruiseModel();
            }
           return this.sea.load(meCase);
        } else {
            this.air = undefined;
            this.sea = undefined;
        }
        return Promise.resolve();
    }
    @action
    refresh() : Promise<any> {
        return Promise.all([
            this.air.refresh(),
            this.sea.refresh()
        ]);
    }
}

export { METravellerModel as default, METravellerModel }