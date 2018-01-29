import * as React from 'react';
import { observer } from "mobx-react";
import "./CruiseBookingSummary.scss";
import "./CruiseBookingSummaryItemAttribute.scss";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";
import ICruiseSummary from "risk/traveller/cru/ICruiseSummary";
import IBookingSummary  from "risk/traveller/cru/IBookingSummary";
import * as DateUtils from "util/Date";
import CruiseBookingSummaryItemAttribute from "./CruiseBookingSummaryItemAttribute";

interface ICruiseExtendedProps {
    model?: ICruiseBookingData;
}
const getCruiseSummaryValue = (booking: ICruiseBookingData,
                               selector: (summary: ICruiseSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.CruiseSummaryInfo
        ? selector(booking.CruiseBooking.CruiseSummaryInfo) : undefined;
};
const getBookingSummaryValue = (booking: ICruiseBookingData,
                                selector: (summary: IBookingSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.BookingSummaryInfo
        ? selector(booking.CruiseBooking.BookingSummaryInfo) : undefined;
};
const Fields = [
    {
        key: "CruiseStartDate",
        name: "Cruise Start Date",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStartDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.CruiseStartDate));
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseStartDate}/>;
        }
    },  {
        key: "CruiseStartPort",
        name: "Cruise Start Port",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStartPort = getBookingSummaryValue(booking, summary => summary.CruiseStartPort);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseStartPort}/>;
        }
    },  {
        key: "CruiseStartCountry",
        name: "Cruise Start Country",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStartCountry = getCruiseSummaryValue(booking, summary => summary.CruiseStartDepCountryName);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseStartCountry}/>;
        }
    },{
        key: "CruiseEndDate",
        name: "Cruise End Date",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseEndDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.CruiseEndDate));
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseEndDate}/>;
        }
    },
    {
        key: "CruiseEndPort",
        name: "Cruise End Port",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseEndPort = getBookingSummaryValue(booking, summary => summary.CruiseEndPort);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseEndPort}/>;
        }
    },
    {
        key: "CruiseEndCountry",
        name: "Cruise End Country",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseEndCountry = getCruiseSummaryValue(booking, summary => summary.CruiseEndCountryName);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseEndCountry}/>;
        }
    },
];

@observer
class BookingSummaryCruiseDetailsExtended extends React.Component<ICruiseExtendedProps, any> {
    render() {
        let content = Fields.map((field: any) => {
            return field.onRender(this.props.model, field);
        });

        return (content);
    }
}
export {BookingSummaryCruiseDetailsExtended as default, BookingSummaryCruiseDetailsExtended}
