import { observable, action, computed } from "mobx";
import IGetCurrentBookingDataRequest from "risk/traveller/pnr/request/IGetCurrentBookingDataRequest";
import PNRDataServiceContext from "risk/traveller/pnr/PNRDataServiceContext";
import IPNRRecord from "risk/traveller/pnr/IPNRRecord";
import IBaggage from "risk/traveller/pnr/IBaggage";
import ICheckinBoarding from "risk/traveller/pnr/ICheckinBoarding";
import ISKOtherComment from "risk/traveller/pnr/ISKOtherComment";
import IOtherService from "risk/traveller/pnr/IOtherService";
import ITravellerSummary from "risk/traveller/pnr/ITravellerSummary";
import IPayment from "risk/traveller/pnr/IPayment";
import IPNRHistory from "risk/traveller/pnr/IPNRHistory";
import IPNRPushHistory from "risk/traveller/pnr/IPNRPushHistory";
import ITravelAgent from "risk/traveller/pnr/ITravelAgent";
import IItinerary from "risk/traveller/pnr/IItinerary";
import ISpecialServiceRequest from "risk/traveller/pnr/ISpecialServiceRequest";
import IContact from "risk/traveller/pnr/IContact";
import IBookingSummary from "risk/traveller/pnr/IBookingSummary";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import * as DateUtils from "util/Date";
import { IMECase } from "me/IMECase";
import IMESummaryModel from "me/summary/IMESummaryModel";
import IHistoricalPNRRecord from "risk/traveller/pnr/IHistoricalPNRRecord";
import IPNRRecordKey from "risk/traveller/pnr/IPNRRecordKey";

class MESummaryModel implements IMESummaryModel{

    @observable bookingSummary: IPNRRecord;
    @observable sync: ISyncModel = new SyncModel();
    @observable historicalPNRItemBookingSummary: IPNRRecord;
    @observable visible: boolean = false;
    private historicalPNRItem: IHistoricalPNRRecord;
    private linkedPNRItem: IPNRRecordKey;
    meCase: IMECase;

    @action
    refresh() : Promise<any> {
        const syncId = this.meCase.CaseID;
        this.sync.syncStart({ id: syncId });
        let request: IGetCurrentBookingDataRequest = {
            BookingSystemCode : this.meCase.BookingSystemCode,
            BookingCreationTimeStamp : DateUtils.dateFromMatchEvaluationDataText(this.meCase.CreationTs),
            RecordLocator : this.meCase.RecordLocator
        };
        return PNRDataServiceContext.ref.GetCurrentBookingData(request)
            .then((bookingData) => {
                    this.bookingSummary = bookingData.CurrentBookingData;
                    this.sync.syncEnd();

            }).catch((error) => {
                    this.bookingSummary = undefined;
                    this.sync.syncError(error);

            });
    }

    @action
    getBookingSummaryForHPNR() : Promise<any> {
        const syncId = this.historicalPNRItem.RecordLocator;
        this.sync.syncStart({ id: syncId });
        let request: IGetCurrentBookingDataRequest = {
            BookingSystemCode : this.historicalPNRItem.Carrier,
            BookingCreationTimeStamp : this.historicalPNRItem.CreationTimeStamp,
            RecordLocator : this.historicalPNRItem.RecordLocator
        };
        return PNRDataServiceContext.ref.GetCurrentBookingData(request)
            .then((bookingData) => {
                    this.historicalPNRItemBookingSummary = bookingData.CurrentBookingData;
                    this.sync.syncEnd();

            }).catch((error) => {
                    this.historicalPNRItemBookingSummary = undefined;
                    this.sync.syncError(error);

            });
    }
    @action
    getBookingSummaryForLinkedPNR() : Promise<any> {
        const syncId = this.linkedPNRItem.RecordLocator;
        this.sync.syncStart({ id: syncId });
        let request: IGetCurrentBookingDataRequest = {
            BookingSystemCode : this.linkedPNRItem.BookingSystemCode,
            BookingCreationTimeStamp : this.linkedPNRItem.PNRCreationTimeStamp,
            RecordLocator : this.linkedPNRItem.RecordLocator
        };
        return PNRDataServiceContext.ref.GetCurrentBookingData(request)
            .then((bookingData) => {
                    this.historicalPNRItemBookingSummary = bookingData.CurrentBookingData;
                    this.sync.syncEnd();

            }).catch((error) => {
                    this.historicalPNRItemBookingSummary = undefined;
                    this.sync.syncError(error);

            });

    }

