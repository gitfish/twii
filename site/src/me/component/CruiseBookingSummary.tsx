import * as React from 'react';
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { Details } from "common/component/Details";
import Error from "common/component/Error";
import * as Icons from "icon/AnalystDesktopIcons";
import ICruiseBookingModel from "../ICruiseBookingModel";
import ICruiseBookingData from "risk/traveller/cru/ICruiseBookingData";
import IBookingSummary  from "risk/traveller/cru/IBookingSummary";
import ICruiseSummary from "risk/traveller/cru/ICruiseSummary";
import * as DateUtils from "util/Date";
import "./CruiseBookingSummary.scss";

interface SummaryAttributeProps {
    label: string;
    value: string;
}

class SummaryAttribute extends React.Component<SummaryAttributeProps, any> {
    render() {
        return (
            <div className="ms-Grid ms-Grid-col ms-sm12 ms-md3">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6">
                        <span className="summary-attribute-label">{this.props.label}</span>
                    </div>
                    <div className="ms-Grid-col ms-sm6">
                        <span>{this.props.value}</span>
                    </div>
                </div>
            </div>
        )
    }
}

interface ICruiseBookingSummaryProps {
    model: ICruiseBookingModel;
}

const getBookingSummaryValue = (booking: ICruiseBookingData,
                                selector: (summary: IBookingSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.BookingSummaryInfo
           ? selector(booking.CruiseBooking.BookingSummaryInfo) : undefined;
};

const getCruiseSummaryValue = (booking: ICruiseBookingData,
                               selector: (summary: ICruiseSummary) => string) : string => {
    return booking && booking.CruiseBooking && booking.CruiseBooking.CruiseSummaryInfo
        ? selector(booking.CruiseBooking.CruiseSummaryInfo) : undefined;
};

const Fields = [
     {
        key: "TravelType",
        name: "Travel Type",
        onRender: function(booking: ICruiseBookingData) {
            let travelType = getBookingSummaryValue(booking, summary => summary.TravelType);
            return <SummaryAttribute key={this.key} label={this.name} value={travelType}/>;
        }
    },  {
        key: "BoardingDate",
        name: "Boarding Date",
        onRender: function(booking: ICruiseBookingData) {
            let boardingDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.InitialBoardingDate));
            return <SummaryAttribute key={this.key} label={this.name} value={boardingDate}/>;
        }
    },  {
        key: "CruiseCompany",
        name: "Cruise Company",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseCompany = getCruiseSummaryValue(booking, summary => summary.CruiseCompanyName);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseCompany}/>;
        }
    },  {
        key: "CruiseStartDate",
        name: "Cruise Start Date",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStartDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.CruiseStartDate));
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseStartDate}/>;
        }
    },


    {
        key: "BookingDate",
        name: "Booking Date",
        onRender: function(booking: ICruiseBookingData) {
            let bookingDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.BookingDate));
            return <SummaryAttribute key={this.key} label={this.name} value={bookingDate}/>;
        }
    },  {
        key: "BoardingPort",
        name: "Boarding Port",
        onRender: function(booking: ICruiseBookingData) {
            let boardingPort = getBookingSummaryValue(booking, summary => summary.InitialBoardingPortCode);
            return <SummaryAttribute key={this.key} label={this.name} value={boardingPort}/>;
        }
    },  {
        key: "CruiseID",
        name: "Cruise ID",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseID = getCruiseSummaryValue(booking, summary => summary.CruiseCode);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseID}/>;
        }
    },  {
        key: "CruiseStartPort",
        name: "Cruise Start Port",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStartPort = getBookingSummaryValue(booking, summary => summary.CruiseStartPort);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseStartPort}/>;
        }
    },  {
        key: "BookingDBT",
        name: "Booking DBT",
        onRender: function(booking: ICruiseBookingData) {
            let bookingDBT = getBookingSummaryValue(booking, summary => summary.CurrentBookingDBT ? String(summary.CurrentBookingDBT) : undefined);
            return <SummaryAttribute key={this.key} label={this.name} value={bookingDBT}/>;
        }
    },  {
        key: "BoardingCountry",
        name: "Boarding Country",
        onRender: function(booking: ICruiseBookingData) {
            let boardingCountry = 'NOT IMPLEMENTED';
            return <SummaryAttribute key={this.key} label={this.name} value={boardingCountry}/>;
        }
    },  {
        key: "ShipName",
        name: "Ship Name",
        onRender: function(booking: ICruiseBookingData) {
            let shipName = getCruiseSummaryValue(booking, summary => summary.CruiseShipName);
            return <SummaryAttribute key={this.key} label={this.name} value={shipName}/>;
        }
    },  {
        key: "CruiseStartCountry",
        name: "Cruise Start Country",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStartCountry = getCruiseSummaryValue(booking, summary => summary.CruiseStartDepCountryName);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseStartCountry}/>;
        }
    },  {
        key: "LengthOfTrip",
        name: "Length of Trip",
        onRender: function(booking: ICruiseBookingData) {
            let lengthOfTrip = getBookingSummaryValue(booking, summary => summary.TotalLengthOfTravel ? String(summary.TotalLengthOfTravel) : undefined);
            return <SummaryAttribute key={this.key} label={this.name} value={lengthOfTrip}/>;
        }
    },   {
        key: "FlightConnection",
        name: "Flight Connection",
        onRender: function(booking: ICruiseBookingData) {
            let flightConnection = 'NOT IMPLEMENTED';
            return <SummaryAttribute key={this.key} label={this.name} value={flightConnection}/>;
        }
    },   {
        key: "CruiseType",
        name: "Cruise Type",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseType = getCruiseSummaryValue(booking, summary => summary.CruiseType);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseType}/>;
        }
    },  {
        key: "CruiseEndDate",
        name: "Cruise End Date",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseEndDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.CruiseEndDate));
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseEndDate}/>;
        }
    },  {
        key: "CancelledIndicator",
        name: "Cancelled Indicator",
        onRender: function(booking: ICruiseBookingData) {
            let cancelledIndicator = getBookingSummaryValue(booking, summary => summary.CancelledIndicator ? String(summary.CancelledIndicator) : undefined);
            return <SummaryAttribute key={this.key} label={this.name} value={cancelledIndicator}/>;
        }
    },   {
        key: "DisembarkingDate",
        name: "Disembarking Date",
        onRender: function(booking: ICruiseBookingData) {
            let disembarkingDate = getBookingSummaryValue(booking, summary => DateUtils.dateToOutputText(summary.LastDisembarkingDate));
            return <SummaryAttribute key={this.key} label={this.name} value={disembarkingDate}/>;
        }
    },  {
        key: "CruiseStatus",
        name: "Cruise Status",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseStatus = getCruiseSummaryValue(booking, summary => summary.CruiseStatus);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseStatus}/>;
        }
    },  {
        key: "CruiseEndPort",
        name: "Cruise End Port",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseEndPort = getBookingSummaryValue(booking, summary => summary.CruiseEndPort);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseEndPort}/>;
        }
    },  {
        key: "NoOfCruiseSegments",
        name: "Number of Cruise Segments",
        onRender: function(booking: ICruiseBookingData) {
            let noOfCruiseSegments = getBookingSummaryValue(booking, summary => summary.NoOfCruiseSegments ? String(summary.NoOfCruiseSegments) : undefined);
            return <SummaryAttribute key={this.key} label={this.name} value={noOfCruiseSegments}/>;
        }

    },   {
        key: "DisembarkingPort",
        name: "Disembarking Port",
        onRender: function(booking: ICruiseBookingData) {
            let disembarkingPort = getBookingSummaryValue(booking, summary => summary.LastDisembarkingPortCode);
            return <SummaryAttribute key={this.key} label={this.name} value={disembarkingPort}/>;
        }
    },  {
        key: "lengthOfCruise",
        name: "Length of Cruise",
        onRender: function(booking: ICruiseBookingData) {
            let lengthOfCruise = getCruiseSummaryValue(booking, summary => summary.CruiseNights ? String(summary.CruiseNights) : undefined);
            return <SummaryAttribute key={this.key} label={this.name} value={lengthOfCruise}/>;
        }
    },  {
        key: "CruiseEndCountry",
        name: "Cruise End Country",
        onRender: function(booking: ICruiseBookingData) {
            let cruiseEndCountry = getCruiseSummaryValue(booking, summary => summary.CruiseEndCountryName);
            return <SummaryAttribute key={this.key} label={this.name} value={cruiseEndCountry}/>;
        }
    },  {
        key: "NoOfBorderMovements",
        name: "Number of Border Movements",
        onRender: function(booking: ICruiseBookingData) {
            let noOfBorderMovements = getBookingSummaryValue(booking, summary => summary.NoOfBorderMovements ? String(summary.NoOfBorderMovements) : undefined);
            return <SummaryAttribute key={this.key} label={this.name} value={noOfBorderMovements}/>;
        }
    },  {
        key: "DisembarkingCountry",
        name: "Disembarking Country",
        onRender: function(booking: ICruiseBookingData) {
            let disembarkingCountry = getBookingSummaryValue(booking, summary => summary.DisembarkingCountryCode);
            return <SummaryAttribute key={this.key} label={this.name} value={disembarkingCountry}/>;
        }

    },  {
        key: "zdsd",
        name: "",
        onRender: function(booking: ICruiseBookingData) {
            let val: any = "";
            return <SummaryAttribute key={this.key} label={this.name} value={val}/>;
        }

    },  {
        key: "TravellerCount",
        name: "Traveller Count",
        onRender: function(booking: ICruiseBookingData) {
            let travellerCount = getBookingSummaryValue(booking, summary => String((summary.NoOfMinorsInGroup || 0)
                + (summary.NoOfTeensInGroup || 0) + (summary.NoOfAdultsIngroup || 0) + (summary.NoOfSeniorsInGroup || 0)));
            return <SummaryAttribute key={this.key} label={this.name} value={travellerCount}/>;
        }
    },  {
        key: "MostTimeSpentRegion",
        name: "Most Time Spent Region",
        onRender: function(booking: ICruiseBookingData) {
            let mostTimeSpentRegion = getBookingSummaryValue(booking, summary => summary.MostTimeSpentCruiseRegion);
            return <SummaryAttribute key={this.key} label={this.name} value={mostTimeSpentRegion}/>;
        }
    }
];

@observer
class CruiseBookingSummary extends React.Component<ICruiseBookingSummaryProps, any> {
    render() {
        let content: any = <div> No data available to display</div>;
        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.booking) {
               content = Fields.map((field: any) => {
                    return field.onRender(this.props.model.booking);
                });
            }
        }
        return (
            <Details className={css("cruise-summary-container", "me-section")} summary={<div>{<Icons.BOOKINGS/>} {'Booking Summary'}</div>} open={true} controlOnHeaderClick={true}>
                <div className="ms-Grid cruise-summary">
                    { content }
                </div>
            </Details>
        );
    }
}

export { CruiseBookingSummary as default, CruiseBookingSummary, ICruiseBookingSummaryProps }