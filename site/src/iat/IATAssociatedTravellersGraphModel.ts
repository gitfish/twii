import { observable, action } from "mobx";
import IIATAssociatedTravellersGraphModel from "./IIATAssociatedTravellersGraphModel";

class IATAssociatedTravellersGraphModel implements IIATAssociatedTravellersGraphModel {
    @observable visible: boolean = false;
    nodes: any[];
    edges: any[];

    @action
    setVisible(visible: boolean) {
        this.visible = visible;
    }
}

export { IATAssociatedTravellersGraphModel as default, IATAssociatedTravellersGraphModel }