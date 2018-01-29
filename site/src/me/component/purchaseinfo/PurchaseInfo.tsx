
import * as React from 'react';
import { observer } from "mobx-react";
import "./PurchaseInfo.scss";
import * as StringUtils from "util/String";
import { IPNRRecord } from "risk/traveller/pnr/IPNRRecord";
import {LinkedPNRItem} from "./LinkedPNRItem";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as Icons from "icon/AnalystDesktopIcons";
import {MEDetailsAttribute, MEPNRSummaryDetailsAttribute, MEPNRDialogItems} from "me/component/common/MEDetailsAttribute";
import * as DateUtils from "util/Date";
import IBookingSummary from "risk/traveller/pnr/IBookingSummary";
import Error from "common/component/Error";
import IMESummaryModel from "me/summary/IMESummaryModel";
import { Details } from "common/component/Details";
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import METSPNRStore from "me/travellersummary/METSPNRStore";
import "me/component/purchaseinfo/HistoricalPNRSummary.scss";
import ViewPreferencesModel from "common/ViewPreferencesModel";

interface IPurchaseInfoProps {
    model?: IMESummaryModel;
}

const HistoricalPNRSummaryFields: IDetailsAttributeConfig<IBookingSummary>[] = [
    {
        key: "BookingDate",
        name: "Booking Date",
        onRender: function(item : IBookingSummary) {
            return <MEPNRSummaryDetailsAttribute label={this.name} value={item.BookingDate ? DateUtils.dateToOutputText(item.BookingDate) : ""}/>;
        }
    },
    {
        key: "OriginalBookingDBT",
        name: "Original Ticket Lead Time"
    },
    {
        key: "CurrentBookingDBT",
        name: "Current Ticket Lead Time"
    },
    {
        key: "FormOfPayment",
        name: "Form Of Payment"
    },
    {
        key: "BookingCity",
        name: "Booking City"
    },
    {
        key: "PNRTravelType",
        name: "PNR Travel Type"
    },
    {
        key: "MostTimeSpentPort",
        name: "Most Time Spent Port"
    },
    {
        key: "MostTimeSpentCountry",
        name: "Most Time Spent Country"
    },
    {
        key: "MostTimeSpentDays",
        name: "Most Time Spent Days"
    },

    {
        key: "IntentToTravelDate",
        name: "Intent To Travel",
        onRender: function(item : IBookingSummary) {
            return <MEPNRSummaryDetailsAttribute label={this.name} value={item.IntentToTravelDate ? DateUtils.dateToOutputText(item.IntentToTravelDate) : ""}/>;
        }
    },
    {
        key: "TotalLengthOfStay",
        name: "Total Length Of Stay"
    },
    {
        key: "IntendLengthOfStay",
        name: "Intended Length Of Stay"
    },

    {
        key: "TotalLengthOfTrip",
        name: "Total Length Of Trip"
    },
    {
        key: "TotalIntendedLengthOfTrip",
        name: "Intended Length Of Trip"
    },
    {
        key: "TotalLengthOfTravel",
        name: "Overall Length Of Travel"
    },
    {
        key: "ActiveSegmentCount",
        name: "Active Segment"
    },
    {
        key: "CancelledSegmentCount",
        name: "Cancelled Segment"
    },

    {
        key: "TravellerCount",
        name: "Traveller Count"
    },
    {
        key: "TCPNumber",
        name: "TCP"
    },
    {
        key: "MinorsInGroupCount",
        name: "Minors In Group"
    },
    {
        key: "TravelGroupName",
        name: "Group Name"
    },

    {
        key: "DepartureCanberraTimeStamp",
        name: "Departure Canberra TimeStamp",
        onRender: function(item : IBookingSummary) {
            return <MEPNRSummaryDetailsAttribute label={this.name} value={item.DepartureCanberraTimeStamp ? DateUtils.dateToOutputText(item.DepartureCanberraTimeStamp) : ""}/>;
        }
    }
];

const HistoricalPNRItemDetailsViewPrefsStore = new ViewPreferencesModel("historicalPNRItemDetails");

@observer
class PNRBookingsummaryDialog extends React.Component<IPurchaseInfoProps, any> {
    private travellerSummaryModel = METSPNRStore;
    _handleDialogClose = () => {
        this.travellerSummaryModel.setVisibility(false);
    };

    render() {
        let pnrSummaryContent = <Spinner label="Loading ..." className="load-spinner" />;
        if(this.travellerSummaryModel.sync.syncing) {
            pnrSummaryContent = <Spinner label="Loading ..." className="load-spinner" />;
        } else if(this.travellerSummaryModel.sync.error) {
            pnrSummaryContent = <Error error={this.travellerSummaryModel.sync.error} />
        } else if(this.travellerSummaryModel.sync.hasSynced) {
            var historicalInfo: IBookingSummary = this.props.model.getHistoricalPNRSummary();
            if(historicalInfo) {
                pnrSummaryContent = <MEPNRDialogItems model={historicalInfo} attrConfig={HistoricalPNRSummaryFields}
                                                 viewPrefModel={HistoricalPNRItemDetailsViewPrefsStore}/>

            }
        }
        return (
            <Dialog hidden={ !this.travellerSummaryModel.visible } onDismiss={this._handleDialogClose}
                    dialogContentProps={{ type: DialogType.normal, title: 'PNR View Summary' }}
                    modalProps={{ isBlocking: false, className: "historical-pnr-item-summary-dialog" }}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.BOOKINGS/>} {'PNR Search Summary Details'}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("historical-pnr-item-details-header")}
                         bodyClassName="historical-pnr-item-details-body">
                    <div className="details-item">
                        {pnrSummaryContent}
                    </div>
                </Details>
            </Dialog>
        );
    }
}


