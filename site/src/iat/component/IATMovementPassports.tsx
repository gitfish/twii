import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { DetailsList, DetailsListLayoutMode, ConstrainMode, CheckboxVisibility, SelectionMode, IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import Error from "common/component/Error";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import SourceSystemCdRef from "refdata/SourceSystemCd";
import PassportStatusCdRef from "refdata/PassportStatusCd";
import PassportTypeCdRef from "refdata/PassportTypeCd";
import YesNoCdRef from "refdata/YesNoCd";
import ImmigrationDirectiveCdRef from "refdata/ImmigrationDirectiveCd";
import * as DateUtils from "util/Date";
import IIATMovementRelatedDataModel from "../IIATMovementRelatedDataModel";
import { IIATPassport, IIATPassportAlias } from "../IIATPassport";
import "./IATMovementPassports.scss";
import { Details } from "common/component/Details";
import * as Icons from "icon/AnalystDesktopIcons";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import DetailsAttribute from "common/component/DetailsAttribute";
import DetailsItem from "common/component/DetailsItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";

const Columns : IColumn[] = [
    {
        key: "givenNames",
        ariaLabel: "Given Names",
        name: "Given Names",
        fieldName: "givenNames",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
        columnActionsMode:ColumnActionsMode.clickable
    },
    {
        key: "familyName",
        ariaLabel: "Family Name",
        name: "Family Name",
        fieldName: "familyName",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
        columnActionsMode:ColumnActionsMode.clickable
    },
    {
        key: "sexCode",
        ariaLabel: "Gender",
        name: "Gender",
        fieldName: "sexCode",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 10,
        maxWidth: 40,
        onRender: (item : IIATPassportAlias) => {
            return NameGenderCdRef[item.sexCode];
        }
    },
    {
        key: "birthDate",
        ariaLabel: "Date of Birth",
        name: "Date of Birth",
        fieldName: "birthDate",
        minWidth: 50,
        maxWidth: 80,
        isResizable: true,
        columnActionsMode:ColumnActionsMode.clickable,
        onRender: (item : IIATPassportAlias) => {
            return DateUtils.dataToOutputText(item.birthDate);
        }
    },
    {
        key: "birthDeptCountryCode",
        ariaLabel: "Birth Country",
        name: "Birth Country",
        fieldName: "birthDeptCountryCode",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 50,
        maxWidth: 80
    },
    {
        key: "iatTravellerID",
        ariaLabel: "IAT Traveller ID",
        name: "IAT Traveller ID",
        fieldName: "iatTravellerID",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 50,
        maxWidth: 80
    },
    {
        key: "aliasSequenceNbr",
        ariaLabel: "Alias Sequence Number",
        name: "Alias Sequence Number",
        fieldName: "aliasSequenceNbr",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 50,
        maxWidth: 100
    }
];

const Fields: IDetailsAttributeConfig<IIATPassport>[] = [{
    key: "travelDocID",
    name: "Travel Document ID"
}, {
    key: "travelDocDeptCountryCode",
    name: "Travel Document Country"
}, {
    key: "travelDocTypeCode",
    name: "Document Type"
}, {
    key: "deptRunNbr",
    name: "Department Run Number"
}, {
    key: "documentImpoundInd",
    name: "Document Impounded",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={YesNoCdRef.getDesc(item.documentImpoundInd)}/>;
    }
}, {
    key: "immigrationDirectiveCode",
    name: "Immigration Directive",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={ImmigrationDirectiveCdRef.getDesc(item.immigrationDirectiveCode)}/>;
    }
}, {
    key: "issueCountryCode",
    name: "Issuing Country"
}, {
    key: "issueOfficeCode",
    name: "Issuing Office"
}, {
    key: "lastUpdateDate",
    name: "Last Updated",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.lastUpdateDate)}/>;
    }
}, {
    key: "passportExpiryDate",
    name: "Passport Expiry Date",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.passportExpiryDate)}/>;
    }
}, {
    key: "passportIssueDate",
    name: "Passport Issued",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.passportIssueDate)}/>;
    }
}, {
    key: "passportStatusCode",
    name: "Passport Status",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={PassportStatusCdRef.getDesc(item.passportStatusCode)}/>;
    }
}, {
    key: "passportTypeCode",
    name: "Passport Type",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={PassportTypeCdRef.getDesc(item.passportTypeCode)}/>;
    }
}, {
    key: "sourceSystemCode",
    name: "Sourced From",
    onRender: function(item: IIATPassport) {
        return <DetailsAttribute key={this.key} label={this.name} value={SourceSystemCdRef.getDesc(item.sourceSystemCode)}/>;
    }
}];

const IATMovementPassportsViewPrefsStore = new ViewPreferencesModel("iatMovementPassports");

interface IIATMovementPassportsProps {
    model?: IIATMovementRelatedDataModel<IIATPassport>;
}

@observer
class IATMovementPassports extends React.Component<IIATMovementPassportsProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((passport: IIATPassport, idx: number) => {
                return <div key={String(idx)} className={"iat-movement-details-section"}>
                           <DetailsList columns={Columns}
                                 items={passport.Aliases}
                                 selectionMode={SelectionMode.single}
                                 layoutMode={DetailsListLayoutMode.fixedColumns}
                                 constrainMode={ConstrainMode.unconstrained}
                                 checkboxVisibility = {CheckboxVisibility.hidden} />
                           <DetailsItem key={idx} model={passport} attrConfig={Fields} viewPrefModel={IATMovementPassportsViewPrefsStore} />
                       </div>
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Movement does not have a passport recorded</MessageBar>;
        }
        return <div className="iat-movement-passports">{content}</div>
    }
}

class IATMovementPassportsContainer extends React.Component<IIATMovementPassportsProps, any> {
    private _onRenderDone = () => {
        return <IATMovementPassports {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} />;
    }
}

@observer
class IATMovementPassportsDialog extends React.Component<IIATMovementPassportsProps, any> {
    private _handleDialogClose = () => {
        this.props.model.setVisible(false);
    }
    render() {
        return (
            <Dialog hidden={false} onDismiss={this._handleDialogClose}
                    dialogContentProps={{ type: DialogType.normal, title: 'Passports' }}
                    modalProps={{ isBlocking: false, className: "iat-movement-passports-dialog" }}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.IAT/>} {this.props.model.movement.travelDocumentId + " " + this.props.model.movement.travelDocDeptCountryCode}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("iat-movement-passports-header")}
                         bodyClassName="iat-movement-passports-body">
                    <CommandBar items={[]} farItems={[createViewPreferencesMenuItem(IATMovementPassportsViewPrefsStore, Fields)]} />
                    <IATMovementPassportsContainer {...this.props} />
                </Details>
            </Dialog>
        );
    }
}

export{ IATMovementPassportsDialog as default, IATMovementPassportsDialog, IATMovementPassportsContainer, IATMovementPassports, IIATMovementPassportsProps };