    setVisibility(_visible: boolean) {
        this.visible = _visible;
    }

    loadByCaseId(meCase: IMECase) : Promise<any> {
        const syncId = meCase.CaseID;
        if(meCase.RecordLocator && meCase.BookingSystemCode && meCase.CreationTs) {
                this.meCase = meCase;
                return this.refresh();
        } else {
            this.bookingSummary = {};
        }
        return Promise.resolve();
    }

    /* for historial pnr : pnr link */
    loadByHistoricalPNRItem(item : IHistoricalPNRRecord | IPNRRecordKey): Promise<any> {
        const syncId = item.RecordLocator;
            this.historicalPNRItem = item;
            return this.getBookingSummaryForHPNR();

    }

    /* for purchase info pnr link */
    loadByLinkedPNRItem(item : IPNRRecordKey): Promise<any> {
        const syncId = item.RecordLocator;
            this.linkedPNRItem = item;
            return this.getBookingSummaryForLinkedPNR();

    }

    getHistoricalPNRSummary(): IBookingSummary {
        if(this.historicalPNRItemBookingSummary && this.historicalPNRItemBookingSummary.BookingSummaryInfo)
            return this.historicalPNRItemBookingSummary.BookingSummaryInfo;
        return;
    }
    @computed
    get baggageItems(): IBaggage[] {
        let baggageItems: IBaggage[] = [];
        if(this.bookingSummary && this.bookingSummary.ItineraryInfo && this.bookingSummary.ItineraryInfo.Itinerary) {
            this.bookingSummary.ItineraryInfo.Itinerary.forEach((itinerary) => {
                if (itinerary.CheckinBoardingInfo && itinerary.CheckinBoardingInfo.CheckingBoarding) {
                    itinerary.CheckinBoardingInfo.CheckingBoarding.forEach((boarding) => {
                    if (boarding.BaggageInfo)
                        baggageItems.push(boarding.BaggageInfo);
                    });
                }
            });
        }
        return baggageItems;
    }

    @computed
    get checkinNboardingItems(): ICheckinBoarding[] {
        let checkinNboardingItems: ICheckinBoarding[] = [];
        if(this.bookingSummary && this.bookingSummary.ItineraryInfo && this.bookingSummary.ItineraryInfo.Itinerary) {
            this.bookingSummary.ItineraryInfo.Itinerary.forEach((itinerary) => {
                if (itinerary.CheckinBoardingInfo && itinerary.CheckinBoardingInfo.CheckingBoarding) {
                    itinerary.CheckinBoardingInfo.CheckingBoarding.forEach((boarding) => {
                        checkinNboardingItems.push(boarding);
                    });
                }
            });
        }
        return checkinNboardingItems;
    }

    @computed
    get linkedPNRItems(): IPNRRecordKey[] {
        let linkedPNRItems: IPNRRecordKey[] = [];
        if(this.bookingSummary && this.bookingSummary.LinkedPNRInfo && this.bookingSummary.LinkedPNRInfo.PNRRecordKey)
            this.bookingSummary.LinkedPNRInfo.PNRRecordKey.forEach((linkedPNR) => {
                linkedPNRItems.push(linkedPNR);
            });
        return linkedPNRItems;
    }

    @computed
    get splitPNRItems(): IPNRRecordKey[] {
        let splitPNRItems: IPNRRecordKey[] = [];
        if(this.bookingSummary && this.bookingSummary.SplitPNRInfo && this.bookingSummary.SplitPNRInfo.PNRRecordKey)
            this.bookingSummary.SplitPNRInfo.PNRRecordKey.forEach((splitPNR) => {
                splitPNRItems.push(splitPNR);
            });
        return splitPNRItems;
    }

    @computed
    get travelSummaryItems(): ITravellerSummary[] {
        let travelSummaryItems: ITravellerSummary[] = [];
        if(this.bookingSummary && this.bookingSummary.TravellerInfo && this.bookingSummary.TravellerInfo.TravellerSummary) {
            this.bookingSummary.TravellerInfo.TravellerSummary.forEach((travelSummary) => {
                travelSummaryItems.push(travelSummary);
            });
        }
        return travelSummaryItems;
    }

