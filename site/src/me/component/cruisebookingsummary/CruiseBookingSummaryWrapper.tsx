import * as React from 'react';
import { observer } from "mobx-react";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { Details } from "common/component/Details";
import BookingSummaryTravelDetails from "me/component/cruisebookingsummary/BookingSummaryTravelDetails";
import * as Icons from "icon/AnalystDesktopIcons";
import ICruiseBookingModel from "me/ICruiseBookingModel";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import Error from "common/component/Error";
import "./CruiseBookingSummaryWrapper.scss";
import BookingSummaryBookingDetails from "me/component/cruisebookingsummary/BookingSummaryBookingDetails";
import BookingSummaryCruiseDetails from "me/component/cruisebookingsummary/BookingSummaryCruiseDetails";
import BookingSummaryCruiseDetailsExtended from "me/component/cruisebookingsummary/BookingSummaryCruiseDetailsExtended";

interface ICruiseBookingSummaryWrapperProps {
    model?: ICruiseBookingModel;
}

@observer
class CruiseBookingSummaryWrapper extends React.Component<ICruiseBookingSummaryWrapperProps, any> {
    render() {
        let content: any = <div> No data available to display</div>;
        if(this.props.model.sync.syncing) {
            content = <Spinner label="Loading ..." className="load-spinner"/>;
        } else if(this.props.model.sync.error) {
            content = <Error error={this.props.model.sync.error} />
        } else if(this.props.model.sync.hasSynced) {
            if (this.props.model.booking) {
                content = <Details className={css("cruise-summary-container")}
                                   summary={<div>{<Icons.BOOKINGS/>} {'Booking Summary'}</div>} open={true} controlOnHeaderClick={true}>

                    <div className="me-booking-summary-mini-container">
                        <div className="me-booking-summary-mini-container-for-travel">
                            <BookingSummaryTravelDetails model={this.props.model.booking} />
                        </div>
                        <div className="me-booking-summary-mini-container-for-booking">
                            <BookingSummaryBookingDetails model={this.props.model.booking} />
                        </div>
                        <div className="me-booking-summary-mini-container-for-cruise">
                            {<BookingSummaryCruiseDetails model={this.props.model.booking} />}
                        </div>
                        <div className="me-booking-summary-mini-container-for-cruise-extended">
                            <BookingSummaryCruiseDetailsExtended model={this.props.model.booking} />
                        </div>

                    </div>
                </Details>
            }
        }
        return (content
        );
    }
}

export { CruiseBookingSummaryWrapper as default, CruiseBookingSummaryWrapper }