const PurchaseInfoFields = [
    {
        key: "BookingDate",
        name: "Booking Date",
        headerClassName:"purchase-info-list-header",
        onRender: (source: IPNRRecord, field: any) => {
            var bookingDt = source.BookingSummaryInfo ? DateUtils.dateToOutputText(source.BookingSummaryInfo.BookingDate)? DateUtils.dateToOutputText(source.BookingSummaryInfo.BookingDate) : "-": "-";
            return <MEDetailsAttribute label={field.name} value={bookingDt}/>;
        }
    },
    {
        key: "OriginalBookingDBT",
        name: "Original Ticket Lead Time",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute  label={field.name}
                                              value={source.BookingSummaryInfo? source.BookingSummaryInfo.OriginalBookingDBT ? source.BookingSummaryInfo.OriginalBookingDBT : "-": "-"} />
        }

    },
    {
        key: "CurrentBookingDBT",
        name: "Current Ticket Lead Time",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            var currentBookingDBT = source.BookingSummaryInfo ? source.BookingSummaryInfo.CurrentBookingDBT: 0;
            var originalBookingDBT = source.BookingSummaryInfo ? source.BookingSummaryInfo.OriginalBookingDBT: 0;
            return <MEDetailsAttribute label={field.name}
                                              value={currentBookingDBT+originalBookingDBT}/>;
        }
    },
    {
        key: "FormOfPayment",
        name: "Form of Payment",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                              value={source.BookingSummaryInfo ? source.BookingSummaryInfo.FormOfPayment? source.BookingSummaryInfo.FormOfPayment  : "-": "-"}/>;
        }
    },
    {
        key: "PaymentCurrency",
        name: "Payment Currency",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            let payType = "-";
            if(source.PaymentInfo != null) {
                source.PaymentInfo.Payment.forEach((pay) => {
                    if(StringUtils.equalsIgnoreCase(pay.Type, "Total Fare")) payType = pay.Currency + " Total Fare ";
                });
            }
            return <MEDetailsAttribute label={field.name} value={payType}/>;
        }
    },
    {
        key: "BookingCity",
        name: "Booking City",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                              value={source.BookingSummaryInfo ? source.BookingSummaryInfo.BookingCity? source.BookingSummaryInfo.BookingCity : "-": "-"}/>;
        }
    },
    {
        key: "AgentCity",
        name: "Creator Agent City & Country",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            let agentLoc = "";
            if(source.TravelAgentInfo != null) {
                source.TravelAgentInfo.TravelAgent.forEach((travelAgent) => {
                    if (StringUtils.equalsIgnoreCase(travelAgent.RoleTypeCode, "CREATOR")) agentLoc = travelAgent.Location ;
                });
            }
            return <MEDetailsAttribute label={field.name} value={agentLoc}/>;
        }
    },
    {
        key: "AgentName",
        name: "Agent Name & IATA",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            let agentNamenIATACd = "";
            if(source.TravelAgentInfo != null) {
                source.TravelAgentInfo.TravelAgent.forEach((travelAgent) => {
                    if (StringUtils.equalsIgnoreCase(travelAgent.RoleTypeCode, "CREATOR")) agentNamenIATACd = travelAgent.AgentName +" "+ travelAgent.IATAAgentCode;
                });
            }
            return <MEDetailsAttribute label={field.name} value={agentNamenIATACd}/>;
        }
    },
    {
        key: "Lin kedPNRInfo",
        name: "Linked PNRs ",
        headerClassName:"purchase-info-list-header",
        isMultiline: true,
        onRender: (source: any, field: any) => {
            var currentPNRS = source.LinkedPNRInfo ? source.LinkedPNRInfo.PNRRecordKey? source.LinkedPNRInfo.PNRRecordKey : [] :[];
            let temp: JSX.Element;
            temp = currentPNRS.map((pnrInfo, idx) => {
                return (<LinkedPNRItem key={pnrInfo.RecordLocator + pnrInfo.BookingSystemCode + pnrInfo.PNRCreationTimeStamp} linkedPNR={pnrInfo} index = {idx} />)
            })
            return <MEDetailsAttribute label={field.name} value= {temp}/>;
        }
    },
    {
        key: "SplitPNRInfo",
        name: "Split PNRs ",
        headerClassName:"purchase-info-list-header",
        onRender: (source: any, field: any) => {
            var currentPNRS = source.SplitPNRInfo ? source.SplitPNRInfo.PNRRecordKey? source.SplitPNRInfo.PNRRecordKey : [] :[];
            let temp: JSX.Element;
            temp = currentPNRS.map((pnrInfo, idx) => {
                return (<LinkedPNRItem key={pnrInfo.RecordLocator + pnrInfo.BookingSystemCode + pnrInfo.PNRCreationTimeStamp} linkedPNR={pnrInfo} index = {idx} />)
            })
            return <MEDetailsAttribute label={field.name} value= {temp}/>;
        }
    }

];

@observer
class PurchaseInfo extends React.Component<IPurchaseInfoProps, any> {
    render() {
        let content: any = <div> No data available to display</div>;
        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.bookingSummary!=null && this.props.model.bookingSummary!=undefined) {
                content = PurchaseInfoFields.map((field: any) => {
                    if (field.onRender) {
                        return field.onRender(this.props.model.bookingSummary, field);
                    }
                });
            }
        }
        return (<div>
                <PNRBookingsummaryDialog model={this.props.model} />
                <Details className={css("purchase-info", "me-section")}
                         summary={<div>{<Icons.BOOKINGS/>} Purchase Information </div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("purchase-info-ribbon")}>
                    <div className="me-purchase-info">
                        {content}
                    </div>
                </Details>
            </div>
        );
    }
}

export {PNRBookingsummaryDialog as default, PNRBookingsummaryDialog, PurchaseInfo}
