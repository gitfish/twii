import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as DateUtils from "util/Date";
import Error from "common/component/Error";
import SourceSystemCdRef from "refdata/SourceSystemCd";
import YesNoCodeRef from "refdata/YesNoCd";
import ImmigrationDirectiveCdRef from "refdata/ImmigrationDirectiveCd";
import EntriesAllowedCdRef from "refdata/EntriesAllowedCd";
import EvidenceStatusCdRef from "refdata/EvidenceStatusCd";
import PhysicalEvidenceStatusCdRef from "refdata/PhysicalEvidenceStatusCd";
import VisaStatusCdRef from "refdata/VisaStatusCd";
import IIATMovementRelatedDataModel from "../IIATMovementRelatedDataModel";
import IATMovementVisasStore from "../IATMovementVisasStore";
import IIATVisa from "../IIATVisa";
import "./IATMovementVisas.scss";
import { Details } from "common/component/Details";
import * as Icons from "icon/AnalystDesktopIcons";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import DetailsAttribute from "common/component/DetailsAttribute";
import DetailsItem from "common/component/DetailsItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";

const Fields: IDetailsAttributeConfig<IIATVisa>[] = [{
    key: "visaID",
    name: "Visa ID"
}, {
    key: "entriesAllowedCode",
    name: "Entries Allowed",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={EntriesAllowedCdRef.getDesc(item.entriesAllowedCode)}/>;
    }
}, {
    key: "entriesMadeCount",
    name: "Entries Made"
}, {
    key: "entryExpiryDate",
    name: "No Entries After",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.entryExpiryDate)}/>;
    }
}, {
    key: "evidenceNbr",
    name: "Evidence Number"
}, {
    key: "evidenceStatusCode",
    name: "Evidence Status",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={EvidenceStatusCdRef.getDesc(item.evidenceStatusCode)}/>;
    }
}, {
    key: "immigrationDirectiveCode",
    name: "Immigration Directive",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={ImmigrationDirectiveCdRef.getDesc(item.immigrationDirectiveCode)}/>;
    }
}, {
    key: "lastUpdateDate",
    name: "Last Updated",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.lastUpdateDate)}/>;
    }
}, {
    key: "lawfulUntilDate",
    name: "Lawful Until",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.lawfulUntilDate)}/>;
    }
}, {
    key: "migrantEntryExpiryDate",
    name: "Migrant Entry Expiry Date",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.migrantEntryExpiryDate)}/>;
    }
}, {
    key: "multiIssuedVisaInd",
    name: "Re-issued Visa",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={YesNoCodeRef.getDesc(item.multiIssuedVisaInd)}/>;
    }
}, {
    key: "occupationCode",
    name: "Occupation"
}, {
    key: "physicalEvidenceStatusCode",
    name: "Physical Evidence Status",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={PhysicalEvidenceStatusCdRef.getDesc(item.physicalEvidenceStatusCode)}/>;
    }
}, {
    key: "residenceDeptCountryCode",
    name: "Country Of Residence"
}, {
    key: "travelDocDeptCountryCode",
    name: "Document Issuing Country"
}, {
    key: "travelDocID",
    name: "Document Id"
}, {
    key: "visaApplicationID",
    name: "Visa Application ID"
}, {
    key: "visaPersonSequenceNbr",
    name: "Visa Person Sequence Number"
}, {
    key: "visaCheckCharacter",
    name: "Visa Check Character"
}, {
    key: "visaGrantDate",
    name: "Visa Grant Date",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.visaGrantDate)}/>;
    }
}, {
    key: "visaGrantNbr",
    name: "Visa Grant Number"
}, {
    key: "visaInformationText",
    name: "Visa Information Text"
}, {
    key: "visaIssueCountryCode",
    name: "Visa Issuing Country"
}, {
    key: "visaClassCode",
    name: "Visa Class"
}, {
    key: "visaStatusCode",
    name: "Visa Status",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={VisaStatusCdRef.getDesc(item.visaStatusCode)}/>;
    }
}, {
    key: "visaSubClassCode",
    name: "Visa Sub Class"
}, {
    key: "sourceSystemCode",
    name: "Sourced From",
    onRender: function(item: IIATVisa) {
        return <DetailsAttribute key={this.key} label={this.name} value={SourceSystemCdRef.getDesc(item.sourceSystemCode)}/>;
    }
}];

const IATMovementVisasViewPrefsStore = new ViewPreferencesModel("iatMovementVisas");

interface IIATMovementVisasProps {
    model?: IIATMovementRelatedDataModel<IIATVisa>;
}

@observer
class IATMovementVisas extends React.Component<IIATMovementVisasProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((visa: IIATVisa, idx: number) => {
                return <DetailsItem key={idx} model={visa} attrConfig={Fields} viewPrefModel={IATMovementVisasViewPrefsStore}/>;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Movement does not have a visa recorded</MessageBar>;
        }
        return <div className="iat-movement-visas">{content}</div>;
    }
}

class IATMovementVisasContainer extends React.Component<IIATMovementVisasProps, any> {
    private _onRenderDone = () => {
        return <IATMovementVisas {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} />;
    }
}

@observer
class IATMovementVisasDialog extends React.Component<IIATMovementVisasProps, any> {
    private _handleDialogClose = () => {
        this.props.model.setVisible(false);
    }
    render() {
        return (
            <Dialog hidden={false} onDismiss={this._handleDialogClose}
                    dialogContentProps={{ type: DialogType.normal, title: 'Visas' }}
                    modalProps={{ isBlocking: false, className: "iat-movement-visas-dialog" }}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.IAT/>} {this.props.model.movement.visaIdentifyingNbr}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("iat-movement-visas-header")}
                         bodyClassName="iat-movement-visas-body">
                    <CommandBar items={[]} farItems={[createViewPreferencesMenuItem(IATMovementVisasViewPrefsStore, Fields)]} />
                    <IATMovementVisasContainer {...this.props} />
                </Details>
            </Dialog>
        );
    }
}

export{ IATMovementVisasDialog as default, IATMovementVisasDialog, IIATMovementVisasProps };