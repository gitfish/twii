import * as React from 'react';
import { observer } from "mobx-react";
import "./CruiseBookingSummary.scss";
import "./CruiseBookingSummaryItemAttribute.scss";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";
import IBookingSummary  from "risk/traveller/cru/IBookingSummary";
import * as DateUtils from "util/Date";
import CruiseBookingSummaryItemAttribute from "./CruiseBookingSummaryItemAttribute";

interface IBookingDetailsProps {
    model?: ICruiseBookingData;
}
const getBookingSummaryValue = (booking: ICruiseBookingData,
                                selector: (summary: IBookingSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.BookingSummaryInfo
        ? selector(booking.CruiseBooking.BookingSummaryInfo) : undefined;
};
const Fields = [
    {
        key: "BoardingDate",
        name: "Boarding Date",
        onRender: function(booking: ICruiseBookingData) {
            let boardingDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.InitialBoardingDate));
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={boardingDate}/>;
        }
    },  {
        key: "BoardingPort",
        name: "Boarding Port",
        onRender: function(booking: ICruiseBookingData) {
            let boardingPort = getBookingSummaryValue(booking, summary => summary.InitialBoardingPortCode);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={boardingPort}/>;
        }
    },  {
        key: "BoardingCountry",
        name: "Boarding Country",
        onRender: function(booking: ICruiseBookingData) {
            let boardingCountry = 'NOT IMPLEMENTED';
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={boardingCountry}/>;
        }
    },
    {
        key: "FlightConnection",
        name: "Flight Connection",
        onRender: function(booking: ICruiseBookingData) {
            let flightConnection = 'NOT IMPLEMENTED';
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={flightConnection}/>;
        }
    },  {
        key: "DisembarkingDate",
        name: "Disembarking Date",
        onRender: function(booking: ICruiseBookingData) {
            let disembarkingDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.LastDisembarkingDate));
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={disembarkingDate}/>;
        }
    },  {
        key: "DisembarkingPort",
        name: "Disembarking Port",
        onRender: function(booking: ICruiseBookingData) {
            let disembarkingPort = getBookingSummaryValue(booking, summary => summary.LastDisembarkingPortCode);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={disembarkingPort}/>;
        }
    },  {
        key: "DisembarkingCountry",
        name: "Disembarking Country",
        onRender: function(booking: ICruiseBookingData) {
            let disembarkingCountry = getBookingSummaryValue(booking, summary => summary.DisembarkingCountryCode);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={disembarkingCountry}/>;
        }

    },

];

@observer
class BookingSummaryBookingDetails extends React.Component<IBookingDetailsProps, any> {
    render() {
        let content = Fields.map((field: any) => {
            return field.onRender(this.props.model, field);
        });

        return (content);
    }
}
export {BookingSummaryBookingDetails as default, BookingSummaryBookingDetails}