    @computed
    get activeItineraryItems(): IItinerary[] {
        let activeItineraryItems: IItinerary[] = [];
        if(this.bookingSummary && this.bookingSummary.ItineraryInfo && this.bookingSummary.ItineraryInfo.Itinerary) {
            this.bookingSummary.ItineraryInfo.Itinerary.forEach((itinerary) => {
                activeItineraryItems.push(itinerary);
            });
        }
        return activeItineraryItems;
    }

    @computed
    get otherCommentInfo(): ISKOtherComment[] {
        let otherCommentInfo: ISKOtherComment[] = [];
        if(this.bookingSummary && this.bookingSummary.PNRSKOtherCommentInfo && this.bookingSummary.PNRSKOtherCommentInfo.SKOtherComment) {
            this.bookingSummary.PNRSKOtherCommentInfo.SKOtherComment.forEach((oComment) => {
                otherCommentInfo.push(oComment);
            });
        }
        return otherCommentInfo;
    }

    @computed
    get otherServiceInfo(): IOtherService[] {
        let otherServiceInfo: IOtherService[] = [];
        if(this.bookingSummary && this.bookingSummary.OtherServiceInfo && this.bookingSummary.OtherServiceInfo.OtherService) {
            this.bookingSummary.OtherServiceInfo.OtherService.forEach((oService) => {
                otherServiceInfo.push(oService);
            });
        }
        return otherServiceInfo;
    }

    @computed
    get paymentItems(): IPayment[] {
        let paymentItems: IPayment[] = [];
        if(this.bookingSummary && this.bookingSummary.PaymentInfo && this.bookingSummary.PaymentInfo.Payment) {
            this.bookingSummary.PaymentInfo.Payment.forEach((pay) => {
                paymentItems.push(pay);
            });
        }
        return paymentItems;
    }

    @computed
    get pnrHistoryItems(): IPNRHistory[] {
        let pnrHistoryItems: IPNRHistory[] = [];
        if(this.bookingSummary && this.bookingSummary.PNRHistoryInfo && this.bookingSummary.PNRHistoryInfo.PNRHistory) {
            this.bookingSummary.PNRHistoryInfo.PNRHistory.forEach((hist) => {
                pnrHistoryItems.push(hist);
            });
        }
        return pnrHistoryItems;
    }

    @computed
    get pushHistoryItems(): IPNRPushHistory[] {
        let pushHistoryItems: IPNRPushHistory[] = [];
        if(this.bookingSummary && this.bookingSummary.PNRPushHistoryInfo && this.bookingSummary.PNRPushHistoryInfo.PNRPushHistory) {
            this.bookingSummary.PNRPushHistoryInfo.PNRPushHistory.forEach((pushHist) => {
                pushHistoryItems.push(pushHist);
            });
        }
        return pushHistoryItems;
    }

    @computed
    get specialServiceReqInfo(): ISpecialServiceRequest[] {
        let specialServiceReqInfo: ISpecialServiceRequest[] = [];
        if(this.bookingSummary && this.bookingSummary.SpecialServiceRequestInfo && this.bookingSummary.SpecialServiceRequestInfo.SpecialServiceRequest) {
            this.bookingSummary.SpecialServiceRequestInfo.SpecialServiceRequest.forEach((ssRequest) => {
                specialServiceReqInfo.push(ssRequest);
            });
        }
        return specialServiceReqInfo;
    }

    @computed
    get travelAgents(): ITravelAgent[] {
        let travelAgents: ITravelAgent[] = [];
        if(this.bookingSummary && this.bookingSummary.TravelAgentInfo && this.bookingSummary.TravelAgentInfo.TravelAgent) {
            this.bookingSummary.TravelAgentInfo.TravelAgent.forEach((tAgent) => {
                travelAgents.push(tAgent);
            });
        }
        return travelAgents;
    }

    @computed
    get travelContacts(): IContact[] {
        let travelContacts: IContact[] = [];
        if(this.bookingSummary && this.bookingSummary.ContactInfo && this.bookingSummary.ContactInfo.Contact) {
            this.bookingSummary.ContactInfo.Contact.forEach((contact) => {
                travelContacts.push(contact);
            });
        }
        return travelContacts;
    }

}

export { MESummaryModel as default, MESummaryModel }