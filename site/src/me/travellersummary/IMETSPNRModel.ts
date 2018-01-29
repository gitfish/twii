import IHistoricalPNRRecord from "risk/traveller/pnr/IHistoricalPNRRecord";
import IMatchedIATTraveller from "risk/traveller/pnr/IMatchedIATTraveller";
import ISyncModel from "common/ISyncModel";
import IMECase from "me/IMECase";

interface IMETSPNRModel {
    pnrRecords: IHistoricalPNRRecord[];
    matchedIATTravellers: IMatchedIATTraveller[];
    sync: ISyncModel;
    visible: boolean;
    loadByCaseId(meCase: IMECase): Promise<any>;
    setVisibility(_visible: boolean): void;
}

export { IMETSPNRModel as default, IMETSPNRModel }
