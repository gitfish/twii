import ISyncModel from "common/ISyncModel";
import IIATAAgency from "./IIATAAgency";
import IIATAAgencyDetail from "./IIATAAgencyDetail";

interface IIATAAgencyDetailModel {
    visible: boolean;
    sync: ISyncModel;
    total : number;
    items: IIATAAgencyDetail[];
    agency: IIATAAgency;
    load(agency : IIATAAgency) :  Promise<any>;
    setVisible(visible: boolean) : void;
}

export { IIATAAgencyDetailModel as default, IIATAAgencyDetailModel };