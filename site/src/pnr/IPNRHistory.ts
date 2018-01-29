import IPNRKey from "./IPNRKey";

interface IPNRHistory extends IPNRKey {
    newPnrEnvelopeNbr?: string;
    pnrElement?: string;
    historyCreatorIataCode?: string;
    historyCreationTimestamp?: string;
    historyData?: string;
    actionCode?: string;
    updateActionCode?: string;
    previousPnrEnvelopeNbr?: string;
    historyCreationCityCode?: string;
    historyCreationCompanyId?: string;
    historyCreatorId?: string;
}

export { IPNRHistory as default, IPNRHistory }