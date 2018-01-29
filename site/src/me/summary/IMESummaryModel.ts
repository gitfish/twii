import ISyncModel from "common/ISyncModel";
import IMECase from "me/IMECase";
import IPNRRecord from "risk/traveller/pnr/IPNRRecord";
import IBaggage from "risk/traveller/pnr/IBaggage";
import ICheckinBoarding from "risk/traveller/pnr/ICheckinBoarding";
import ITravellerSummary from "risk/traveller/pnr/ITravellerSummary";
import IPNRRecordKey from "risk/traveller/pnr/IPNRRecordKey";
import ISKOtherComment from "risk/traveller/pnr/ISKOtherComment";
import IOtherService from "risk/traveller/pnr/IOtherService";
import IPayment from "risk/traveller/pnr/IPayment";
import IPNRHistory from "risk/traveller/pnr/IPNRHistory";
import IPNRPushHistory from "risk/traveller/pnr/IPNRPushHistory";
import ISpecialServiceRequest from "risk/traveller/pnr/ISpecialServiceRequest";
import ITravelAgent from "risk/traveller/pnr/ITravelAgent";
import IContact from "risk/traveller/pnr/IContact";
import IItinerary from "risk/traveller/pnr/IItinerary";
import IHistoricalPNRRecord from "risk/traveller/pnr/IHistoricalPNRRecord";
import IBookingSummary from "risk/traveller/pnr/IBookingSummary";

interface IMESummaryModel  {
    visible: boolean;
    sync: ISyncModel;
    bookingSummary: IPNRRecord;
    meCase: IMECase;
    historicalPNRItemBookingSummary: IPNRRecord;
    baggageItems: IBaggage[];
    checkinNboardingItems: ICheckinBoarding[];
    linkedPNRItems: IPNRRecordKey[];
    splitPNRItems: IPNRRecordKey[];
    travelSummaryItems: ITravellerSummary[];
    otherCommentInfo: ISKOtherComment[];
    otherServiceInfo: IOtherService[];
    paymentItems: IPayment[];
    pnrHistoryItems: IPNRHistory[];
    pushHistoryItems: IPNRPushHistory[];
    specialServiceReqInfo: ISpecialServiceRequest[];
    travelAgents: ITravelAgent[];
    travelContacts: IContact[];
    activeItineraryItems: IItinerary[];
    loadByCaseId(meCase: IMECase) : Promise<any>;
    loadByHistoricalPNRItem(item : IHistoricalPNRRecord): Promise<any>
    getHistoricalPNRSummary(): IBookingSummary;
    setVisibility(_visible: boolean): void;
}

export { IMESummaryModel as default, IMESummaryModel };
