import * as React from 'react';
import { observer } from "mobx-react";
import "./CruiseBookingSummary.scss";
import "./CruiseBookingSummaryItemAttribute.scss";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";
import ICruiseSummary from "risk/traveller/cru/ICruiseSummary";
import CruiseBookingSummaryItemAttribute from "./CruiseBookingSummaryItemAttribute";

interface ICruiseDetailsProps {
    model?: ICruiseBookingData;
}
const getCruiseSummaryValue = (booking: ICruiseBookingData,
                               selector: (summary: ICruiseSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.CruiseSummaryInfo
        ? selector(booking.CruiseBooking.CruiseSummaryInfo) : undefined;
};

const Fields = [
    {
        key: "CruiseCompany",
        name: "Cruise Company",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseCompany = getCruiseSummaryValue(booking, summary => summary.CruiseCompanyName);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseCompany}/>;
        }
    },  {
        key: "CruiseID",
        name: "Cruise ID",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseID = getCruiseSummaryValue(booking, summary => summary.CruiseCode);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseID}/>;
        }
    },  {
        key: "ShipName",
        name: "Ship Name",
        onRender: function(booking: ICruiseBookingData) {
            let shipName = getCruiseSummaryValue(booking, summary => summary.CruiseShipName);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={shipName}/>;
        }
    },
    {
        key: "CruiseType",
        name: "Cruise Type",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseType = getCruiseSummaryValue(booking, summary => summary.CruiseType);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseType}/>;
        }
    },  {
        key: "CruiseStatus",
        name: "Cruise Status",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStatus = getCruiseSummaryValue(booking, summary => summary.CruiseStatus);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={cruiseStatus}/>;
        }
    },
    {
        key: "lengthOfCruise",
        name: "Length of Cruise",
        onRender: function(booking: ICruiseBookingData) {
            let lengthOfCruise = getCruiseSummaryValue(booking, summary => summary.CruiseNights ? String(summary.CruiseNights) : undefined);
            return <CruiseBookingSummaryItemAttribute key={this.key} label={this.name} value={lengthOfCruise}/>;
        }
    }

];

@observer
class BookingSummaryCruiseDetails extends React.Component<ICruiseDetailsProps, any> {
    render() {
        let content = Fields.map((field: any) => {
            return field.onRender(this.props.model, field);
        });

        return (content);
    }
}
export {BookingSummaryCruiseDetails as default, BookingSummaryCruiseDetails}
