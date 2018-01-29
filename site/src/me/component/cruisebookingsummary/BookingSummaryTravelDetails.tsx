import * as React from 'react';
import { observer } from "mobx-react";
import "./CruiseBookingSummary.scss";
import CruiseBookingSummaryItemAttribute from "./CruiseBookingSummaryItemAttribute";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";
import IBookingSummary  from "risk/traveller/cru/IBookingSummary";
import * as DateUtils from "util/Date";

interface ICBSTDInfoProps {
    model?: ICruiseBookingData;
}

const getBookingSummaryValue = (booking: ICruiseBookingData,
                                selector: (summary: IBookingSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.BookingSummaryInfo
        ? selector(booking.CruiseBooking.BookingSummaryInfo) : undefined;
};

const CBSTDFields = [
    {
        key: "TravelType",
        name: "Travel Type",
        onRender: function(booking: ICruiseBookingData) {
            let travelType = getBookingSummaryValue(booking, summary => summary.TravelType);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={travelType}/>;
        }
    },
    {
        key: "BookingDate",
        name: "Booking Date",
        onRender: function(booking: ICruiseBookingData) {
            let bookingDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.BookingDate));
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={bookingDate}/>;
        }
    }, {
        key: "BookingDBT",
        name: "Booking DBT",
        onRender: function(booking: ICruiseBookingData) {
            let bookingDBT = getBookingSummaryValue(booking, summary => summary.CurrentBookingDBT ? String(summary.CurrentBookingDBT) : undefined);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={bookingDBT}/>;
        }
    },
    {
        key: "LengthOfTrip",
        name: "Length of Trip",
        onRender: function(booking: ICruiseBookingData) {
            let lengthOfTrip = getBookingSummaryValue(booking, summary => summary.TotalLengthOfTravel ? String(summary.TotalLengthOfTravel) : undefined);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={lengthOfTrip}/>;
        }
    },

    {
        key: "CancelledIndicator",
        name: "Cancelled Indicator",
        onRender: function (booking: ICruiseBookingData) {
            let cancelledIndicator = getBookingSummaryValue(booking, summary => summary.CancelledIndicator ? String(summary.CancelledIndicator) : undefined);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cancelledIndicator}/>;
        }
    },

    {
        key: "NoOfCruiseSegments",
        name: "Number of Cruise Segments",
        onRender: function (booking: ICruiseBookingData) {
            let noOfCruiseSegments = getBookingSummaryValue(booking, summary => summary.NoOfCruiseSegments ? String(summary.NoOfCruiseSegments) : undefined);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={noOfCruiseSegments}/>;
        }
    },
    {
        key: "NoOfBorderMovements",
        name: "Number of Border Movements",
        onRender: function (booking: ICruiseBookingData) {
            let noOfBorderMovements = getBookingSummaryValue(booking, summary => summary.NoOfBorderMovements ? String(summary.NoOfBorderMovements) : undefined);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={noOfBorderMovements}/>;
        }
    },
    {
        key: "TravellerCount",
        name: "Traveller Count",
        onRender: function(booking: ICruiseBookingData) {
            let travellerCount = getBookingSummaryValue(booking, summary => String((summary.NoOfMinorsInGroup || 0)
                + (summary.NoOfTeensInGroup || 0) + (summary.NoOfAdultsIngroup || 0) + (summary.NoOfSeniorsInGroup || 0)));
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={travellerCount}/>;
        }
    },
    {
        key: "MostTimeSpentRegion",
        name: "Most Time Spent Region",
        onRender: function(booking: ICruiseBookingData) {
            let mostTimeSpentRegion = getBookingSummaryValue(booking, summary => summary.MostTimeSpentCruiseRegion);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={mostTimeSpentRegion}/>;
        }
    },

];

@observer
class BookingSummaryTravelDetails extends React.Component<ICBSTDInfoProps, any> {
    render() {
        let content = CBSTDFields.map((field: any) => {
                    return field.onRender(this.props.model, field);
        });

        return (content);
    }
}


export {BookingSummaryTravelDetails as default, BookingSummaryTravelDetails}
