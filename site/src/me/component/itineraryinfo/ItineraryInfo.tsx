import * as React from 'react';
import { observer } from "mobx-react";
import { Details } from "common/component/Details";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as Icons from "icon/AnalystDesktopIcons";
import "./ItineraryInfo.scss";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import {MEDetailsAttribute} from "me/component/common/MEDetailsAttribute";
import Error from "common/component/Error";
import IMESummaryModel from "me/summary/IMESummaryModel";
import IItinerary from "risk/traveller/pnr/IItinerary";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";

interface IItineraryInfoProps {
    model?: IMESummaryModel;
}

const constructFullPortRouteText = (itineraries) => {
    let routeText : string = "";
    let prevFromPort: string = "";
    const space = ' ';
    itineraries.forEach((itinerary) => {
        var travelFromTo: string[];
        travelFromTo = StringUtils.split(itinerary.Route, ch => {return ch === space})
        if(!routeText) {
            routeText = itinerary.Route;
        } else if(StringUtils.equalsIgnoreCase(prevFromPort, travelFromTo[0])) {
            routeText += space+travelFromTo[1];
        } else {
            routeText += space+itinerary.Route;
        }
        prevFromPort = travelFromTo[1];
    });
    return routeText;
}

const ItineraryInfoFields = [
    {
        key: "OriginalPort",
        name: "Original Port",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }
    },
    {
        key: "OriginalCountry",
        name: "Original Country",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }
    },

    {
        key: "DestinationPort",
        name: "Destination Port",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }
    },
    {
        key: "DestinationCountry",
        name: "Destination Country",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }
    },
    { 
        key: "PNRTravelType", 
        name: "PNR Travel Type", 
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
            value={source.BookingSummaryInfo? source.BookingSummaryInfo.PNRTravelType ? source.BookingSummaryInfo.PNRTravelType : "-": "-"} />
        }

    },
    {
        key: "FullPortRouteText", 
        name: "Full Port Route",
        onRender: (source: any, field: any) => {
            const itineraries : IItinerary [] = source.ItineraryInfo.Itinerary;
            let fullPortRouteText : string = "";
            fullPortRouteText= constructFullPortRouteText(itineraries);

            return <MEDetailsAttribute label={field.name}
            value={fullPortRouteText} /> 
        }
    },

    { 
        key: "TotalLengthOfTrip", 
        name: "Total Length Of Trip", 
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
            value={source.BookingSummaryInfo? source.BookingSummaryInfo.TotalLengthOfTrip ? source.BookingSummaryInfo.TotalLengthOfTrip : "-": "-"} />
        }

    },
    {
        key: "IntendedLengthOfTrip",
        name: "Intended Length of Trip",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }

    },
    {
        key: "TotalLengthOfStay",
        name: "Total Length Of Stay",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }

    },
    {
        key: "IntendedLengthOfStay",
        name: "Intended Length of Stay",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }

    },
    {
        key: "OverallLengthOfStay",
        name: "Overall Length of Stay",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value="-" />
        }

    },
    {
        key: "MostTimeSpentPort",
        name: "Most Time Spent Port",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                               value={source.BookingSummaryInfo? source.BookingSummaryInfo.MostTimeSpentPort ? source.BookingSummaryInfo.MostTimeSpentPort : "-": "-"} />
        }

    },
    { 
        key: "MostTimeSpentCountry", 
        name: "Most Time Spent Country", 
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
            value={source.BookingSummaryInfo? source.BookingSummaryInfo.MostTimeSpentCountry ? source.BookingSummaryInfo.MostTimeSpentCountry : "-": "-"} />
        }

    },
    {
        key:"MostTimeSpentDays",
        name: "Most Time Spent Days",
        onRender: (source:any, field: any) => {
            return <MEDetailsAttribute label={field.name}
            value={source.BookingSummaryInfo? source.BookingSummaryInfo.MostTimeSpentDays ? source.BookingSummaryInfo.MostTimeSpentDays : "-": "-"} />
        }
    },
    {
        key:"IntentToTravelDate",
        name: "Intent to Travel",
        onRender: (source: any, field: any) => {
            var intentTravelDt = source.BookingSummaryInfo ? DateUtils.dateToOutputText(source.BookingSummaryInfo.IntentToTravelDate)? DateUtils.dateToOutputText(source.BookingSummaryInfo.IntentToTravelDate) : "-": "-";
            return <MEDetailsAttribute label={field.name} value={intentTravelDt}/>;
        }
    },
    {
        key: "ActiveSegmentCount",
        name: "Active Segment",
        headerClassName:"group-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                           value={source.BookingSummaryInfo ? source.BookingSummaryInfo.ActiveSegmentCount? source.BookingSummaryInfo.ActiveSegmentCount : "-" : "-"}/>;
        }
    },
    {
        key: "CancelledSegmentCount",
        name: "Cancelled Segment",
        headerClassName:"group-info-list-header",
        onRender: (source: any, field: any) => {
            return <MEDetailsAttribute label={field.name}
                                           value={source.BookingSummaryInfo ? source.BookingSummaryInfo.CancelledSegmentCount? source.BookingSummaryInfo.CancelledSegmentCount : "-" : "-"}/>;
        }
    }

]

@observer
class ItineraryInfo extends React.Component<IItineraryInfoProps, any> {
      render() {

        let content: any = <div> No data available to display </div>;

        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.bookingSummary!=null && this.props.model.bookingSummary!=undefined) {
                content = ItineraryInfoFields.map((field: any) => {
                    if (field.onRender) {
                        return field.onRender(this.props.model.bookingSummary, field);
                    }
                });
            }
        }
        return (
            <Details className={css("me-itinerary-info-details", "me-section")}
                     summary={<div>{<Icons.BOOKINGS/>} Itinerary Information </div>}
                     open={true}
                     controlOnHeaderClick={true}
                     headerClassName={css("me-itinerary-info-details-header", "me-itinerary-info-ribbon")}
                     bodyClassName="me-itinerary-info-body">
                <div className="me-itinerary-info">
                    <div className="itinerary-info ms-Grid me-itinerary-info-details-section">
                        {content}
                    </div>
                </div>
            </Details>
        );
    }
}

export {ItineraryInfo as default, ItineraryInfo}
