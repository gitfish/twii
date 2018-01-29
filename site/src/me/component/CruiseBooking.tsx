import * as React from "react";
import { observer } from "mobx-react";
import IMECruiseModel from "../cruise/IMECruiseModel";
import { Pivot,PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import CruiseBookingSummary from "./CruiseBookingSummary";
import ProfileMatchesDetails from "./profilematch/ProfileMatchesDetailsList";
import AlertInfoSummary from "./alertinfo/AlertInfoSummary";
import BagExamsResultSummary from "./BagExamsHist/BagExamsResultSummary";
import BioDataHistory from "./biodata/BioDataHistory";
import PassportHistory from "./passporthistory/PassportHistory";
import CruiseVisaHistory from "me/component/visahistory/CruiseVisaHistory";
import MovementHistory from "./movementhistory/MovementHistory";
import {CruiseProfileMatchColumns} from "me/component/profilematch/ProfileMatchColumns";
import {CruiseBioDataHistoryColumns} from "me/component/biodata/BioDataHistoryColumns";
import {CruisePassportHistoryColumns} from "me/component/passporthistory/PassportHistoryColumns";
import {CruiseMovementHistoryColumns} from "me/component/movementhistory/MovementsHistoryColumns";
import {CruiseAlertInfoColumns} from "me/component/alertinfo/AlertInfoColumns";
import {CruiseBagExamsResultColumns} from "me/component/BagExamsHist/BagExamsResultColumns";
import {CruiseAlertHistoryColumns} from "me/component/alerthistory/AlertHistoryColumns";
import AlertHistorySummary from "me/component/alerthistory/AlertHistorySummary";
import "./CruiseBooking.scss";
import MEHeader from "./MEHeader";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import CruiseBookingSummaryWrapper from "me/component/cruisebookingsummary/CruiseBookingSummaryWrapper";

interface ICruiseBookingProps {
    model: IMECruiseModel;
}

@observer
class CruiseBooking extends React.Component<ICruiseBookingProps, any> {
    private _onRefresh = () => {
        this.props.model.refresh();
    }
    render() {
        return (
            <div className="cruise-booking">
                <MEHeader headerDetails = {this.props.model.meCase}
                          pnrSource = {this.props.model.bookingModel ?
                            this.props.model.bookingModel.booking ?
                                this.props.model.bookingModel.booking.BookingRecordInfo : {}
                            : {}}
                          onRefresh={this._onRefresh}
                          icon={<Icon iconName='FerrySolid'/>} />
                <Pivot>
                    <PivotItem linkText={`${this.props.model.meCase.CaseID} - Summary`} itemKey="summary">
                        <CruiseBookingSummaryWrapper model={this.props.model.bookingModel}/>
                        <ProfileMatchesDetails model={this.props.model.profileMatchModel} profileColumns={CruiseProfileMatchColumns} showCurrentProfiles = {true} />
                        <BioDataHistory model={this.props.model.travellerHistoryModel} bioDataColumns={CruiseBioDataHistoryColumns}/>
                        <PassportHistory model={this.props.model.travellerHistoryModel} passportDataColumns={CruisePassportHistoryColumns}/>
                        <CruiseVisaHistory model={this.props.model.travellerHistoryModel}/>
                        <MovementHistory model={this.props.model.travellerHistoryModel} movementDataColumns = {CruiseMovementHistoryColumns}/>
                    </PivotItem>
                    <PivotItem linkText='Alert, Profile, Exam History' itemKey="alerts">
                        <AlertInfoSummary model={this.props.model.travellerHistoryModel} alertDataColumns = {CruiseAlertInfoColumns}/>
                        <AlertHistorySummary model={this.props.model.travellerHistoryModel} alertHistoryDataColumns = {CruiseAlertHistoryColumns}/>
                        <ProfileMatchesDetails model={this.props.model.profileMatchModel} profileColumns={CruiseProfileMatchColumns} showHistoricalProfiles={true} showCurrentProfiles={true}/>
                        <BagExamsResultSummary model={this.props.model.travellerHistoryModel} bagsExamDataColumns = {CruiseBagExamsResultColumns}/>
                    </PivotItem>
                </Pivot>
            </div>
        );
    }
}

export { CruiseBooking as default, CruiseBooking }