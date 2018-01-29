import * as React from "react";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import {PurchaseInfo} from "me/component/purchaseinfo/PurchaseInfo";
import BagExamsResultSummary from "me/component/BagExamsHist/BagExamsResultSummary";
import ProfileMatchesDetails from "me/component/profilematch/ProfileMatchesDetailsList";
import TravellerSummary from "me/component/travellersummary/TravellerSummary";
import ActiveItinerary from "me/component/activeitinerary/ActiveItinerary";
import TravellerContact from "me/component/travellercontacts/TravellerContact";
import CheckIn from "me/component/checkindetails/CheckIn";
import BaggageDetails from "me/component/baggagedetails/BaggageDetails";
import BoardingDetails from "me/component/boardingdetails/BoardingDetails";
import Payments from "me/component/payments/Payments";
import PushHistory from "me/component/pushhistory/PushHistory";
import TravelAgents from "me/component/travelagents/TravelAgents";
import HistoricalPNR from "me/component/historicalpnr/HistoricalPNR";
import MovementHistory from "me/component/movementhistory/MovementHistory";
import BioDataHistory from "me/component/biodata/BioDataHistory";
import PassportHistory from "me/component/passporthistory/PassportHistory";
import AirVisaHistory from "me/component/visahistory/AirVisaHistory";
import AlertHistorySummary from "me/component/alerthistory/AlertHistorySummary";
import GroupInfo from "me/component/groupinfo/GroupInfo";
import { observer } from "mobx-react";
import IMEAirTravellerModel from "me/IMEAirTravellerModel";
import AlertInfoSummary from "me/component/alertinfo/AlertInfoSummary";
import SpecialServiceRequest from "me/component/specialServiceRequest/SpecialServiceRequest";
import OtherServiceInformation from "me/component/otherServiceInformation/OtherServiceInformation";
import OtherComment from "me/component/otherComments/OtherComment";
import PNRHistorySummary from "me/component/PNRHistory/PNRHistorySummary";
import ItineraryInfo from "me/component/itineraryinfo/ItineraryInfo";
import FlightSchedule from "me/component/vessel/FlightSchedule";
import {AirProfileMatchColumns} from "me/component/profilematch/ProfileMatchColumns";
import {AirBioDataHistoryColumns} from "me/component/biodata/BioDataHistoryColumns";
import {AirPassportHistoryColumns} from "me/component/passporthistory/PassportHistoryColumns";
import {AirMovementHistoryColumns} from "me/component/movementhistory/MovementsHistoryColumns";
import {AirAlertInfoColumns} from "me/component/alertinfo/AlertInfoColumns";
import {AirBagExamsResultColumns} from "me/component/BagExamsHist/BagExamsResultColumns";
import {AirAlertHistoryColumns} from "me/component/alerthistory/AlertHistoryColumns";
import "./MEAirTraveller.scss";
import MEHeader from "./MEHeader";
import { Icon } from 'office-ui-fabric-react/lib/Icon';

interface IMEAirCaseDetailContainerProps {
    model: IMEAirTravellerModel;
}

@observer
class MEAirCaseDetailContainer extends React.Component<IMEAirCaseDetailContainerProps, any> {
    private _onRefresh = () => {
        this.props.model.refresh();
    }
    render() {
        let meSummaryContent = <div>
            <MEHeader headerDetails = {this.props.model.meCase}
                      pnrSource = {this.props.model.summaryModel?
                                            this.props.model.summaryModel.bookingSummary?
                                                    this.props.model.summaryModel.bookingSummary.BookingRecordInfo ? this.props.model.summaryModel.bookingSummary.BookingRecordInfo: {}
                                            : {}
                                   : {}}
                      onRefresh={this._onRefresh}
                      icon={<Icon iconName='AirplaneSolid'/>} />
                <Pivot selectedKey="0">
                    <PivotItem linkText='Traveller & Booking Summary' itemKey="0" key="0">
                        <div className="me-booking-summary">
                            <ProfileMatchesDetails model = {this.props.model.profileMatchModel} profileColumns={AirProfileMatchColumns} showCurrentProfiles={true}/>
                            <TravellerSummary model={this.props.model.summaryModel} />
                            <FlightSchedule model={this.props.model.vesselScheduleModel} />
                            <div className="me-booking-summary-mini-container">
                                <div className="me-booking-summary-mini-container-for-purchase">
                                    <PurchaseInfo model={this.props.model.summaryModel} />
                                </div>
                                <div className="me-booking-summary-mini-container-for-itinerary">
                                    <ItineraryInfo model={this.props.model.summaryModel} />
                                </div>
                                <div className="me-booking-summary-mini-container-for-group">
                                    <GroupInfo model={this.props.model.summaryModel} />
                                </div>
                                <br className="me-booking-summary-clear-style"/>
                            </div>
                            <ActiveItinerary model={this.props.model.summaryModel} />
                            <CheckIn model={this.props.model.summaryModel} />
                            <BoardingDetails model={this.props.model.summaryModel} />
                            <BaggageDetails model={this.props.model.summaryModel} />
                            <TravelAgents model={this.props.model.summaryModel} />
                            <Payments model={this.props.model.summaryModel} />
                            <PushHistory model={this.props.model.summaryModel} />
                            <TravellerContact model={this.props.model.summaryModel} />
                            <BioDataHistory model={this.props.model.travellerHistoryModel} bioDataColumns={AirBioDataHistoryColumns}/>
                            <PassportHistory model={this.props.model.travellerHistoryModel} passportDataColumns={AirPassportHistoryColumns}/>
                            <AirVisaHistory model={this.props.model.travellerHistoryModel} />
                            <MovementHistory model={this.props.model.travellerHistoryModel} movementDataColumns = {AirMovementHistoryColumns}/>
                            <HistoricalPNR model={this.props.model.historicalPNRnIATModel} />
                        </div>
                    </PivotItem>
                    <PivotItem linkText='Reservation History' itemKey="1" key="1">
                        <div className="me-booking-summary">
                            <SpecialServiceRequest model={this.props.model.summaryModel} />
                            <OtherServiceInformation model={this.props.model.summaryModel} />
                            <OtherComment model={this.props.model.summaryModel} />
                            <PNRHistorySummary model={this.props.model.summaryModel} />
                        </div>
                    </PivotItem>
                    <PivotItem linkText='Alert, Profile, Exam History' itemKey="2" key="2">
                        <div className="me-booking-summary">
                            <AlertInfoSummary model={this.props.model.travellerHistoryModel} alertDataColumns = {AirAlertInfoColumns}/>
                            <AlertHistorySummary model={this.props.model.travellerHistoryModel} alertHistoryDataColumns = {AirAlertHistoryColumns}/>
                            <ProfileMatchesDetails model = {this.props.model.profileMatchModel} profileColumns={AirProfileMatchColumns}  showHistoricalProfiles={true}  showCurrentProfiles = {true} />
                            <BagExamsResultSummary model={this.props.model.travellerHistoryModel} bagsExamDataColumns = {AirBagExamsResultColumns}/>
                        </div>
                    </PivotItem>
                 </Pivot>
            </div>
        return (
            <div className="me-summary">
                {meSummaryContent}
            </div>
        );
    }
}
export { MEAirCaseDetailContainer as default, MEAirCaseDetailContainer }
