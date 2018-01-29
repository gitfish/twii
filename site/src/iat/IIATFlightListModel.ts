import ISyncModel from "common/ISyncModel";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IIATMovement from "./IIATMovement";
import IIATFlightListItem from "./IIATFlightListItem";
import IIATAssociatedTraveller from "./IIATAssociatedTraveller";
import IIATAssociatedTravellersGraphModel from "./IIATAssociatedTravellersGraphModel";

interface IIATFlightListModel {
    visible: boolean;
    sync: ISyncModel;
    masterEntity: IMasterEntityModel;
    movements: IIATMovement[];
    flightListMap: { [key : string] : IIATFlightListItem[] };
    associatedTravellers : IIATAssociatedTraveller[];
    associatedTravellersGraphModel: IIATAssociatedTravellersGraphModel;
    loadForMovements(masterEntity: IMasterEntityModel, movements : IIATMovement[]) :  Promise<any>;
    getItems(movement : IIATMovement) : IIATFlightListItem[];
    setVisible(visible : boolean) : void;
}

export { IIATFlightListModel as default, IIATFlightListModel };