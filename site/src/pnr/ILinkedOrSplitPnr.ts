import IPNRKey from "./IPNRKey";

interface ILinkedOrSplitPnr extends IPNRKey{
    pnrRelationshipTypeDescription?: string;
    relatedPnrCreationTimestamp?: string;
    relatedPnrBookingSystemCode?: string;
    relatedPnrRecordLocator?: string;
    relatedPnrCreationTimestampHms?: string;
}

export { ILinkedOrSplitPnr as default, ILinkedOrSplitPnr }