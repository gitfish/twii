
import ISyncModel from "../../../common/ISyncModel";

interface ITravellerRiskModel  {
    sync: ISyncModel;
    iatTravellerId: string;
    loadById(iatTravellerId : string) : void;
}

export { ITravellerRiskModel as default, ITravellerRiskModel }