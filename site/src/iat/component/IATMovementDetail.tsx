import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Error from "common/component/Error";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import IATMovementDetailStore from "../IATMovementDetailStore";
import IIATMovementRelatedDataModel from "../IIATMovementRelatedDataModel";
import IIATMovementDetail from "../IIATMovementDetail";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as DateUtils from "util/Date";
import { Details } from "common/component/Details";
import * as Icons from "icon/AnalystDesktopIcons";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import DetailsAttribute from "common/component/DetailsAttribute";
import DetailsItem from "common/component/DetailsItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";
import "./IATMovementDetails.scss";

const Fields: IDetailsAttributeConfig<IIATMovementDetail>[] = [{
    key: "routeId",
    name: "Route Id"
}, {
    key: "localScheduledDate",
    name: "Local Scheduled Date",
    onRender: function(item: IIATMovementDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.localScheduledDate)}/>;
    }
}, {
    key: "directionCode",
    name: "Direction Code"
}, {
    key: "fullRoutingText",
    name: "Full Routing Text"
}, {
    key: "movementDate",
    name: "Movement Date",
    onRender: function(item: IIATMovementDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.movementDate)}/>;
    }
}, {
    key: "movementTime",
    name: "Movement Time"
}, {
    key: "movementStatusCode",
    name: "Movement Status"
}, {
    key: "movementRaceID",
    name: "Movement Race ID"
}, {
    key: "familyName",
    name: "Family Name"
}, {
    key: "givenNames",
    name: "Given Names"
}, {
    key: "birthDate",
    name: "Birth Date",
    onRender: function(item: IIATMovementDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.birthDate)}/>;
    }
}, {
    key: "sexCode",
    name: "Gender",
    onRender: function(item: IIATMovementDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={NameGenderCdRef[item.sexCode]}/>;
    }
}, {
    key: "childInd",
    name: "Child Ind"
}, {
    key: "aliasSequenceNbr",
    name: "Alias Sequence Number"
}, {
    key: "travelDocID",
    name: "Travel Document ID"
}, {
    key: "travelDocDeptCountryCode",
    name: "Travel Document Country"
}, {
    key: "localPortCode",
    name: "Local Port"
}, {
    key: "checkInPortCode",
    name: "Check In Port"
}, {
    key: "checkInRouteId",
    name: "Check In Route Id"
}, {
    key: "checkInTime",
    name: "Check In Time"
}, {
    key: "visaSubClassCode",
    name: "Visa SubClass"
}, {
    key: "passengerCrewCode",
    name: "Passenger Crew Code"
}, {
    key: "postMovementInd",
    name: "Post Movement Indicator"
}, {
    key: "travellerMovementTypeCode",
    name: "Traveller Movement Type"
}, {
    key: "travelDocSequenceNbr",
    name: "Travel Document Sequence"
}, {
    key: "immigrationDirectiveCode",
    name: "Immigration Directive Code"
}, {
    key: "referralStatusCode",
    name: "Referral Status Code"
}, {
    key: "referralTypeCode",
    name: "Referral Type Code"
}, {
    key: "examinationForTravellerForMovementInd",
    name: "Exam For Movement"
}, {
    key: "positiveFindForTravellerForMovementInd",
    name: "Positive Find For Movement"
}, {
    key: "numberOfExamsForTheTraveller",
    name: "Exams For Traveller"
}, {
    key: "positiveFindCountForTraveller",
    name: "Positive Finds For Traveller"
}, {
    key: "alertInd",
    name: "Alert Indicator"
}];

interface IIATMovementDetailsProps {
    model?: IIATMovementRelatedDataModel<IIATMovementDetail>;
}

@observer
class IATMovementDetails extends React.Component<IIATMovementDetailsProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((detail: IIATMovementDetail, idx: number) => {
                return <DetailsItem key={idx} model={detail} attrConfig={Fields} viewPrefModel={IATMovementDetailsViewPrefsStore}/>;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Failed to load details</MessageBar>;
        }
        return <div className="iat-movement-details">{content}</div>;
    }
}

class IATMovementDetailsContainer extends React.Component<IIATMovementDetailsProps, any> {
    private _onRenderDone = () => {
        return <IATMovementDetails {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} syncLabel="Loading Details..." onRenderDone={this._onRenderDone} />
    }
}

const IATMovementDetailsViewPrefsStore = new ViewPreferencesModel("iatMovementDetails");

@observer
class IATMovementDetailsPanel extends React.Component<IIATMovementDetailsProps, any> {
    _handlePanelClose = () => {
        this.props.model.setVisible(false);
    }
    render() {
        return (
            <Panel isOpen={true} isLightDismiss={true} type={ PanelType.custom }
                   customWidth='800px' headerText='Movement Details' onDismiss={this._handlePanelClose}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.IAT/>} {'Movement Details'}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("iat-movement-details-header")}
                         bodyClassName="iat-movement-details-body">
                    <CommandBar className="iat-movement-list-command-bar" items={[]} farItems={[createViewPreferencesMenuItem(IATMovementDetailsViewPrefsStore, Fields)]} />
                    <IATMovementDetailsContainer {...this.props} />
                </Details>
            </Panel>
        );
    }
}

export{ IATMovementDetailsPanel as default, IATMovementDetailsPanel, IIATMovementDetailsProps };